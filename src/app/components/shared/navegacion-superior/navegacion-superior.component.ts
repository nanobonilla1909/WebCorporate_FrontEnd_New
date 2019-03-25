import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItemsQuantity } from '../../../services/cart-items-quantity';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navegacion-superior',
  templateUrl: './navegacion-superior.component.html',
  styleUrls: ['./navegacion-superior.component.css']
})
export class NavegacionSuperiorComponent implements OnInit {


  // @Input() cant_items_bolsa: number;
  cant_items_bolsa: number = 0;
  searchedText: string;

  constructor(private router:Router, private cart_items_service: CartItemsQuantity) { }

  ngOnInit() {

    this.cart_items_service.mysubject.subscribe( (value) => {
      this.cant_items_bolsa = this.cant_items_bolsa + value;
    
      
      });

  }

  searchSubmitted(forma: NgForm){
    // console.log("Detro de la accion del boton: ");
    // console.log(forma.value);
    
    this.router.navigate(['/results'], { queryParams: { searchTerm: this.searchedText } });
    console.log();
    
    
  }

}
