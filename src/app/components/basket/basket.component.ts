import { isNgTemplate } from '@angular/compiler';
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

  removeItemFromBasket(item: IProducts) {
    if (item.quantity === 1) {
      this.ProductService.deleteProductFromBasket(item.id).subscribe(item => {
        let index = this.basket.findIndex(product => product.id === item.id)
        this.basket.splice(index, 1)
      })
    } else {
      item.quantity -= 1
      this.ProductService.updateProductsBasket(item).subscribe()
    }
  }

  addItemToBasket(item: IProducts) {
    item.quantity += 1
    this.ProductService.updateProductsBasket(item).subscribe()
  }

}
