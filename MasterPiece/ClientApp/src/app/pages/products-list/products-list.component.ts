import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FiltersProduct } from 'src/models/product/filters-product';
import { Router } from "@angular/router";
import { Product } from "src/models/product/product";
import { ApiService } from "src/shared/services/api.service";
import { Utils } from "src/shared/utils";
import { BaseEdit } from "../../pages/base/base-edit.component";
import { CartComponent } from "src/app/cache/cart.component";
import { UserService } from "src/shared/services/user.service";
import { ProductCategoryOutput } from "src/models/category/product-category-output";


@Component({
  selector: 'app-products-list-component',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})

export class ProductListComponent extends BaseEdit<Product> implements OnInit {
  products: Array<Product>;
  filters: FiltersProduct = new FiltersProduct();
  categories = Array<ProductCategoryOutput>();


  constructor(
    protected apiService: ApiService,
    protected cartService: CartComponent,
    protected userService: UserService,
    protected router: Router,
    protected utils: Utils) {
    super(router, utils);
  }
  ngOnInit(): void {
    this.filters.productName = this.dataReceived ? this.dataReceived.productName : '';
    this.filters.page = 1;
    this.filters.limit = 25;
    this.getProducts();
    this.getCategories();
  }

  async getCategories() {
    this.categories = await this.apiService.listCategories();
  }

  addToCart(product: Product) {
    this.cartService.setShoppingCartNewItem(product);
    this.userService.changeShoppingCartAmount();
  }

  getProducts = async () => {
    try {
      this.products = await this.apiService.listProduct(this.filters);
    }
    catch (e) {
      this.utils.errorMessage(e);
    }
  }

  decrementPage = () => {
    this.filters.page--;
    this.changePage();
  }
  incrementPage = () => {
    this.filters.page++;
    this.changePage();
  }

  changePage = () => {
    if (!this.filters.page || typeof this.filters.page != 'number')
      this.filters.page = 1.

    this.getProducts();
  }
}
