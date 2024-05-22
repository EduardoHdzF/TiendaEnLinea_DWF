import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './component/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './component/product/product.component';
import { ProductDescriptionComponent } from './component/product-description/product-description.component';
import { HomeComponent } from './component/home/home.component';
import { ProductCategoryComponent } from './component/product-category/product-category.component';
import { CartComponent } from '../invoice/component/cart/cart.component';



@NgModule({
  declarations: [
    CategoryComponent,
    ProductComponent,
    ProductDescriptionComponent,
    HomeComponent,
    // CartComponent,
    ProductCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProductModule { }
