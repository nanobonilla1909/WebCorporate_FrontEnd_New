import { Component, OnInit, Input } from '@angular/core';

interface AttributesValues{
  type_id: number;
  name: string;
  options_id: number;
  value: string;
}

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

  @Input()
  product_attributes1: AttributesValues[];

  constructor() { }

  ngOnInit() {
    
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
