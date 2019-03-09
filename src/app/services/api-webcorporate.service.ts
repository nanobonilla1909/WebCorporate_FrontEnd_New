import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { CartItem } from '../models/cart-item';
import { Order } from '../models/order.model';


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



  // OPERACIONES CON EL CARRITO DE COMPRAS //
  // ------------------------------------- //


 // Agrega un Item a la Bolsa de Compras
 // -------------------------------------

  createCartItem(cart_item: CartItem) {

    return this.http.post('http://localhost:8000/api/cart_items', cart_item);
  }


  // Obtiene la cantidad de Items de la Bolsa de Compras
  // ----------------------------------------------------


  getCartItemsQuantity(cart_item_id)
  {

    const url = 'http://localhost:8000/api/cart_items_quantity/' + cart_item_id;
 
    return this.http.get(url);

  }


  // Obtiene los Items de la Bolsa de Compras
  // ----------------------------------------


  getCartItems(cart_item_id)
  {

    const url = 'http://localhost:8000/api/carts/' + cart_item_id;
 
    return this.http.get(url);

  }


  // Obtiene los Datos del Usuario
  // -----------------------------

  getUserDeliveryInformation(user) {

    const url = 'http://localhost:8000/api/users/' + user + '/deliveries';
 
    return this.http.get(url);

  }

  // Obtiene los Datos de Pagos
  // -----------------------------

  getPaymentOptions() {

    const url = 'http://localhost:8000/api/payment_options';
 
    return this.http.get(url);

  }


  // Crea una Orden de Venta
 // ------------------------

 createOrder(new_order: Order) {

  return this.http.post('http://localhost:8000/api/orders', new_order);
}


}
