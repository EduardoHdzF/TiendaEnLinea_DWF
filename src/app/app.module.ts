import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './module/product/product.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './module/authentication/authentication.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptorInterceptor } from './core/intercetor/jwt-interceptor.interceptor';
import { CommonsModule } from './module/commons/commons.module';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { FooterComponent } from './module/layout/footer/footer.component';
import { NavbarComponent } from './module/layout/navbar/navbar.component';
import { RegisterComponent } from './module/authentication/register/register.component';
import { InvoiceComponent } from './module/invoice/component/invoice/invoice.component';
import { CommonModule } from '@angular/common';
import { CartComponent } from './module/invoice/component/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    InvoiceComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    AuthenticationModule,
    CommonsModule,
    FormsModule,
    FontAwesomeModule,
    //ReactiveFormsModule,
    NgxPhotoEditorModule,
    CommonModule
  ],
  providers: [provideHttpClient(withInterceptors([jwtInterceptorInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
