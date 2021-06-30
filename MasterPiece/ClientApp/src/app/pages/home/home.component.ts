import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/models/product/product';
import { ApiService } from 'src/shared/services/api.service';
import { Utils } from 'src/shared/utils';
import { BaseEdit } from '../base/base-edit.component';
import { ProductCategoryOutput } from 'src/models/category/product-category-output';
import { CartComponent } from 'src/app/cache/cart.component';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent extends BaseEdit<Product> implements OnInit {
  constructor(
    protected cartService: CartComponent,
    protected userService: UserService,
    protected apiService: ApiService,
    protected router: Router,
    protected utils: Utils) {
    super(router, utils);
  }

  products = Array<Product>();
  categories = Array<ProductCategoryOutput>();

  async ngOnInit(): Promise<void> {
    await this.getProducts();
    await this.getCategories();
  }

  async getProducts() {
    this.products = await this.apiService.listProduct({
      limit: 8
    });
  }

  async getCategories() {
    this.categories = await this.apiService.listCategories()
  }

  addToCart(product: Product) {
    this.cartService.setShoppingCartNewItem(product);
    this.userService.changeShoppingCartAmount();
  }

}
