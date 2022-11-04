import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ProductsService } from 'src/app/services/products.service';
import { DialogBoxComponent } from '../UI/dialog-box/dialog-box.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(private productsService: ProductsService, public dialog: MatDialog,) { }

  products: IProducts[];
  productsSubscription: Subscription;

  canEdit: boolean = true;
  canView: boolean = false;

  ngOnInit() {
    this.canEdit = true;

    this.productsSubscription = this.productsService.getProducts().subscribe(data => {
      this.products = data;
    })
  }

  openDialog(product?: IProducts): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        if (data && data.id) {
          this.editeProduct(data)
        } else {
          this.postProduct(data)
        }
      }

    })
  }

  postProduct(data: IProducts) {
    this.productsService.postProduct(data).subscribe(data => this.products.push(data))
  }

  deleteItem(id: number) {
    this.productsService.deleteProductId(id).subscribe(() => this.products.find(item => {
      if (id == item.id) {
        let index = this.products.findIndex(item => item.id == id)
        this.products.splice(index, 1);
      }
    }))
  }

  editeProduct(product: IProducts ) {
    this.productsService.editeProductId(product).subscribe(item => {
      this.products = this.products.map(product => {
        if (product.id === item.id) return item
        else return product
      })
    });
  }

  addToBasket(product: IProducts) {
    this.productsService.addProductToBasket(product).subscribe(product => {
      console.log(product)
    })
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }
}
