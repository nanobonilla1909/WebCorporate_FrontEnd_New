import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    console.log("en filtros categoria...");
    
    console.log(this.currentCategoryChildren);
    
  }

}
