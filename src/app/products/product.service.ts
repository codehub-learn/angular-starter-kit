import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Product[] {
    return [
      { id: 1, name: 'Zanax', inStock: false },
      { id: 2, name: 'Aspririne', inStock: true },
      { id: 3, name: 'Vitamine', inStock: true },
      { id: 4, name: 'Proteine', inStock: true }
    ];
  }
}
