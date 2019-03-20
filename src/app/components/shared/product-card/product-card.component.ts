import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CartItem } from '../../../models/cart-item';
import { ApiWebcorporateService } from '../../../services/api-webcorporate.service';
import { CartItemsQuantity } from '../../../services/cart-items-quantity';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { GlobalVariable } from './../../../../environments/global';



@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})


export class ProductCardComponent implements OnInit {

  @Input() product: Product;

  @Input() view_type: string;
 
  new_cart_item: CartItem;
  view_type_active_listado: boolean;

  resultado: string;

  baseImagesLocation = GlobalVariable.BASE_IMAGES_LOCATION;


  constructor(private http: ApiWebcorporateService, private cart_items_service: CartItemsQuantity, public dialog: MatDialog) { 

  }

  ngOnInit() {

    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if (this.view_type == 'listado') {
      this.view_type_active_listado = true;
    } else {
      this.view_type_active_listado = false;
    }  
    
    
  }



  // Agrega Item a la bolsa

  addCartItem(){

    this.cart_items_service.mysubject.next(1);
    this.new_cart_item = new CartItem();
    this.new_cart_item.cart_id = 1;
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

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.resultado = result;
    });
    console.log("DIALOOOOOGGGGGGG");
    

  }

}
