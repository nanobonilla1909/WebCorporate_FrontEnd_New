import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiWebcorporateService {

  constructor(private http:HttpClient) {  

  
  }


  getCategoriesOrder() 
  {
    return this.http.get('http://localhost:8000/api/home_page_category_orders');
  }

  getFeaturedProducts() 
  {
    return this.http.get('http://localhost:8000/api/featured_products');
  }


  getHighlightedItems()
  {
    return this.http.get('http://localhost:8000/api/highlighted_items');

  }


  // Trae los productos del ultimo nivel correspondiente a un nodo dado
  // ------------------------------------------------------------------

  getCategoryProductChildren(product_category_id)
  {

    const url = 'http://localhost:8000/api/category_last_products_children/' + product_category_id;
 
    return this.http.get(url);
  }


  // Trae los productos caracterizados del ultimo nivel correspondiente a un nodo dado
  // ---------------------------------------------------------------------------------

  getCategoryCharacterizedProductChildren(product_category_id)
  {

    const url = 'http://localhost:8000/api/category_last_products_children_characterized/' + product_category_id;
 
    return this.http.get(url);
  }


  // Trae las Categorias hijas correspondientes a un nodo dado
  // ---------------------------------------------------------

  getChildrenCategories(product_category_id)
  {

    const url = 'http://localhost:8000/api/category_children/' + product_category_id;
 
    return this.http.get(url);
  }

}
