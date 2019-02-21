import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  bag_is_active: boolean;
  shipping_is_active: boolean;
  payment_is_active: boolean;
  current_url: string;
  current_step: number;


  constructor(private router: Router) { }

  ngOnInit() {

    this.current_url = this.router.url;
    if (this.current_url == "/checkout-bag") {
      this. bag_is_active = true;
      this.shipping_is_active = false;
      this.payment_is_active = false;
      console.log("pasa 1");
      
      this.current_step = 1;
    } else {
        if (this.current_url == "/checkout-shipping") {
          this. bag_is_active = false;
          this.shipping_is_active = true;
          this.payment_is_active = false;
          this.current_step = 2;
          console.log("pasa 2");
        } else {
            this. bag_is_active = false;
            this.shipping_is_active = false;
            this.payment_is_active = true;
            this.current_step = 3;
            console.log("pasa 3");
        }
    }
    

  }

}
