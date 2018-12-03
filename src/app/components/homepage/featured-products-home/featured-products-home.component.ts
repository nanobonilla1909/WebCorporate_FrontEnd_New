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
  mis_productos: any[] = [];

  constructor(private http:ApiWebcorporateService) {

    this.http.getFeaturedProducts()
      .subscribe( (resp: any) => {
        this.featured_products = resp.data;
        // this.mis_productos = ['Unos','Dos','Tres'];
        // this.mis_productos = resp.data;
        // console.log("Estoy en featured_products_home_componens")
        // console.log(this.featured_products);
      });


   }

  ngOnInit() {
  }

}
