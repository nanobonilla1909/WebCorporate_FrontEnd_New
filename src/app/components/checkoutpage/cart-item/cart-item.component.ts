import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItemDisplay } from '../../../models/cart-item-display';
import { ApiWebcorporateService } from '../../../services/api-webcorporate.service';
import { CartItemsQuantity } from '../../../services/cart-items-quantity';
import { CartItem } from '../../../models/cart-item';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cart_item: CartItemDisplay;

  @Output()
  quantityChanged: EventEmitter<number> = new EventEmitter<number>();

  new_cart_item: CartItem;
  // adjustment_qty: number;
  // cantidad: number;


  constructor(private http: ApiWebcorporateService, private cart_items_service: CartItemsQuantity) { }

  ngOnInit() {


  
  }

  addCartItem(quantity: number){


    this.cart_items_service.mysubject.next(quantity);

    this.new_cart_item = new CartItem();
    this.new_cart_item.temporary_cart_id = 1;
    this.new_cart_item.product_id = this.cart_item.product_id;
    this.new_cart_item.price = this.cart_item.price;
    this.new_cart_item.quantity = quantity;
    this.new_cart_item.discount_amount = 0;
    this.new_cart_item.discount_percentage = 0;
    

    this.http.createCartItem(this.new_cart_item)
      .subscribe( (resp: any) => {

        let new_quantity = resp.data['quantity'];
        this.new_cart_item.quantity = new_quantity;
        console.log("this.new_cart_item.quantity: ", this.new_cart_item.quantity);

        this.cart_item.quantity = this.new_cart_item.quantity
        this.quantityChanged.emit(quantity); 

      });

          
  }

 

}
