import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-categorias',
  templateUrl: './breadcrumb-categorias.component.html',
  styleUrls: ['./breadcrumb-categorias.component.css']
})
export class BreadcrumbCategoriasComponent implements OnInit {

  @Input()
  breadcrumbPath: {categId: number, categName: string}[];


  constructor() { }

  ngOnInit() {
    // console.log("breadcrumbPath:" ,this.breadcrumbPath);
    
  }

  ngOnChanges(changes: SimpleChanges): void {

    // console.log("breadcrumbPath - OnChanges:" ,this.breadcrumbPath);
    
  }


  onClick(category_id: number, category_name: string) {
    
    var index = this.breadcrumbPath.findIndex(x=>x.categId === category_id);
    this.breadcrumbPath.splice(index, 3);

    

 }

}
