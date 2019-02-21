import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ApiWebcorporateService } from '../../../services/api-webcorporate.service';
import { CartItemDisplay } from '../../../models/cart-item-display';
import { CartItemsQuantity } from '../../../services/cart-items-quantity';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart_items: CartItemDisplay[] = [];
  total_amount_price: number;
  total_amount_discount: number;
  total_amount_cart: number;
  subtotal_amount_cart: number;
 

  cant_items_carrito: number;
  loading: boolean;

  constructor(private http: ApiWebcorporateService, private cart_items_service: CartItemsQuantity) { }

  ngOnInit() {

    this.loading = true;

    this.http.getCartItems(1)
    .subscribe( (resp: any) => {
      
        this.cart_items = resp.data;
        // console.log("this.cart_items: ", this.cart_items);
        
        this.subtotal_amount_cart = 0;
        this.total_amount_discount = 0;
        for (let item of this.cart_items) {
          this.subtotal_amount_cart = this.subtotal_amount_cart + (item['price'] * item['quantity']);
          this.total_amount_discount = this.total_amount_discount + (item['discount_amount'] * item['quantity']);
        }
        this.total_amount_cart = this.subtotal_amount_cart - this.total_amount_discount;
      
        this.http.getCartItemsQuantity(1)
          .subscribe( (resp: any) => {
      
              this.cant_items_carrito = +resp.data[0].items_quantity;
              this.loading = false;

              this.cart_items_service.mysubject.next(this.cant_items_carrito);

          });

    });

    

  }

  quantityAdjusted(quantity) {
    this.cant_items_carrito = this.cant_items_carrito + quantity;
  }

}


