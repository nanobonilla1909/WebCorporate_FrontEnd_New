import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtros-categorias',
  templateUrl: './filtros-categorias.component.html',
  styleUrls: ['./filtros-categorias.component.css']
})
export class FiltrosCategoriasComponent implements OnInit {

  @Input()
  currentCategoryName: string;

  @Input()
  currentCategoryProductsCount: number;

  @Input()
  currentCategoryChildren: any[];

  constructor(private router:Router) { }

  ngOnInit() {
    // console.log("en filtros categoria...");
    
    // console.log(this.currentCategoryChildren);
    
  }

  onClick(category_id: number, category_name: string) {
     console.log(category_id, category_name);
    this.router.navigate(['/results', { category_id: category_id, category_name: category_name}]);
   

  }


}
