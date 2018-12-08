import { Component, OnInit } from '@angular/core';
import { ApiWebcorporateService } from '../../../services/api-webcorporate.service';

interface OrdenCategoriasIconos{
  position: number;
  product_category_id: number;
  category_name: string;
  category_icon: string;
}
  
@Component({
  selector: 'app-category-icons-home',
  templateUrl: './category-icons-home.component.html',
  styleUrls: ['./category-icons-home.component.css']
})
export class CategoryIconsHomeComponent implements OnInit {


  filterByPosition = (categorias: OrdenCategoriasIconos[], range: {min: number, max:number}) => categorias.filter(categoria => categoria.position >= range.min && categoria.position <= range.max ); 

  categoriasVisibles: OrdenCategoriasIconos[] = [];
  categoriasNoVisibles: OrdenCategoriasIconos[] = [];

  categorias: any[] = [];

  constructor(private http:ApiWebcorporateService) { 

    this.http.getCategoriesOrder()
      .subscribe( (resp: any) => {
        this.categorias = resp.data;

        this.categoriasVisibles = this.filterByPosition(this.categorias, {min:1, max:8})
        this.categoriasNoVisibles = this.filterByPosition(this.categorias, {min:9, max:11})


      });
  }

  ngOnInit() {
  }

}
