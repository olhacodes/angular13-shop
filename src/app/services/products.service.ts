import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  URL: string = 'http://localhost:3000/products';
  URL_BASKET: string = 'http://localhost:3000/basket';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<IProducts[]>(this.URL)
  }

  getProduct(id: number) {
    return this.http.get<IProducts>(`${this.URL}/${id}`)
  }

  postProduct(product: IProducts) {
    return this.http.post<IProducts>(this.URL, product)
  }

  deleteProductId(id: number) {
    return this.http.delete<IProducts>(`${this.URL}/${id}`)
  }

  editeProductId(product: IProducts) {
    return this.http.put<IProducts>(`${this.URL}/${product.id}`, product)
  }

  addProductToBasket(product: IProducts) {
    return this.http.post<IProducts>(this.URL_BASKET, product)
  }

  getProductsFromBasket() {
    return this.http.get<IProducts[]>(this.URL_BASKET)
  }

  updateProductsBasket(product: IProducts) {
    return this.http.put<IProducts>(`${this.URL_BASKET}/${product.id}`, product)
  }

  deleteProductFromBasket(id: number) {
    return this.http.delete<IProducts>(`${this.URL_BASKET}/${id}`)
  }
}
