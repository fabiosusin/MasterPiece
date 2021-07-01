import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { CartComponent } from "src/app/cache/cart.component";
import { FiltersProduct } from "src/models/product/filters-product";
import { Product } from "src/models/product/product";
import { ApiService } from "src/shared/services/api.service";
import { UserService } from "src/shared/services/user.service";
import { Utils } from "src/shared/utils";

@Component({
  selector: 'app-shopping-cart-component',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})


export class ShoppingCartComponent implements OnInit {
  constructor(
    protected cartService: CartComponent,
    protected userService: UserService,
    protected apiService: ApiService,
    protected router: Router,
    protected utils: Utils) {

  }

  products: Array<Product> = [];


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.products = this.cartService.getShoppingCartItems();
  }

  getTotal = () => this.products.reduce((a, b) => a + (b.price || 0), 0);

  removeProduct = (product: Product) => {
    this.cartService.removeProduct(product);
    this.getProducts();
  }

}