import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: IProducts[];
  productsSubscription: Subscription;
  canEdit: true;
  canView: boolean = false;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsSubscription = this.productsService.getProducts().subscribe(data => {
      this.products = data;
    })

    this.canEdit = true;
  }

  ngOnDestroy() {
    if(this.productsSubscription) this.productsSubscription.unsubscribe();
  }

}
