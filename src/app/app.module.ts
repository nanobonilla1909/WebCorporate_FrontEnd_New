import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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

// Importar Rutas
import { ROUTES } from './app.routes';

// Importar Servicios
import { ApiWebcorporateService } from './services/api-webcorporate.service';



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
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot( ROUTES, { useHash: true } )
  ],
  providers: [
    ApiWebcorporateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
