import { Component, OnInit, Input } from '@angular/core';
import { CartItemsQuantity } from '../../../services/cart-items-quantity';

@Component({
  selector: 'app-navegacion-superior',
  templateUrl: './navegacion-superior.component.html',
  styleUrls: ['./navegacion-superior.component.css']
})
export class NavegacionSuperiorComponent implements OnInit {


  // @Input() cant_items_bolsa: number;
  cant_items_bolsa: number = 0;

  constructor(private cart_items_service: CartItemsQuantity) { }

  ngOnInit() {

    this.cart_items_service.mysubject.subscribe( (value) => {
      this.cant_items_bolsa = this.cant_items_bolsa + value;
    
      
      });

  }

}
