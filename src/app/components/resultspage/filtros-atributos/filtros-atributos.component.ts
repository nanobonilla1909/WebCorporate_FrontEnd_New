import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Logs } from 'selenium-webdriver';

interface AttributesValues{
  type_id: number;
  name: string;
  options_id: number;
  value: string;
}

@Component({
  selector: 'app-filtros-atributos',
  templateUrl: './filtros-atributos.component.html',
  styleUrls: ['./filtros-atributos.component.css']
})



export class FiltrosAtributosComponent implements OnInit {

  type_id_1: number;
  type_id_2: number;

  selectedCheckBox: boolean[] = [false, false, false, false];
  selectedCheckBox2: boolean; 
  opc1:any;

  @Output()
  selectionDone: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  product_attributes1: AttributesValues[];

  @Input()
  product_attributes2: AttributesValues[];

 

  constructor() {

   }

  ngOnInit() {

      // if (this.product_attributes1.length > 0) {
      //   this.type_id_1 = this.product_attributes1[0].type_id;
      // }
      // if (this.product_attributes2.length > 0) {
      //   this.type_id_2 = this.product_attributes2[0].type_id;
      // }
      console.log("OnInit")
      console.log(this.product_attributes1);
      // console.log('Leyenda', this.array_leyenda)
  }

  attribSelectionChanged(){
    this.selectionDone.emit(this.selectedCheckBox2); 
  }

  log(x) {
    // console.log(x);
  }

  cambio(y) {
    // console.log(y);
  }

  imprimir() {
    // console.log('selectedCheckBox[0]: ' + this.selectedCheckBox[0]);
    this.selectionDone.emit(this.selectedCheckBox[0]);
  }

 
  // ngAfterContentInit() {
  //   console.log("ngAfterContentInit");
  //   console.log(this.product_attributes1);
  // }

  // ngAfterContentChecked() {
  //   console.log("ngAfterContentChecked");
  //   console.log(this.product_attributes1);
  // }

  // ngAfterViewInit() {
  //   console.log("ngAfterViewInit");
  //   console.log(this.product_attributes1);
  // }

  // ngAfterViewChecked() {
  //   console.log("ngAfterViewChecked");
  //   console.log(this.product_attributes1);
  // }


}