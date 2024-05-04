import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './component/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './component/product/product.component';
import { ProductDescriptionComponent } from './component/product-description/product-description.component';



@NgModule({
  declarations: [
    CategoryComponent,
    ProductComponent,
    ProductDescriptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProductModule { }
