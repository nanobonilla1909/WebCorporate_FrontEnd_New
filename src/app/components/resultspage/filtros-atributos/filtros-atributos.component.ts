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


  selectedCheckBox: boolean[] = [false, false, false, false];
  opc1:any;


// empiezo aca las prubeas
  selectedCheckBox2: boolean = true; 
  selectedOptions: number[]=[3, 6];

  @Output()
  selectionChanged: EventEmitter<number[]> = new EventEmitter<number[]>();

  @Input()
  product_attributes1: AttributesValues[];

  @Input()
  product_attributes2: AttributesValues[];


  frameworks = ['Angular','React','Sencha'];
  formulario: FormGroup;
 

  constructor(private fb: FormBuilder) {
    
   }

  ngOnInit() {

    // console.log("PASSSSSSSOOOOOOOO");
    // console.log(this.product_attributes1);
    this.formulario = this.fb.group({
      precio_desde: [],
      precio_hasta: [],
      frameworks: this.buildFrameworks(),
      product_attributes1: this.buildProductAttributes()
    })
  }


  buildFrameworks() {

    const values = this.frameworks.map(v => new FormControl(false));
    return this.fb.array(values);
  }

  buildProductAttributes() {

    
    // console.log(this.product_attributes1);
    const values = this.product_attributes1.map(v => new FormControl(false));
    return this.fb.array(values);
  }

  get formData() { 
    
    return <FormArray>this.formulario.get('frameworks'); 
  }

  get formCheckboxes() { 
    
    return <FormArray>this.formulario.get('product_attributes1'); 
  }
  


  attributesSelectionChanged(){
 

    this.selectedOptions = [];
    
   
    console.log("PASSSSSSSAAAAAA");
    var product_attributes1_values = this.formulario.controls.product_attributes1.value
  
    for(var i = 0; i < product_attributes1_values.length; i++) {
       if (product_attributes1_values[i]) {
          this.selectedOptions.push(this.product_attributes1[i].options_id);
       }
    }  

    console.log("ESTE ES EL SELECTED OPTIONS");
    console.log(this.selectedOptions);
    this.selectionChanged.emit(this.selectedOptions); 
  }

}