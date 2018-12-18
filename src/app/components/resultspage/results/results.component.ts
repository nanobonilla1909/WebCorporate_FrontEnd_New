import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiWebcorporateService } from '../../../services/api-webcorporate.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  
  selectedCategory: number;
  selectedCategoryName: string;
  searchTerm: string; 

  products: any[] = [];

  constructor(private route: ActivatedRoute, private http: ApiWebcorporateService) 
  
  {

    this.selectedCategory = +this.route.snapshot.paramMap.get('category_id');
    this.selectedCategoryName = this.route.snapshot.paramMap.get('category_name');
    this.searchTerm = this.route.snapshot.paramMap.get('searchTerm');

    if (this.selectedCategory != null) {

        this.http.getCategoryChildren(this.selectedCategory)
            .subscribe( (resp: any) => {
            this.products = resp.data;
              console.log(this.products);  
            }); 
       
 
    }

  }
  
  
  ngOnInit() {
    
    }



}
