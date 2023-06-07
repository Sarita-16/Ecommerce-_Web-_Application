import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/core/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { WishlistComponent } from './components/core/wishlist/wishlist.component';
import { CartComponent } from './components/core/cart/cart.component';
import { PageNotFoundComponent } from './components/core/page-not-found/page-not-found.component';
import { LoginComponent } from './components/core/login/login.component';
import { SignupComponent } from './components/core/signup/signup.component';
import { ProductViewComponent } from './components/core/product-view/product-view.component';
import { ProductItemComponent } from './components/core/product-view/product-item/product-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    WishlistComponent,
    CartComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignupComponent,
    ProductViewComponent,
    ProductItemComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
