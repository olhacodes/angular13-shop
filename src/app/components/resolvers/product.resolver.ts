import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, catchError } from 'rxjs';

import { ProductsService } from 'src/app/services/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IProducts> {
  constructor(private ProductService: ProductsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProducts> {
    return this.ProductService.getProduct(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(['products']);
        return EMPTY;
      }
    )
  )}
}
