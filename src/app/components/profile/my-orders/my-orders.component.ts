import { Component, OnInit } from '@angular/core';
import { ApiWebcorporateService } from '../../../services/api-webcorporate.service';
import { Order } from '../../../models/order.model';
import { OrderItem } from '../../../models/order-item.model';
import { GlobalVariable } from '../../../../environments/global';



@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  user_orders: Order[] = [];

  baseImagesLocation = GlobalVariable.BASE_IMAGES_LOCATION;

  constructor(private http: ApiWebcorporateService) { }

  ngOnInit() {

    this.http.getUserOrders(1)
    .subscribe( (resp: any) => {

      this.user_orders = resp.data;
      console.log(this.user_orders);
      
  });

  }

}
