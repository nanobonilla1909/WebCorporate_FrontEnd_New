import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiWebcorporateService } from '../../../services/api-webcorporate.service';
import { Product } from '../../../models/product.model';
import { CategoryNode } from '../../../models/category-node.model';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  
  currentCategory: CategoryNode;
  selectedCategory: number;
  selectedCategoryName: string;
  searchTerm: string; 

  products: any[] = [];
  children_categories: any[] = [];

  breadCrumb: {categId: number, categName: string}[] = [];
  qtyProductsSelectedCategory: number;


  constructor(private route: ActivatedRoute, private http: ApiWebcorporateService) 
  
  {


  }
  

  
ngOnInit() {
    

    // Captura Variables de la ruta (url)
    this.selectedCategory = +this.route.snapshot.paramMap.get('category_id');
    this.selectedCategoryName = this.route.snapshot.paramMap.get('category_name');
    this.searchTerm = this.route.snapshot.paramMap.get('searchTerm');
    this.currentCategory = new CategoryNode(this.selectedCategory, this.selectedCategoryName, this.http); 
    

    // Inicializa Variables
    this.qtyProductsSelectedCategory = 0;

    // Prepara el breadcrumb
    this.breadCrumb.push({categId: 0, categName: 'Inicio'});
    this.breadCrumb.push({categId: this.selectedCategory, categName: this.selectedCategoryName});

    // Recupera los Productos de la Categoria Elegida y las Categorias Hijas para la Navegacion
    if (this.selectedCategory != null) {

      this.http.getCategoryChildren(this.selectedCategory)
          .subscribe( (resp: any) => {
          this.products = resp.data;
          this.qtyProductsSelectedCategory = this.products.length;

          }); 

      this.http.getChildrenCategories(this.selectedCategory)
          .subscribe( (resp: any) => {
          this.children_categories = resp.data;
          console.log("en results");
          
          console.log(this.children_categories);
          

          }); 
    

    }

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
