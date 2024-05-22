import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './module/product/component/category/category.component';
import { LoginComponent } from './module/authentication/login/login.component';
import { SecuredComponent } from './module/authentication/secured/secured.component';
import { authenticationGuard } from './module/authentication/_guard/authentication.guard';
import { ProductComponent } from './module/product/component/product/product.component';
import { ProductDescriptionComponent } from './module/product/component/product-description/product-description.component';
import { HomeComponent } from './module/product/component/home/home.component';
import { RegisterComponent } from './module/authentication/register/register.component';
import { InvoiceComponent } from './module/invoice/component/invoice/invoice.component';
import { ProductCategoryComponent } from './module/product/component/product-category/product-category.component';
import { CartComponent } from './module/invoice/component/cart/cart.component';


const routes: Routes = [
  {path: "category", component: CategoryComponent},
  {path: "product", component: ProductComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'secured', component: SecuredComponent, canActivate : [authenticationGuard]},
  {path: 'product/:gtin', component: ProductDescriptionComponent},
  {path: '', component: HomeComponent},
  {path: 'factura', component: InvoiceComponent},
  {path: 'product/category/:category_id', component: ProductCategoryComponent},
  {path: 'cart', component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }





