import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SwalMessages } from '../../../commons/_model/swal-messages';
import { ProductService } from '../../_service/product.service';
import { DtoProductList } from '../../_dto/dto-product-list';
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';
import { Product } from '../../_model/product';
import { ProductImage } from '../../_model/product-image';
import { ProductImageService } from '../../_service/product-image.service';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../invoice/_service/cart.service';
import { DtoProductCategoryList } from '../../_dto/dto-product-category-list';
import { Cart } from '../../../invoice/_model/cart';
import { CartComponent } from '../../../invoice/component/cart/cart.component';

declare var $: any; // JQuery

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrl: './product-description.component.css'
})

export class ProductDescriptionComponent {

  products: DtoProductList[] = []; // product list
  productToUpdate: number = 0; // product id
  gtin: string = "";

  categories: Category[] = []; // category list
  images: ProductImage[] = [];
  product: Product = new Product(); // product
  //category: category;

  quantity: number = 1;

  // Product form
  form = this.formBuilder.group({
    product: ["", [Validators.required]],
    gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    description: ["", [Validators.required]],
    price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    stock: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    category_id: [0, [Validators.required]],
    //category: ["", [Validators.required]],
  });
  
  submitted = false; // Form submitted
  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private productImageService: ProductImageService,
    private formBuilder: FormBuilder,
    private service: NgxPhotoEditorService,
    private route: ActivatedRoute, // recupera parámetros de la url
    private cartService: CartService,
    //private category: Category,
  ){}
  
  ngOnInit(){
    this.gtin = this.route.snapshot.paramMap.get('gtin')!;
    console.log(this.gtin); 
    
    this.productService.getProduct(this.gtin).subscribe({
      next: (v) => {
        this.product = v.body!;
        this.getProductImages(this.product.product_id);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
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
    
  
  onSubmit(){
    // validate form
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;
    this.productService.createProduct(this.form.value).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getProducts(); // reload products
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }


  onSubmitUpdate(){
    this.productService.updateProduct(this.form.value, this.productToUpdate).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getProducts(); // reload products
        this.productToUpdate = 0; // reset product to update
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }
  
  updateProduct(gtin: string){
    this.productService.getProduct(gtin).subscribe({
      next: (v) => {
        let product = v.body!;
        this.productToUpdate = product.product_id;
        this.form.reset();
        this.submitted = false;
        this.form.controls['product'].setValue(product.product);
        this.form.controls['gtin'].setValue(product.gtin);
        this.form.controls['price'].setValue(product.price);
        this.form.controls['stock'].setValue(product.stock);
        this.form.controls['category_id'].setValue(product.category_id);
        this.form.controls['description'].setValue(product.description);
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

  createProductImage(image: string){
    let productImage = new ProductImage();
    productImage.image = image;
    productImage.product_id = this.product.product_id//this.productToUpdate;
    this.productToUpdate = productImage.product_id
    console.log(productImage);
    this.productImageService.createProductImage(productImage).subscribe({
      next: (v) => {
        // console.log(this.productToUpdate)
        this.getProductImages(this.productToUpdate); // reload products
        this.swal.successMessage(v.body!.message); // show message
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }
  
  deleteProductImage(productImage: ProductImage){
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la eliminación de la imagen',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.productImageService.deleteProductImage(productImage.product_image_id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.getProductImages(productImage.product_id); // reload products
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }


  fileChangeHandler($event: any) {
    this.service.open($event, {
      aspectRatio: 1/1,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      this.createProductImage(data.base64!);
    });
  }

  addToCart() {
    this.cartService.addToCart({ gtin: this.product.gtin, quantity: this.quantity }).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe({
      next: (v) => {
        this.categories = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  //getCategory(category_id: number) {
  //this.categoryService.getCategory(category_id).subscribe({
    //next: (v) => {
      //this.category = v.body!;
      //console.log(this.category); // or any other logic you want to perform
    //},
    //error: (e) => {
      //console.log(e);
      //this.swal.errorMessage(e.error!.message); // show message
    //}
  //});
//}
  
  
  // getCategory(category_id: number) {
  //   //console.log("hola");
  //   this.categoryService.getCategory(category_id).subscribe({
  //     next: (v) => {
  //       this.category = v.body!;
  //       //console.log(this.productCat);
  //     },
  //     error: (e) => {
  //       console.log(e);
  //       this.swal.errorMessage(e.error!.message); // show message
  //     }
  //   });
  // }

  //getCategory(categoryId: number): string {
  //  const category = this.categories.find(cat => cat.category_id === categoryId);
  //  return category ? category.category : 'Unknown Category';
  //}

  // // Método para agregar producto al carrito
  // addToCart(gtin: string, quantity: number) {
  //   const cartItem: Cart = { 
  //     gtin, 
  //     quantity, 
  //     cart_id: 0, // Valor por defecto
  //     status: 0  // Valor por defecto
  //   };
  //   this.cartService.addToCart(cartItem).subscribe(
  //     response => {
  //       console.log('Producto agregado al carrito', response);
  //       // Manejar la respuesta de la API aquí
  //     },
  //     error => {
  //       console.error('Error al agregar producto al carrito', error);
  //       // Manejar el error aquí
  //     }
  //   );
  // }


  // addToCart(gtin: string, quantity: number) {
  //   const cartItem: Cart = { gtin, quantity };
  //   this.cartService.addToCart(cartItem).subscribe(
  //     response => {
  //       console.log('Producto agregado al carrito', response);
  //       // Manejar la respuesta de la API aquí
  //     },
  //     error => {
  //       console.error('Error al agregar producto al carrito', error);
  //       // Manejar el error aquí
  //     }
  //   );
  // }

  // addToCart() {
  //   const cart_id: Cart = {
  //     gtin: this.gtin,
  //     quantity: this.quantity
  //   };
    
  //   this.cartService.addToCart(cart_id).subscribe({
  //     next: (v) => {
  //       this.swal.successMessage('Producto agregado al carrito');
  //     },
  //     error: (e) => {
  //       console.error(e);
  //       this.swal.errorMessage(e.error!.message);
  //     }
  //   });
  // }
  
  // getCategories(){
  //   this.categoryService.getActiveCategories().subscribe({
  //     next: (v) => {
  //       this.categories = v.body!;
  //     },
  //     error: (e) => {
  //       console.log(e);
  //       this.swal.errorMessage(e.error!.message); // show message
  //     }
  //   });
  // }
  

  // showProductCategory(category_id: number){
  //   console.log("Refresco ",category_id);
  //   this.router.navigate(['product/category/' + category_id]);
  // }

  // modals 
  showProductModal(gtin: string){
    this.product = new Product();
    this.productService.getProduct(gtin).subscribe({
      next: (v) => {
        this.product = v.body!;
        $("#productModal").modal("show");
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

}
