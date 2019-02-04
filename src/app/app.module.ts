import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

// Importar Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/homepage/home/home.component';
import { NavegacionSuperiorComponent } from './components/shared/navegacion-superior/navegacion-superior.component';
import { NavegacionInferiorComponent } from './components/shared/navegacion-inferior/navegacion-inferior.component';
import { CarrouselHomeComponent } from './components/homepage/carrousel-home/carrousel-home.component';
import { BanksHomeComponent } from './components/homepage/banks-home/banks-home.component';
import { FeaturedProductsHomeComponent } from './components/homepage/featured-products-home/featured-products-home.component';
import { CategoryIconsHomeComponent } from './components/homepage/category-icons-home/category-icons-home.component';
import { ProductCardComponent } from './components/shared/product-card/product-card.component';
import { HighlightedItemsHomeComponent } from './components/homepage/highlighted-items-home/highlighted-items-home.component';
import { ResultsComponent } from './components/resultspage/results/results.component';
import { SuscriptionsComponent } from './components/shared/suscriptions/suscriptions.component';
import { SocialNetworksComponent } from './components/shared/social-networks/social-networks.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavegacionResultadosComponent } from './components/resultspage/navegacion-resultados/navegacion-resultados.component';
import { BreadcrumbCategoriasComponent } from './components/resultspage/breadcrumb-categorias/breadcrumb-categorias.component';
import { PanelFiltrosComponent } from './components/resultspage/panel-filtros/panel-filtros.component';
import { FiltrosCategoriasComponent } from './components/resultspage/filtros-categorias/filtros-categorias.component';
import { FiltrosAtributosComponent } from './components/resultspage/filtros-atributos/filtros-atributos.component';
import { ProductResultsFilterPipe } from './components/resultspage/results/product-results-fliter.pipe';
import { CheckoutComponent } from './components/checkoutpage/checkout/checkout.component';
import { CartComponent } from './components/checkoutpage/cart/cart.component';


// Importar Rutas
import { ROUTES } from './app.routes';

// Importar Servicios
import { ApiWebcorporateService } from './services/api-webcorporate.service';
import { CartItemsQuantity } from './services/cart-items-quantity';
import { CartItemComponent } from './components/checkoutpage/cart-item/cart-item.component';
import { StepperComponent } from './components/checkoutpage/stepper/stepper.component';
import { ShippingComponent } from './components/checkoutpage/shipping/shipping.component';
import { PaymentComponent } from './components/checkoutpage/payment/payment.component';


  
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavegacionSuperiorComponent,
    NavegacionInferiorComponent,
    CarrouselHomeComponent,
    BanksHomeComponent,
    FeaturedProductsHomeComponent,
    CategoryIconsHomeComponent,
    ProductCardComponent,
    HighlightedItemsHomeComponent,
    ResultsComponent,
    SuscriptionsComponent,
    SocialNetworksComponent,
    FooterComponent,
    NavegacionResultadosComponent,
    BreadcrumbCategoriasComponent,
    PanelFiltrosComponent,
    FiltrosCategoriasComponent,
    FiltrosAtributosComponent,
    ProductResultsFilterPipe,
    CheckoutComponent,
    CartComponent,
    CartItemComponent,
    StepperComponent,
    ShippingComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot( ROUTES, { useHash: false } )
    // RouterModule.forRoot( ROUTES, { useHash: true, enableTracing: true } )
  ],
  providers: [
    ApiWebcorporateService,
    CartItemsQuantity
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
