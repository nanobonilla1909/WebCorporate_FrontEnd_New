import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiWebcorporateService } from '../../../services/api-webcorporate.service';
import { Product } from '../../../models/product.model';
import { CategoryNode } from '../../../models/category-node.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  
  contador: number = 0;
  currentCategory: CategoryNode;
  selectedCategory: number;
  selectedCategoryName: string;
  searchTerm: string; 

  products: any[] = [];
  children_categories: any[] = [];

  breadCrumb: {categId: number, categName: string}[] = [];
  qtyProductsSelectedCategory: number;


  constructor(private route: ActivatedRoute, private router:Router, private http: ApiWebcorporateService) 
  
  {


  }
  

  
ngOnInit() {
    
    // Prepara el breadcrumb
    this.breadCrumb.push({categId: 0, categName: 'Inicio'});

    Observable.combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).subscribe(combined => {

      // Captura Variables de la ruta (url)
      this.selectedCategory = +combined[1].get('category_id');
      this.selectedCategoryName  = combined[1].get('category_name');
      this.searchTerm  = combined[1].get('searchTerm');
      this.currentCategory = new CategoryNode(this.selectedCategory, this.selectedCategoryName, this.http); 

      

      // Inicializa Variables
      this.qtyProductsSelectedCategory = 0;

      this.breadCrumb.push({categId: this.selectedCategory, categName: this.selectedCategoryName});

      if (this.selectedCategory != null) {

        this.http.getCategoryChildren(this.selectedCategory)
            .subscribe( (resp: any) => {
            this.products = resp.data;
            this.qtyProductsSelectedCategory = this.products.length;
  
            }); 
  
        this.http.getChildrenCategories(this.selectedCategory)
            .subscribe( (resp: any) => {
            this.children_categories = resp.data;
  
            }); 
      }

      
    });

    this.route.paramMap.subscribe();

    this.route.queryParamMap.subscribe();

    this.contador += 1;
    console.log("contador: " + this.contador);
    

    // Captura Variables de la ruta (url)
    // this.selectedCategory = +this.route.snapshot.paramMap.get('category_id');
    // this.selectedCategoryName = this.route.snapshot.paramMap.get('category_name');
    // this.searchTerm = this.route.snapshot.paramMap.get('searchTerm');
    // this.currentCategory = new CategoryNode(this.selectedCategory, this.selectedCategoryName, this.http); 
    

    // Inicializa Variables
    // this.qtyProductsSelectedCategory = 0;

    // Prepara el breadcrumb
    // this.breadCrumb.push({categId: 0, categName: 'Inicio'});
    // this.breadCrumb.push({categId: this.selectedCategory, categName: this.selectedCategoryName});

    // Recupera los Productos de la Categoria Elegida y las Categorias Hijas para la Navegacion
    // if (this.selectedCategory != null) {

    //   this.http.getCategoryChildren(this.selectedCategory)
    //       .subscribe( (resp: any) => {
    //       this.products = resp.data;
    //       this.qtyProductsSelectedCategory = this.products.length;

    //       }); 

    //   this.http.getChildrenCategories(this.selectedCategory)
    //       .subscribe( (resp: any) => {
    //       this.children_categories = resp.data;

    //       }); 
    // }

  }




  // Metodos que traen variables para otros componentes

  getbreadcrumbPath() : object[] {
        return this.breadCrumb;
  }

  getCurrentCategoryId() : number {
    return this.selectedCategory;
  }

  getCurrentCategoryName() : string {
    return this.selectedCategoryName;
  }

  getCurrentCategoryProductsCount() : number {
    
    return this.qtyProductsSelectedCategory;
  }

  getCurrentCategoryChildren() : any[] {
    
    return this.children_categories;
  }

}
