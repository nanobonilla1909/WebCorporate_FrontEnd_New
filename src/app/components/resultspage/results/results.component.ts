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
  filtered_product_list: number[] = [];
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
  // selectedAtributtes1: boolean[] = [false, false, false, false];
  children_categories: any[] = [];

  breadCrumb: {categId: number, categName: string}[] = [];
  qtyProductsSelectedCategory: number;
  qtyProductsSearchedTerm: number;
  cant_items_carrito: number = 0;


  constructor(private route: ActivatedRoute, 
    private router:Router, 
    private http: ApiWebcorporateService,
    private cart_items_service: CartItemsQuantity) 
    
    {

  }
  


  ngOnInit() {
    

    this.loading = true;

    Observable.combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).subscribe(combined => {
      
      // Captura Variables de la ruta (url)
      this.selectedCategory = +combined[1].get('category_id');
      this.selectedCategoryName  = combined[1].get('category_name');
      this.searchTerm  = combined[1].get('searchTerm');
      this.currentCategory = new CategoryNode(this.selectedCategory, this.selectedCategoryName, this.http); 

      // console.log("this.selectedCategory: ",this.selectedCategory)
      // console.log("this.selectedCategoryName: ",this.selectedCategoryName)
      // console.log("this.searchTerm: ",this.searchTerm)
      

      // Inicializa Variables
      this.qtyProductsSelectedCategory = 0;
      this.qtyProductsSearchedTerm = 0;
      this.products_results = [];
      this.products_results_filtered = [];
      this.products_results_filtered_attr2 = [];
      this.characterized_products = [];
      this.characterized_products_sorted = [];
      this.product_attributes = [];
      this.selectedOptions1 = [];
      this.selectedOptions2 = [];
      this.children_categories = [];
   

      // Pone la Cantidad de Articulos en el Carrito de Compras
      this.http.getCartItemsQuantity(1)
            .subscribe( (resp: any) => {
            this.cant_items_carrito = +resp.data[0].items_quantity;
            this.cart_items_service.mysubject.next(this.cant_items_carrito);
      });    


      if (this.selectedCategoryName != null) {

        // Prepara el breadcrumb
        this.breadCrumb.push({categId: 0, categName: 'Inicio'});
        this.breadCrumb.push({categId: this.selectedCategory, categName: this.selectedCategoryName});
      
        // Trae Todos los Productos de la Categoria seleccionada
        this.http.getCategoryProductChildren(this.selectedCategory)
            .subscribe( (resp: any) => {
            this.products = resp.data;
            console.log("Products", this.products)
            this.products_results = [];
            for (let unProd of this.products) {
              this.products_results.push({id: unProd.id, name:unProd.name, description:unProd.description, price: unProd.price, image: unProd.image})
              this.products_results_filtered.push(unProd.id)
            } 
      
            // console.log("ESTE ME INTERESA!!!!")
            // console.log(this.products_results_filtered);
            
            this.qtyProductsSelectedCategory = this.products.length;

            
            // Trae Las SubCategorias Hijas de la Categoria seleccionada
            this.http.getChildrenCategories(this.selectedCategory)
              .subscribe( (resp: any) => {
                this.children_categories = resp.data;
  

                // Obtiene todos los Productos Caracterizados de la categoria elegida    
                this.http.getCategoryCharacterizedProductChildren(this.selectedCategory)
                    .subscribe( (resp: any) => {
                    this.characterized_products = resp.data;

                    // Ordena los registros en: this.characterized_products_sorted 
                    this.characterized_products_sorted = this.characterized_products.sort(
                      function(a, b) {
                        if (a.type_id === b.type_id) {
                          return a.options_id - b.options_id;
                        }
                        return a.type_id > b.type_id ? 1 : -1;
                      }
                    );
            
                    this.initialize_product_attributes_1_to_4();

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
                    console.log("this.product_attributes: ", this.product_attributes);
                    // Hasta Aca trajo Todos los Productos Caracterizados, lo ordeno por id de caracteristica 
                    // y armo una Lista unica en product_attributes.

                    // type_id	name	options_id	value
                    //  1	    Volumen	  1	       750ml
                    //  1	    Volumen	  2	      1 Litro
                    //  1	    Volumen	  3	      500cc
                    //  2	    Marca	    4	      Bombay
                    //  2	    Marca	    5	      Amarula
                    //  2	    Marca	    6	      Baileys


                    // Divide los Atributos en 4 listas distintas
 
                    this.create_product_attributes_1_to_4();

                    console.log("this.product_attributes1: ", this.product_attributes1);
                    console.log("this.product_attributes2: ", this.product_attributes2);

                    this.loading = false;


                  }); 

                // this.loading = false;

            }); 
  
        }); 

      } else {

        this.breadCrumb = [];
        
        this.http.getSearchedProducts(this.searchTerm)
            .subscribe( (resp: any) => {
            this.products = resp.data;
            console.log("Products", this.products)

                this.products_results = [];
                this.filtered_product_list = [];
                for (let unProd of this.products) {
                     this.products_results.push({id: unProd.id, name:unProd.name, description:unProd.description, price: unProd.price, image: unProd.image})
                     this.products_results_filtered.push(unProd.id)
                } 

                // Obtiene todos los Productos Caracterizados de la categoria elegida    
                this.http.getCharacterizedProductsFromList(this.products_results_filtered)
                    .subscribe( (resp: any) => {

                    this.characterized_products = resp.data;
                    //console.log("a ver si funciono??: ", this.characterized_products);
                    this.arma_atributos();
 
                    this.create_product_attributes_1_to_4();

                    console.log("this.product_attributes1: ", this.product_attributes1);
                    console.log("this.product_attributes2: ", this.product_attributes2);

                    this.loading = false;


                  }); 

        });    

      };

      
    });

    this.route.paramMap.subscribe();
    this.route.queryParamMap.subscribe();
    

  }


  newSelectionReceived(optionsSelected) {

    
    console.log("PASABBBBBBBB");


    this.selectedOptions1 = optionsSelected.attr1;
    this.selectedOptions2 = optionsSelected.attr2;


    console.log(this.selectedOptions1);
    console.log(this.selectedOptions2);

    console.log("hasta ahi ahi");


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
    
  }


  onViewTypeClick(view_type: string) {

    if (view_type == 'grilla') {
      this.view_type_active_grilla = true;
      this.view_type_active_listado = false;
      this.view_type_active = "grilla";
      this.clasesColumnas = 'col-12 col-sm-6 col-lg-4 col-xl-4' 
              
    } else {
      this.view_type_active_grilla = false;
      this.view_type_active_listado = true;
      this.view_type_active = "listado";
      this.clasesColumnas = 'col-12'        

    } 
  }


  arma_atributos(){
    // Ordena los registros en: this.characterized_products_sorted 
    this.characterized_products_sorted = this.characterized_products.sort(
      function(a, b) {
        if (a.type_id === b.type_id) {
          return a.options_id - b.options_id;
        }
        return a.type_id > b.type_id ? 1 : -1;
      }
    );

    this.initialize_product_attributes_1_to_4();

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

  }

  initialize_product_attributes_1_to_4(){
    this.product_attributes = [];
    this.product_attributes1 = [];
    this.product_attributes2 = [];
    this.product_attributes3 = [];
    this.product_attributes4 = [];
  }
                   

  create_product_attributes_1_to_4(){

    var j = 0; 
    var type_id_ant = this.product_attributes[0].type_id;
    var name_ant = this.product_attributes[0].name;
  
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


 /* 

  ngOnChanges(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log("en results: ngOnChanges");

  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log("en results: ngAfterContentInit");

  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    console.log("en results: ngAfterContentChecked");

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log("en results: ngAfterViewInit");

  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    console.log("en results: ngAfterViewChecked");

  }
*/


}
