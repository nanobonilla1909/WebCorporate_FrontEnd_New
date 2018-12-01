import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navegacion-inferior',
  templateUrl: './navegacion-inferior.component.html',
  styleUrls: ['./navegacion-inferior.component.css']
})
export class NavegacionInferiorComponent  {

  categorias: any[] = [];

  constructor( private http:HttpClient ) { 

  
    this.http.get('http://localhost:8000/api/home_page_category_orders')
      .subscribe( (resp: any) => {
        this.categorias = resp.data;
        console.log(this.categorias);
        console.log(this.categorias[0].category_name );
        console.log(this.categorias[1].category_name );
      })

  }


}
