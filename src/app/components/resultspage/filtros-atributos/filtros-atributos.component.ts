import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';


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

  selectedOptions1: number[];
  selectedOptions2: number[];

  @Output()
  selectionChanged: EventEmitter<number[]> = new EventEmitter<number[]>();

  @Input()
  product_attributes1: AttributesValues[];

  @Input()
  product_attributes2: AttributesValues[];

  formulario: FormGroup;
 

  constructor(private fb: FormBuilder) {
   }


  ngOnInit() {

    this.formulario = this.fb.group({
      precio_desde: [],
      precio_hasta: [],
      product_attributes1: this.buildProductAttributes1(),
      product_attributes2: this.buildProductAttributes2()
    })
  }



  buildProductAttributes1() {

    const values = this.product_attributes1.map(v => new FormControl(false));
    return this.fb.array(values);
  }

  buildProductAttributes2() {

    const values = this.product_attributes2.map(v => new FormControl(false));
    return this.fb.array(values);
  }


  get formCheckboxesAttributes1() { 
    
    return <FormArray>this.formulario.get('product_attributes1'); 
  }

  get formCheckboxesAttributes2() { 
    
    return <FormArray>this.formulario.get('product_attributes2'); 
  }
  


  attributesSelectionChanged(){

    this.selectedOptions1 = [];
    this.selectedOptions2 = [];
    
    console.log("PASSSSSSSAAAAAA");
    var product_attributes1_values = this.formulario.controls.product_attributes1.value
    var product_attributes2_values = this.formulario.controls.product_attributes2.value
  
    for(var i = 0; i < product_attributes1_values.length; i++) {
       if (product_attributes1_values[i]) {
          this.selectedOptions1.push(this.product_attributes1[i].options_id);
       }
    }  

    for(var i = 0; i < product_attributes2_values.length; i++) {
      if (product_attributes2_values[i]) {
         this.selectedOptions2.push(this.product_attributes2[i].options_id);
      }
   }  

    console.log("ESTE ES EL SELECTED OPTIONS");
    console.log(this.selectedOptions1);
    this.selectionChanged.emit(this.selectedOptions1); 
  }

}