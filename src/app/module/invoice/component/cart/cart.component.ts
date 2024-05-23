import { Component } from '@angular/core';
import { CartService } from '../../_service/cart.service';
import { Cart } from '../../_model/cart';
import { ProductDescriptionComponent } from '../../../product/component/product-description/product-description.component';
import { DtoCartDetails } from '../../_dto/dto-cart-details';
import { SwalMessages } from '../../../commons/_model/swal-messages';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cart: DtoCartDetails[] = [];

  cartItem: Cart[] = []; // Category list

  gtin: string = "";

  quantity: number = 1;

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

  // addToCart(gtin: string, quantity: number){
  //   const cartItem: Cart = { gtin, quantity };
  //   this.cartService.addToCart(cartItem).subscribe(

  //   )
  // }

}
