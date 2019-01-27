import { Component, OnInit } from '@angular/core';
import { ApiWebcorporateService } from '../../../services/api-webcorporate.service';
import { CartItemsQuantity } from '../../../services/cart-items-quantity';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  cant_items_carrito: number;
  loading: boolean;


  constructor(private http: ApiWebcorporateService, private cart_items_service: CartItemsQuantity) { 

  }

  ngOnInit() {

    this.loading = true;

    this.http.getCartItemsQuantity(1)
    .subscribe( (resp: any) => {
      
        this.cant_items_carrito = resp.data[0].items_quantity;
        this.loading = false;

        this.cart_items_service.mysubject.next(this.cant_items_carrito);

    });

  }

}
