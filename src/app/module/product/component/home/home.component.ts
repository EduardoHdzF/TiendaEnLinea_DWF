import { Component } from '@angular/core';
import { ProductService } from '../../_service/product.service';
import { DtoProductList } from '../../_dto/dto-product-list';
import { SwalMessages } from '../../../commons/_model/swal-messages'; 
import { Category } from '../../_model/category';
import { ProductImageService } from '../../_service/product-image.service';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { Router } from '@angular/router';
import { CategoryService } from '../../_service/category.service';
import { ProductImage } from '../../_model/product-image';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: DtoProductList[] = []; // product list
  swal: SwalMessages = new SwalMessages(); // swal messages
  categories: Category[] = []; // category list
  images: ProductImage[] = [];
  

  constructor( 
    private categoryService: CategoryService,
    private productService: ProductService,
    private productImageService: ProductImageService,
    private service: NgxPhotoEditorService,
    private router: Router
  ){}
  
  ngOnInit(){
    console.log("verde")
    this.getProducts();
    this.getActiveCategories();
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
}
