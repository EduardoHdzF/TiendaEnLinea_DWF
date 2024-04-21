import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './module/product/component/category/category.component';
import { LoginComponent } from './module/authentication/login/login.component';
import { SecuredComponent } from './module/authentication/secured/secured.component';
import { authenticationGuard } from './module/authentication/_guard/authentication.guard';
import { ProductComponent } from './module/product/component/product/product.component';

const routes: Routes = [
  {path: "category", component: CategoryComponent},
  {path: "product", component: ProductComponent},
  {path: 'login', component: LoginComponent},
  {path: 'secured', component: SecuredComponent, canActivate : [authenticationGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
