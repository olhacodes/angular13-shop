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
  products: IProducts[];
  productsSubscription: Subscription;
  canEdit: boolean = true;
  canView: boolean = false;

  constructor(private productsService: ProductsService, public dialog: MatDialog,) { }

  ngOnInit() {
    this.productsSubscription = this.productsService.getProducts().subscribe(data => {
      this.products = data;
    })

    this.canEdit = true;
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }

  openDialog(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => { this.postData(data)})
  }

  postData(data: IProducts) {
    this.productsService.postProduct(data).subscribe(data => this.products.push(data))
  }
}
