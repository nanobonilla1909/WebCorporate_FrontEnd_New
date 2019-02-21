import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {


  @Input() step: number;


  constructor() { }

  ngOnInit() {

    console.log('this.step: ', this.step)
  }

}
