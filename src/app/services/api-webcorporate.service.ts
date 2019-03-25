import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { CartItem } from '../models/cart-item';
import { Order } from '../models/order.model';

import { GlobalVariable } from '../../environments/global';


@Injectable()
export class ApiWebcorporateService {

  private baseApiUrl = GlobalVariable.BASE_API_URL;


  constructor(private http:HttpClient) {  


  }



  getCategoriesOrder() 
  {
    let f = 1;
    return this.http.get(this.baseApiUrl + '/home_page_category_orders');
  }

  getFeaturedProducts() 
  {
    return this.http.get(this.baseApiUrl + '/featured_products');
  }


  getHighlightedItems()
  {
    return this.http.get(this.baseApiUrl + '/highlighted_items');

  }

  getSearchedProducts(searchedText)
  {
    return this.http.get(this.baseApiUrl + '/search/' + searchedText);

  }


  // Trae los productos del ultimo nivel correspondiente a un nodo dado
  // ------------------------------------------------------------------

  getCategoryProductChildren(product_category_id)
  {

    const url = this.baseApiUrl + '/category_last_products_children/' + product_category_id;
 
    return this.http.get(url);
  }


  // Trae los productos caracterizados del ultimo nivel correspondiente a un nodo dado
  // ---------------------------------------------------------------------------------

  getCategoryCharacterizedProductChildren(product_category_id)
  {

    const url = this.baseApiUrl + '/category_last_products_children_characterized/' + product_category_id;
 
    return this.http.get(url);
  }

  // Trae los productos caracterizados, dada una lista
  // -------------------------------------------------

  getCharacterizedProductsFromList(arr: number[])
  {

    let products: number[] = arr;

    return this.http.post(this.baseApiUrl + '/characterized_products', products);

  }


  // Trae las Categorias hijas correspondientes a un nodo dado
  // ---------------------------------------------------------

  getChildrenCategories(product_category_id)
  {

    const url = this.baseApiUrl + '/category_children/' + product_category_id;
 
    return this.http.get(url);
  }



  // OPERACIONES CON EL CARRITO DE COMPRAS //
  // ------------------------------------- //


 // Agrega un Item a la Bolsa de Compras
 // -------------------------------------

  createCartItem(cart_item: CartItem) {

    return this.http.post(this.baseApiUrl + '/cart_items', cart_item);
  }


  // Obtiene la cantidad de Items de la Bolsa de Compras
  // ----------------------------------------------------


  getCartItemsQuantity(cart_item_id)
  {

    const url = this.baseApiUrl + '/cart_items_quantity/' + cart_item_id;
 
    return this.http.get(url);

  }


  // Obtiene los Items de la Bolsa de Compras
  // ----------------------------------------


  getCartItems(cart_item_id)
  {

    const url = this.baseApiUrl + '/carts/' + cart_item_id;
 
    return this.http.get(url);

  }


  // Obtiene los Datos del Usuario
  // -----------------------------

  getUserDeliveryInformation(user) {

    const url = this.baseApiUrl + '/users/' + user + '/deliveries';
 
    return this.http.get(url);

  }

  getUserOrders(user) {

    const url = this.baseApiUrl + '/users/' + user + '/orders';
 
    return this.http.get(url);

  }

  // Obtiene los Datos de Pagos
  // -----------------------------

  getPaymentOptions() {

    const url = this.baseApiUrl + '/payment_options';
 
    return this.http.get(url);

  }


  // Crea una Orden de Venta
 // ------------------------

 createOrder(new_order: Order) {

  console.log("CREA LA ORDEN");
  // console.log(new_order);

  return this.http.post(this.baseApiUrl + '/orders', new_order);
}


}
