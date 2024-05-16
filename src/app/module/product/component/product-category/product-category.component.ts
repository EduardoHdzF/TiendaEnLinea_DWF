import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../_service/product.service';
import { Product } from '../../_model/product';
import { DtoProductList } from '../../_dto/dto-product-list';
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalMessages } from '../../../commons/_model/swal-messages';
import { ProductImage } from '../../_model/product-image';
import { ProductImageService } from '../../_service/product-image.service';

declare var $: any; // JQuery

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css'
})
export class ProductCategoryComponent {

  category_id: number = 0;
  images: ProductImage[] = [];
  products: DtoProductList[] = []; // product list
  categories: Category[] = []; // category list
  productToUpdate: number = 0; // product id

  // Product form
  form = this.formBuilder.group({
    product: ["", [Validators.required]],
    gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    description: ["", [Validators.required]],
    price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    stock: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    category_id: [0, [Validators.required]],
  });

  submitted = false; // Form submitted

  constructor( 
    private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private productImageService: ProductImageService,
    private router: Router
  ){}

  swal: SwalMessages = new SwalMessages(); // swal messages

  ngOnInit(): void {
    this.category_id = +this.route.snapshot.paramMap.get('category_id')!;
    this.getProductsByCategory(this.category_id);
  }

  getProducts(){
    this.productService.getProducts().subscribe({
      next: (v) => {
        this.products = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  getActiveCategories(){
    this.categoryService.getActiveCategories().subscribe({
      next: (v) => {
        this.categories = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }
  // images
  getProductImages(id: number){
    this.productImageService.getProductImages(id).subscribe({
      next: (v) => {
        this.images = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }
  showDescription(gtin: string){
    this.router.navigate(['product/' + gtin]);
  }

  getProductsByCategory(category_id: number): void {
    this.productService.getProductsByCategory(category_id).subscribe({
      next: (v) => {
        this.products = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

}
