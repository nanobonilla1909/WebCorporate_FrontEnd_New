import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiWebcorporateService } from '../../../services/api-webcorporate.service';
import { CartItemsQuantity } from '../../../services/cart-items-quantity';

interface PaymentOption{
  payment_method_id: number;
  name: string;
  banks?: Bank[];
  is_active?: boolean;
}

interface Bank{
  bank_id: number;
  bank_name: string;
  bank_key?: string;
  bank_key2?: string;
  bank_comments?: string;
  bank_benefits?: BankBenefit[]
}

interface BankBenefit{
  bank_benefit_id: number;
  quotes: number;
  interest: number;
  description?: string;
  is_active?: boolean;
}


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})



export class PaymentComponent implements OnInit {

  // formulario: FormGroup;
  payment_options: PaymentOption[]=[];
  payment_option_selected: number = 1;
  banks: Bank[]=[];

  total_amount_cart: number;
  cant_items_carrito: number;


  constructor(private http: ApiWebcorporateService, private cart_items_service: CartItemsQuantity) { }

  ngOnInit() {

    this.payment_options.push(
      {
        payment_method_id: 1,
        is_active: false,
        name: "Visa",
        banks: [
          {
            bank_id: 2,
            bank_name: "Banco Frances",
            bank_benefits: [
              {
                bank_benefit_id: 2,
                quotes: 6,
                interest: 0
              },
              {
                bank_benefit_id: 3,
                quotes: 9,
                interest: 0
              },
              {
                bank_benefit_id: 4,
                quotes: 12,
                interest: 0
              }
            ]
          },
          {
            bank_id: 1,
            bank_name: "Banco Nacion",
            bank_benefits: [
              {
                bank_benefit_id: 1,
                quotes: 6,
                interest: 0
              }
            ]
          }
        ]
      
      },
      {
        payment_method_id: 2,
        is_active: false,
        name: "Mastercard",
        banks: [
          {
            bank_id: 3,
            bank_name: "Banco Provincia",
            bank_benefits: [
              {
                bank_benefit_id: 5,
                quotes: 6,
                interest: 15
              }
            ]
          }
        ]
      }
      
      );
   

  }

  paymentOptionSelected(id){

    var bank_max_quotes:number;

    for (let pmt_op of this.payment_options) {
      if (pmt_op.payment_method_id == id){
        pmt_op.is_active = true;
      } else {
        pmt_op.is_active = false;
      }
    }

    var selectedPO = this.payment_options.find(po => po.payment_method_id == id);

    // console.log("selectedPO: ", selectedPO);
    this.banks = selectedPO.banks;
    let pm_prefix = selectedPO.name.slice(0,4);
    

    // Recorre todos las opciones de Pago con esa tarjeta y completa los datos de los drop-down
    
    for(let j=0; j<this.banks.length; j++) {
        bank_max_quotes = 0
        this.banks[j].bank_key = pm_prefix + "-Banco" + this.banks[j].bank_id;
        this.banks[j].bank_key2 = "#" + pm_prefix + "-Banco" + this.banks[j].bank_id;
        for(let k=0; k<this.banks[j].bank_benefits.length; k++) {
           if (this.banks[j].bank_benefits[k].quotes > bank_max_quotes && this.banks[j].bank_benefits[k].interest == 0) {
              bank_max_quotes = this.banks[j].bank_benefits[k].quotes;
           }   
          if (this.banks[j].bank_benefits[k].interest == 0) {
            this.banks[j].bank_benefits[k].description = this.banks[j].bank_benefits[k].quotes + ' cuotas sin Interes';
          } else {
            this.banks[j].bank_benefits[k].description = 'En ' + this.banks[j].bank_benefits[k].quotes + ' cuotas con Interes (' + this.banks[j].bank_benefits[k].interest + '%)';
          }
           
        } 
        this.banks[j].bank_comments = "Hasta " + bank_max_quotes + " sin interes";

    }
    console.log(this.banks);
    console.log(this.payment_options);
    
  } 
    
  bankBenefitSelected(selected_bank_benefit){
    console.log('bank_benefit_id', selected_bank_benefit);

    for (let pmt_op of this.payment_options) {
      for (let bank of pmt_op.banks) {
        for (let bank_benef of bank.bank_benefits) {
          if ( bank_benef.bank_benefit_id == selected_bank_benefit){
            bank_benef.is_active = true;
          } else {
            bank_benef.is_active = false;
          }
        }
      }



      




    }
  } 
    

}
