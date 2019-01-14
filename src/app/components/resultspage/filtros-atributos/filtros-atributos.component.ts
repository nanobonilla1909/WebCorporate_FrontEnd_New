import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';


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
  
  selectedOptions: number[]=[3, 6];
  opc1:any;


// empiezo aca las prubeas
  selectedCheckBox2: boolean = true; 

  @Output()
  selectionChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  product_attributes1: AttributesValues[];

  @Input()
  product_attributes2: AttributesValues[];

 

  constructor() {

   }

  ngOnInit() {

     
  }

  attribSelectionChanged(){
    // this.selectionDoneDef.emit(this.selectedOptions); 
    console.log("PASSSSSSSAAAAAA");
    console.log(this.selectedCheckBox2);
    this.selectionChanged.emit(this.selectedCheckBox2); 
  }

  log(x) {
    // console.log(x);
  }

  cambio(y) {
    // console.log(y);
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