import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CartItem } from '../../../models/cart-item';
import { ApiWebcorporateService } from '../../../services/api-webcorporate.service';
import { CartItemsQuantity } from '../../../services/cart-items-quantity';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})


export class ProductCardComponent implements OnInit {

  @Input() product: Product;
 
  new_cart_item: CartItem;


  constructor(private http: ApiWebcorporateService, private cart_items_service: CartItemsQuantity) { 

  }

  ngOnInit() {

  }

  addCartItem(){


    this.cart_items_service.mysubject.next(1);

    this.new_cart_item = new CartItem();
    this.new_cart_item.temporary_cart_id = 1;
    this.new_cart_item.product_id = this.product.id;
    this.new_cart_item.price = this.product.price;
    this.new_cart_item.quantity = 1;
    this.new_cart_item.discount_amount = 0;
    this.new_cart_item.discount_percentage = 0;
    console.log(this.new_cart_item);

    this.http.createCartItem(this.new_cart_item)
      .subscribe( (resp: any) => {
        console.log(resp.data['price']);



      });
          
  }

}
