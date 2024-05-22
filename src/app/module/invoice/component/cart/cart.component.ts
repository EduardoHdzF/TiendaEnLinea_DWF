import { Component } from '@angular/core';
import { Cart } from '../../_model/cart';
import { CartService } from '../../_service/cart.service';
import { ProductDescriptionComponent } from '../../../product/component/product-description/product-description.component';
import { DtoCartDetails } from '../../_dto/dto-cart-details';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

}
