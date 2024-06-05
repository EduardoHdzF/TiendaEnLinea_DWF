import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from '../product/product.module';
import { AuthenticationModule } from '../authentication/authentication.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductModule,
    AuthenticationModule
  ]
})
export class LayoutModule { }
