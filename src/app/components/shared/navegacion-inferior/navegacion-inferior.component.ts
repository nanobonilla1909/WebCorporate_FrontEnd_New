import { Component, OnInit } from '@angular/core';
import { ApiWebcorporateService } from '../../../services/api-webcorporate.service';

interface OrdenCategorias{
  position: number;
  product_category_id: number;
  category_name: string;
}


@Component({
  selector: 'app-navegacion-inferior',
  templateUrl: './navegacion-inferior.component.html',
  styleUrls: ['./navegacion-inferior.component.css']
})


export class NavegacionInferiorComponent {


  filterByPosition = (categorias: OrdenCategorias[], range: {min: number, max:number}) => categorias.filter(categoria => categoria.position >= range.min && categoria.position <= range.max ); 

  categoriasVisibles: OrdenCategorias[] = [];
  categoriasNoVisibles: OrdenCategorias[] = [];

  categorias: any[] = [];

  


  constructor( private http:ApiWebcorporateService ) { 


    this.http.getCategoriesOrder()
      .subscribe( (resp: any) => {
        this.categorias = resp.data;
       
        console.log(this.categorias);

        this.categoriasVisibles = this.filterByPosition(this.categorias, {min:1, max:6})
        this.categoriasNoVisibles = this.filterByPosition(this.categorias, {min:7, max:11})


      });

  }

   // constructor( private http:HttpClient ) { 

  
  //   this.http.get('http://localhost:8000/api/home_page_category_orders')
  //     .subscribe( (resp: any) => {
  //       this.categorias = resp.data;
        
  //       console.log(this.categorias);
  //       this.primerCategoria = this.categorias[0].category_name
        
  //       console.log( this.primerCategoria );
        
  //       this.categoriasVisibles = this.filterByPosition(this.categorias, {min:2, max:6})
  //       this.categoriasNoVisibles = this.filterByPosition(this.categorias, {min:7, max:11})


  //     })

  // }






}
