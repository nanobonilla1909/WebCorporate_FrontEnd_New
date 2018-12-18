import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  getCategoryChildren(product_category)
  {

    const url = 'http://localhost:8000/api/category_last_products_children/' + product_category;
    console.log(url);

    return this.http.get(url);
  }

}
