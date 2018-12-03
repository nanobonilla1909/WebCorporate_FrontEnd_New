import { Component, OnInit, Input } from '@angular/core';
import { FeaturedProduct } from '../../../models/featured-product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() featured_product: FeaturedProduct;
  my_img: string;

  constructor() { 
    console.log("estoy en el Constructor del product-card");
    console.log(this.featured_product);
    this.my_img = "http://localhost:8000/app_images/4723749812.jpg"
  }

  ngOnInit() {
    console.log("estoy en el Init del product-card");
    console.log(this.featured_product);
  }

}
