import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiWebcorporateService } from '../../../services/api-webcorporate.service';
import { CartItemsQuantity } from '../../../services/cart-items-quantity';
import { CartItemDisplay } from '../../../models/cart-item-display';
import { Order } from '../../../models/order.model';
import { OrderItem } from '../../../models/order-item.model';
import { MatDialog } from '@angular/material';
import { FormWithErrorsComponent } from '../../shared/form-with-errors/form-with-errors.component';
import { OrderPlacedComponent } from '../modals/order-placed/order-placed.component';

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
  bank_id?: number;
  payment_method_id?: number;
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

  
  payment_options: PaymentOption[]=[];
  new_payment_options: PaymentOption[]=[];
  banks: Bank[]=[];
  // selected_bank_benefit: BankBenefit;
  selected_payment_method: number;
  selected_bank_id: number;
  selected_quotes: number;

  total_amount_cart: number;
  cant_items_carrito: number;
  cart_items: CartItemDisplay[] = [];
  total_amount_price: number;
  total_amount_discount: number;
  subtotal_amount_cart: number;
  cart_quantity: number;
  user_deliveries: any[] = [];
  new_order: Order;
  loading: boolean;

  payment_form = new FormGroup({

    'card_number': new FormControl('', [
      Validators.required,
      // Validators.pattern("^\d{6,8}$")
      ]),
    'security_code': new FormControl('', Validators.required),
    'expired_on': new FormControl('', Validators.required),
    'id_type': new FormControl('DNI', Validators.required),
    'id_number': new FormControl('', Validators.required)
  });

  get card_number() {
    return this.payment_form.get('card_number');
  }

  get security_code() {
    return this.payment_form.get('security_code');
  }

  get expired_on() {
    return this.payment_form.get('expired_on');
  }

  get id_type() {
    return this.payment_form.get('id_type');
  }

  get id_number() {
    return this.payment_form.get('id_number');
  }


  constructor(public dialog: MatDialog, private http: ApiWebcorporateService, private cart_items_service: CartItemsQuantity) { }

  ngOnInit() {

    

    this.loading = true;

    this.http.getPaymentOptions()
    .subscribe( (resp: any) => {
        this.new_payment_options = resp;
    
          this.payment_options = this.new_payment_options
    
          this.http.getCartItems(1)
          .subscribe( (resp: any) => {
      
              this.cart_items = resp.data;
              
              this.subtotal_amount_cart = 0;
              this.total_amount_discount = 0;
              this.cart_quantity = 0;
              for (let item of this.cart_items) {
                this.subtotal_amount_cart = this.subtotal_amount_cart + (item['price'] * item['quantity']);
                this.total_amount_discount = this.total_amount_discount + (item['discount_amount'] * item['quantity']);
                this.cart_quantity = this.cart_quantity + item['quantity'];
              }
              this.total_amount_cart = this.subtotal_amount_cart - this.total_amount_discount;
              this.cart_items_service.mysubject.next(this.cart_quantity);

              this.http.getUserDeliveryInformation(1)
                .subscribe( (resp: any) => {
      
                  this.user_deliveries = resp.data;
              });

              this.loading = false;
    
             
    
          });

    });

  }

  paymentOptionSelected(id){

    this.selected_payment_method = id;
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
    // this.selected_bank_benefit.bank_benefit_id =

    for (let pmt_op of this.payment_options) {
      for (let bank of pmt_op.banks) {
        for (let bank_benef of bank.bank_benefits) {
          if ( bank_benef.bank_benefit_id == selected_bank_benefit){
            this.selected_bank_id = bank_benef.bank_id;
            this.selected_quotes = bank_benef.quotes;
            bank_benef.is_active = true;
          } else {
            bank_benef.is_active = false;
          }
        }
      }

    }
  } 

  saveOrder() {

    if (this.payment_form.valid && this.selected_quotes) {

        console.log(this.payment_form);
      
        this.new_order = new Order();
    
        this.new_order.order_number = 50505;
        this.new_order.order_type_id = 1;
        this.new_order.customer_id = 1;
        this.new_order.payment_method_id = this.selected_payment_method;
        this.new_order.quotes = this.selected_quotes;
        this.new_order.bank_id = this.selected_bank_id;   
        this.new_order.total = this.total_amount_cart;
        this.new_order.order_status_id = 1;
        this.new_order.delivery_id = this.user_deliveries[0].delivery_id;
        this.new_order.card = "";
    
        this.new_order.card_number = this.payment_form.get('card_number').value;
        


        // this.new_order.token = ;
        // this.new_order.code_auth = ;
        // this.new_order.site_transaction_id = ;


        this.new_order.order_items = [];
    
        for (let cart_item of this.cart_items) {
    
            var new_item = new OrderItem();
            new_item.product_id = cart_item.product_id;
            new_item.description  = cart_item.name;
            new_item.image  = cart_item.image;
            new_item.quantity  = cart_item.quantity;
            new_item.price_list  = cart_item.price;
            new_item.price  = cart_item.price;
            new_item.discount_subtotal  = cart_item.discount_amount;
            new_item.subtotal  = cart_item.price - cart_item.discount_amount;
            new_item.is_a_gift  = false;
            
            this.new_order.order_items.push(new_item);        
    
        }   


        this.http.createOrder(this.new_order)
        .subscribe( (resp: any) => {
          console.log(resp);

          this.showOrderPlacedDialog();
    
        });  

    } else {

      this.openFormWithErrorDialog();
    }
    

  }
    
  showOrderPlacedDialog() {
    const dialogRef = this.dialog.open(OrderPlacedComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {

        this.payment_form.reset({
          card_number:"",
          security_code:"",
          expired_on:"",
          // id_type:"",
          id_number: ""

          });

          this.payment_options=[];
          this.new_payment_options =[];
          this.banks=[];
    
          this.selected_payment_method = 0;
          this.selected_bank_id = 0;
          this.selected_quotes = 0;

          this.total_amount_cart = 0;
          this.cant_items_carrito = 0;
          this.cart_items = [];
          this.total_amount_price = 0;
          this.total_amount_discount = 0;
          this.subtotal_amount_cart = 0;
          this.cart_quantity = 0;
          this.user_deliveries = [];
      


    });
    
  }

  openFormWithErrorDialog() {
    const dialogRef = this.dialog.open(FormWithErrorsComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.resultado = result;
    });
    
  }

  // Simulado por si no funciona la api
  //------------------------------------
  // this.payment_options.push(
  //   {
  //     payment_method_id: 1,
  //     is_active: false,
  //     name: "Visa",
  //     banks: [
  //       {
  //         bank_id: 2,
  //         bank_name: "Banco Frances",
  //         bank_benefits: [
  //           {
  //             bank_benefit_id: 2,
  //             quotes: 6,
  //             interest: 0
  //           },
  //           {
  //             bank_benefit_id: 3,
  //             quotes: 9,
  //             interest: 0
  //           },
  //           {
  //             bank_benefit_id: 4,
  //             quotes: 12,
  //             interest: 0
  //           }
  //         ]
  //       },
  //       {
  //         bank_id: 1,
  //         bank_name: "Banco Nacion",
  //         bank_benefits: [
  //           {
  //             bank_benefit_id: 1,
  //             quotes: 6,
  //             interest: 0
  //           }
  //         ]
  //       }
  //     ]
    
  //   },
  //   {
  //     payment_method_id: 2,
  //     is_active: false,
  //     name: "Mastercard",
  //     banks: [
  //       {
  //         bank_id: 3,
  //         bank_name: "Banco Provincia",
  //         bank_benefits: [
  //           {
  //             bank_benefit_id: 5,
  //             quotes: 6,
  //             interest: 15
  //           }
  //         ]
  //       }
  //     ]
  //   }
    
  //   );

}
