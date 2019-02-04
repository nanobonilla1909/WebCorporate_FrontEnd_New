import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiWebcorporateService } from '../../../services/api-webcorporate.service';
import { Product } from '../../../models/product.model';
import { CategoryNode } from '../../../models/category-node.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { CartItemsQuantity } from '../../../services/cart-items-quantity';



interface CharacterizedProduct{
  product_id: number;
  type_id: number;
  name: string;
  options_id: number;
  value: string;
}

interface AttributesValues{
  type_id: number;
  name: string;
  options_id: number;
  value: string;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {
  
  loading: boolean;
  contador: number = 0;
  currentCategory: CategoryNode;
  selectedCategory: number;
  selectedCategoryName: string;
  searchTerm: string;

  view_type_active_grilla: boolean = false; 
  view_type_active_listado: boolean = true; 
  view_type_active: string = "listado";
  clasesColumnas: string = 'col-12';
  

  products: any[] = [];
  products_results: Product[] = [];
  products_results_filtered: number[] = [];
  products_results_filtered_attr2: number[] = [];
  characterized_products: CharacterizedProduct[] = [];
  characterized_products_sorted: CharacterizedProduct[] = [];
  product_attributes: AttributesValues[] = [];
  product_attributes1: AttributesValues[] = [];
  product_attributes2: AttributesValues[] = [];
  product_attributes3: AttributesValues[] = [];
  product_attributes4: AttributesValues[] = [];
  // selectedAtributtes: {type_id: number, options_id: number}[] = [];
  selectedOptions1: number[] = [];
  selectedOptions2: number[] = [];
  selectedAtributtes1: boolean[] = [false, false, false, false];
  children_categories: any[] = [];

  breadCrumb: {categId: number, categName: string}[] = [];
  qtyProductsSelectedCategory: number;
  cant_items_carrito: number = 0;


  constructor(private route: ActivatedRoute, 
    private router:Router, 
    private http: ApiWebcorporateService,
    private cart_items_service: CartItemsQuantity) 
    
    {

  }
  


  ngOnInit() {
    

    this.loading = true;

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

        this.products_results = [];
        this.products_results_filtered = [];
        this.http.getCategoryProductChildren(this.selectedCategory)
            .subscribe( (resp: any) => {
            this.products = resp.data;
            this.products_results = [];
            for (let unProd of this.products) {
              this.products_results.push({id: unProd.id, name:unProd.name, description:unProd.description, price: unProd.price, image: unProd.image})
              this.products_results_filtered.push(unProd.id)
            } 
      
            console.log("ESTE ME INTERESA!!!!")
            console.log(this.products_results_filtered);
            
            this.qtyProductsSelectedCategory = this.products.length;
  
            }); 
  
        this.http.getChildrenCategories(this.selectedCategory)
            .subscribe( (resp: any) => {
            this.children_categories = resp.data;
  
            }); 

        this.http.getCartItemsQuantity(1)
            .subscribe( (resp: any) => {
            this.cant_items_carrito = +resp.data[0].items_quantity;
            this.cart_items_service.mysubject.next(this.cant_items_carrito);
        
        });    

        // Obtiene todos los atributos de los productos de la categoria elegida    
        this.http.getCategoryCharacterizedProductChildren(this.selectedCategory)
            .subscribe( (resp: any) => {
            this.characterized_products = resp.data;
            // Ordena los registros
            this.characterized_products_sorted = this.characterized_products.sort(
              function(a, b) {
                if (a.type_id === b.type_id) {
                  return a.options_id - b.options_id;
                }
                return a.type_id > b.type_id ? 1 : -1;
              }
            );
     
            
            this.product_attributes = [];
            this.product_attributes1 = [];
            this.product_attributes2 = [];
            this.product_attributes3 = [];
            this.product_attributes4 = [];

            // Arma una lista unificada de Atributos y Valores (product_attributes)
            var type_id_ant = this.characterized_products_sorted[0].type_id;
            var options_id_ant = this.characterized_products_sorted[0].options_id;
            var name_ant = this.characterized_products_sorted[0].name;
            var value_ant = this.characterized_products_sorted[0].value;
            for(var i = 0; i < this.characterized_products_sorted.length; i++) {
              if (this.characterized_products_sorted[i].options_id != options_id_ant ||
                this.characterized_products_sorted[i].type_id != type_id_ant ) {
                  this.product_attributes.push({type_id: type_id_ant, name: name_ant, options_id: options_id_ant, value: value_ant})
                  type_id_ant = this.characterized_products_sorted[i].type_id;
                  options_id_ant = this.characterized_products_sorted[i].options_id;
                  name_ant = this.characterized_products_sorted[i].name;
                  value_ant = this.characterized_products_sorted[i].value;
              }
            }
            this.product_attributes.push({type_id: type_id_ant, name: name_ant, options_id: options_id_ant, value: value_ant})
            

            // Divide los Atributos en 4 listas distintas
            var j = 0; 
            type_id_ant = this.product_attributes[0].type_id;
            name_ant = this.product_attributes[0].name;
          
            while(j < this.product_attributes.length && this.product_attributes[j].type_id == type_id_ant) {
              this.product_attributes1.push({type_id: type_id_ant, name: name_ant, options_id: this.product_attributes[j].options_id, value: this.product_attributes[j].value})
              j++;
            }

            if (j < this.product_attributes.length) {

              type_id_ant = this.product_attributes[j].type_id;
              name_ant = this.product_attributes[j].name;
              while(j < this.product_attributes.length && this.product_attributes[j].type_id == type_id_ant) {
                this.product_attributes2.push({type_id: type_id_ant, name: name_ant, options_id: this.product_attributes[j].options_id, value: this.product_attributes[j].value})
                j++;
              }
            }

            if (j < this.product_attributes.length) {

                type_id_ant = this.product_attributes[j].type_id;
                name_ant = this.product_attributes[j].name;
                while(j < this.product_attributes.length && this.product_attributes[j].type_id == type_id_ant) {
                  this.product_attributes3.push({type_id: type_id_ant, name: name_ant, options_id: this.product_attributes[j].options_id, value: this.product_attributes[j].value})
                  j++;
                }
            }

            if (j < this.product_attributes.length) {

                  type_id_ant = this.product_attributes[j].type_id;
                  name_ant = this.product_attributes[j].name;
                  while(j < this.product_attributes.length && this.product_attributes[j].type_id == type_id_ant) {
                    this.product_attributes4.push({type_id: type_id_ant, name: name_ant, options_id: this.product_attributes[j].options_id, value: this.product_attributes[j].value})
                    j++;
                  }
            }  

            this.loading = false;
            
  
            }); 

      }

      
    });

    this.route.paramMap.subscribe();

    this.route.queryParamMap.subscribe();
    

  }


  newSelectionReceived(optionsSelected) {

    
    console.log("PASABBBBBBBB");


    this.selectedOptions1 = optionsSelected.attr1;
    this.selectedOptions2 = optionsSelected.attr2;

    this.products_results_filtered=[];
    this.products_results_filtered_attr2=[];
    
    for (let unProd of this.characterized_products) {
      if(this.selectedOptions1.includes(unProd.options_id)){
        this.products_results_filtered.push(unProd.product_id)
      }
    } 

    for (let unProd of this.characterized_products) {
      if(this.selectedOptions2.includes(unProd.options_id)){
        this.products_results_filtered_attr2.push(unProd.product_id)
      }
    } 


    // console.log("products_results_filtered_attr2: " + this.products_results_filtered_attr2);
    // console.log("products_results_filtered: " + this.products_results_filtered);
    
    if (this.products_results_filtered_attr2.length > 0) {
      for(var i = 0; i < this.products_results_filtered.length; i++) {
        if (this.products_results_filtered_attr2.includes(this.products_results_filtered[i])) {
        } else{
            delete this.products_results_filtered[i];
        }
      }
    }
    
    console.log("FIN DE PASABBBBBBBB");

  }


  onViewTypeClick(view_type: string) {

    if (view_type == 'grilla') {
      this.view_type_active_grilla = true;
      this.view_type_active_listado = false;
      this.view_type_active = "grilla";
      this.clasesColumnas = 'col-12 col-sm-6 col-lg-4 col-xl-3' 
              
    } else {
      this.view_type_active_grilla = false;
      this.view_type_active_listado = true;
      this.view_type_active = "listado";
      this.clasesColumnas = 'col-12'        

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

  getProductAttributes1() : any[] {
    
    return this.product_attributes1;
  }


}
