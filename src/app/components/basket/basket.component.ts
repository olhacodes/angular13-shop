import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  constructor(private ProductService: ProductsService) { }

  basket: IProducts[]
  basketSubscription: Subscription

  ngOnInit() {
    this.basketSubscription = this.ProductService.getProductsFromBasket().subscribe(products => {
      this.basket = products
    })
  }

  ngOnDestroy() {
    if(this.basketSubscription) this.basketSubscription.unsubscribe()
  }

  removeItemFromBasket(basket: IProducts) {

  }

  addItemToBasket(basket: IProducts) {

  }

}
