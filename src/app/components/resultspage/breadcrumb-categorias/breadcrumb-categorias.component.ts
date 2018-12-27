import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-categorias',
  templateUrl: './breadcrumb-categorias.component.html',
  styleUrls: ['./breadcrumb-categorias.component.css']
})
export class BreadcrumbCategoriasComponent implements OnInit {

  @Input()
  breadcrumbPath: object;


  constructor() { }

  ngOnInit() {
    
  }

}
