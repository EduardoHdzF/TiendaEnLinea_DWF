import { Component } from '@angular/core';
import { CartService } from '../../../invoice/_service/cart.service';
import { DtoCartDetails } from '../../../invoice/_dto/dto-cart-details';
import { SwalMessages } from '../../../commons/_model/swal-messages';
import { InvoiceService } from '../../../invoice/_service/invoice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cart: DtoCartDetails[] = [];

  precio: number = 0;

  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private cartService: CartService,
    private invoiceServide: InvoiceService
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
    this.precio = precio;
    return precio;
  }

  buy(){
    this.swal.confirmMessage.fire({
      title: ('¿Está seguro(a) que desea efecturar la compra con un costo total de $'+ this.precio),
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.invoiceServide.generateInvoice().subscribe({
            next: (v) => {
              this.swal.successMessage("Su compra se ha efectuado con éxito, su pedido será enviado por estafota, gracias por confiar en nosotros.");              
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
}
