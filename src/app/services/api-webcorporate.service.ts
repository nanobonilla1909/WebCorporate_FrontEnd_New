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

}
