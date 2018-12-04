import { Component, OnInit } from '@angular/core';
import { ApiWebcorporateService } from '../../../services/api-webcorporate.service';
import { FeaturedProduct } from '../../../models/featured-product.model';

@Component({
  selector: 'app-featured-products-home',
  templateUrl: './featured-products-home.component.html',
  styleUrls: ['./featured-products-home.component.css']
})
export class FeaturedProductsHomeComponent implements OnInit {


  featured_products: FeaturedProduct[] = [];


  constructor(private http:ApiWebcorporateService) {

    this.http.getFeaturedProducts()
      .subscribe( (resp: any) => {
        this.featured_products = resp.data;

      });


   }

  ngOnInit() {
  }

}
