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
  selectionChanged: EventEmitter<object> = new EventEmitter<object>();
  
  @Input()
  product_attributes1: AttributesValues[];

  @Input()
  product_attributes2: AttributesValues[];

  formulario: FormGroup;
 

  constructor(private fb: FormBuilder) {
   }


  ngOnInit() {

    console.log("PAS X INIT DE ATRIBUTOS");
    
    this.formulario = this.fb.group({
      precio_desde: [],
      precio_hasta: [],
      product_attributes1: this.buildProductAttributes1(),
      product_attributes2: this.buildProductAttributes2()
    })
  }


  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    // console.log("docheck");
    this.formulario = this.fb.group({
      precio_desde: [],
      precio_hasta: [],
      product_attributes1: this.buildProductAttributes1(),
      product_attributes2: this.buildProductAttributes2()
    })

  }

  /*

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log("filtros-atributos: contentinit");

  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    console.log("filtros-atributos: contentchecked");

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log("filtros-atributos: viewinit");

  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    console.log("filtros-atributos: viewcheck");

  } */



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

    // console.log("ESTOS SON LOS SELECTED OPTIONS");
    // console.log(this.selectedOptions1);
    // console.log(this.selectedOptions2);
    this.selectionChanged.emit({attr1: this.selectedOptions1, attr2: this.selectedOptions2}); 
  }

}