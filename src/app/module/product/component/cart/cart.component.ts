import { Component } from '@angular/core';
import { CartService } from '../../../invoice/_service/cart.service';
import { Cart } from '../../../invoice/_model/cart';
import { ProductDescriptionComponent } from '../../../product/component/product-description/product-description.component';
import { DtoCartDetails } from '../../../invoice/_dto/dto-cart-details';
import { SwalMessages } from '../../../commons/_model/swal-messages';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cart: DtoCartDetails[] = [];

  // cartItem: Cart[] = []; // Cart list

  // gtin: string = "";

  // quantity: number = 1;

  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private cartService: CartService,
  ){}

  ngOnInit(){
    this.getCart();
  }

  getCart(){
    this.cartService.getCart().subscribe({
      next: (v) => {
        this.cart = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  deleteProduct(id: number){
    this.swal.confirmMessage.fire({
      title: '¿Está seguro(a) que desea eliminar el producto del carrito?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.cartService.removeFromCart(id).subscribe({
            next: (v) => {
              this.swal.successMessage(v.body!.message);
              this.getCart();
            },
            error: (e) => {
              console.log(e);
              this.swal.errorMessage(e.error!.message); // show message
            }
          });
      }
    });
  }
  
  clearCart(){
    this.swal.confirmMessage.fire({
      title: '¿Está seguro(a) que desea vaciar su carrito?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.cartService.clearCart().subscribe({
            next: (v) => {
              this.swal.successMessage(v.body!.message);
              this.getCart();
            },
            error: (e) => {
              console.log(e);
              this.swal.errorMessage(e.error!.message); // show message
            }
          });
      }
    });
  }

  total(){
    let precio = 0;
    for (let index = 0; index < this.cart.length; index++) {
      const element = this.cart[index];
      precio += element.product.price;
    }
    return precio;
  }
}
