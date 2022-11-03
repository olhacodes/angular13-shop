import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  URL: string = 'http://localhost:3000/products'

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
}
