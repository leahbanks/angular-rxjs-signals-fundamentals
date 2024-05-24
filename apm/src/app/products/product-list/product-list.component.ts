import {Component, inject, OnDestroy, OnInit} from '@angular/core';

import {NgIf, NgFor, NgClass} from '@angular/common';
import {Product} from '../product';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {ProductService} from "../product.service";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent]
})
export class ProductListComponent implements OnInit, OnDestroy {
  // Just enough here for the template to compile
  pageTitle = 'Products';
  errorMessage = '';
  sub!: Subscription;

  private productService = inject(ProductService);

  // Products
  products: Product[] = [];

  // Selected product id to highlight the entry
  selectedProductId: number = 0;

  ngOnInit() {
    this.sub = this.productService.getProducts()
      .pipe(
        tap(() => console.log('in component pipeline'))
      ).subscribe(products => {
        this.products = products
        console.log(this.products)
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
