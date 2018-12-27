import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-panel-filtros',
  templateUrl: './panel-filtros.component.html',
  styleUrls: ['./panel-filtros.component.css']
})
export class PanelFiltrosComponent implements OnInit {


  @Input()
  currentCategoryName: string;

  @Input()
  currentCategoryProductsCount: string;

  @Input()
  currentCategoryChildren: any[];

  

  constructor() { }

  ngOnInit() {
    console.log("en panel filtros ...");
    
    console.log(this.currentCategoryChildren);
  }

  getCurrentCategoryName(){
    return this.currentCategoryName;
  }

  getCurrentCategoryProductsCount(){
    
    return this.currentCategoryProductsCount;
  }
  
  getCurrentCategoryChildren() : any[] {
    
    return this.currentCategoryChildren;
  }

}
