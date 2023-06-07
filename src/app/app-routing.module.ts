import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/core/cart/cart.component';
import { HomeComponent } from './components/core/home/home.component';
import { LoginComponent } from './components/core/login/login.component';
import { PageNotFoundComponent } from './components/core/page-not-found/page-not-found.component';
import { ProductViewComponent } from './components/core/product-view/product-view.component';
import { SignupComponent } from './components/core/signup/signup.component';
import { WishlistComponent } from './components/core/wishlist/wishlist.component';
import { GeneralComponent } from './components/shared/general/general.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home', component: HomeComponent },
    { path: 'wishlist', component: WishlistComponent },
    { path: 'products/:category', component: ProductViewComponent },
    { path: 'cart', component: CartComponent },
    { path: 'commonQuestions', component: GeneralComponent},
    { path: '',   redirectTo: '/home', pathMatch: 'full' }, 
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }