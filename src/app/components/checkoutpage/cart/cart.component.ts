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

  cant_items_carrito: number;
  loading: boolean;

  constructor(private http: ApiWebcorporateService, private cart_items_service: CartItemsQuantity) { }

  ngOnInit() {

    this.loading = true;

    this.http.getCartItems(1)
    .subscribe( (resp: any) => {
      
        this.cart_items = resp.data;
        console.log("this.cart_items: ", this.cart_items);
        

    });

    this.http.getCartItemsQuantity(1)
    .subscribe( (resp: any) => {
      
        this.cant_items_carrito = +resp.data[0].items_quantity;
        this.loading = false;

        this.cart_items_service.mysubject.next(this.cant_items_carrito);

    });

  }

  quantityAdjusted(quantity) {
    this.cant_items_carrito = this.cant_items_carrito + quantity;
  }

}


