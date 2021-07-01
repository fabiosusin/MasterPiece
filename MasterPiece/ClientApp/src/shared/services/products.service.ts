import { Injectable } from "@angular/core";
import { CartComponent } from "src/app/cache/cart.component";
import { FiltersProduct } from "src/models/product/filters-product";
import { Product } from "src/models/product/product";
import { Utils } from "../utils";
import { ApiService } from './api.service';
import { UserService } from "./user.service";

@Injectable({ providedIn: 'root' })
export class ProducstService {
  constructor(
    protected userService: UserService,
    protected cartService: CartComponent,
    protected apiService: ApiService,
    protected utils: Utils) {
  }


  getProducts = async (filters?: FiltersProduct) => await this.apiService.listProduct(filters);

  getCategories = async () => await this.apiService.listCategories()

  addToCart(product: Product) {
    this.cartService.setShoppingCartNewItem(product);
    this.userService.changeShoppingCartAmount();
    this.utils.successMessage('Produto adicionado ao carrinho')
  }


}

