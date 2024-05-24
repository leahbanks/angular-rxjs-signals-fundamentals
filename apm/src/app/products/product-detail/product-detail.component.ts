import {Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { Product } from '../product';
import {ProductService} from "../product.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'pm-product-detail',
    templateUrl: './product-detail.component.html',
    standalone: true,
    imports: [NgIf, NgFor, CurrencyPipe]
})
export class ProductDetailComponent implements OnChanges, OnDestroy {
  // Just enough here for the template to compile
  @Input() productId: number = 0;
  errorMessage = '';
  sub!: Subscription;

  // Product to display
  product: Product | null = null;

  // Set the page title
  pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';



  private productService = inject(ProductService);

  ngOnChanges(changes: SimpleChanges) {
    const id = changes['productId'].currentValue;
    if (id) {
      this.sub = this.productService.getProductById(id).subscribe(
        product => this.product = product
      )
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  addToCart(product: Product) {
  }
}
