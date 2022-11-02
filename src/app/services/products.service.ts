import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    URL:string = 'http://localhost:3000/products'

    constructor(private http: HttpClient) { }
    
    getProducts() {
       return this.http.get<IProducts[]>(this.URL)
    }

     getProduct(id: number) {
        return this.http.get<IProducts>(`${this.URL}/${id}`)
    }

}