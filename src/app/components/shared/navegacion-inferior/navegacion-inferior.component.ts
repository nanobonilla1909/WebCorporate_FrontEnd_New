import { Component, OnInit } from '@angular/core';
import { ApiWebcorporateService } from '../../../services/api-webcorporate.service';
import { Router } from '@angular/router';

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

  


  constructor( private http:ApiWebcorporateService, private router:Router ) { 


    this.http.getCategoriesOrder()
      .subscribe( (resp: any) => {
        this.categorias = resp.data;

       console.log("this.categorias: ", this.categorias);
       

        this.categoriasVisibles = this.filterByPosition(this.categorias, {min:1, max:8})
        this.categoriasNoVisibles = this.filterByPosition(this.categorias, {min:9, max:11})


      });

  }

  onClick(category_id: number, category_name: string) {
    
    this.router.navigate(['/results', { category_id: category_id, category_name: category_name, source: 'menu_categ'}]);
    // console.log(category_id);

  }

x






}
