import { Product } from './../../../models/product.model';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'productFilter'
})
export class ProductResultsFilterPipe implements PipeTransform {

    transform(products_results: Product[], selected_products: number[]): Product[] {
        if (selected_products.length == 0) {
            return products_results;
        }
        
        return products_results.filter(product => selected_products.includes(product.id))
    }

}