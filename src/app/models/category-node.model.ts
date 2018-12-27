import { ApiWebcorporateService } from '../services/api-webcorporate.service';

import { Product } from './product.model';
import { Observable } from 'rxjs/Observable';


export class CategoryNode {

    category_id: number;
    category_name: string;
    last_products?: Product[];
    products_count?: number;
    subcategories?: CategoryNode[]; 

    http: ApiWebcorporateService;

    constructor (category_id: number, category_name: string, http:ApiWebcorporateService){
        this.category_id = category_id;
        this.category_name = category_name;
        this.http = http;  
    }

    // prods(): Observable<number> {

    //     var products: any[];
    //     var cant:number;

    //     console.log("entra por aca, categoria = ");
    //     console.log(this.category_id);

    //     this.http.getCategoryChildren(this.category_id)
    //       .subscribe( (resp: any) => {
            
    //        products = resp.data;
    //         cant = products.length;
           
    //     //   this.currentCategory.last_products = this.products;
      
    //       }); 

    //       return cant;
         
          
    // }
}
