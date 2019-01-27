import { Routes } from '@angular/router';
import { HomeComponent } from './components/homepage/home/home.component';
import { ResultsComponent } from './components/resultspage/results/results.component';
import { CheckoutComponent } from './components/checkoutpage/checkout/checkout.component';


export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'results', component: ResultsComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];