import { NgModule } from '@angular/core';
import "rxjs/Rx";
import { Subject } from "rxjs/Subject";



export class CartItemsQuantity {

    public mysubject : Subject<number> = new Subject();

}