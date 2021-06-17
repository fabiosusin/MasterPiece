import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Filters } from "src/models/product/filters";
import { Product } from "src/models/product/product";
import { ApiService } from "src/shared/services/api.service";
import { Utils } from "src/shared/utils";
import { CartService } from "src/shared/services/cart-service/cart.service";
import { BaseEdit } from "../../pages/base/base-edit.component";


@Component({
  selector: 'app-products-list-component',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})

export class ProductListComponent extends BaseEdit<Product> implements OnInit {
  itemArray: Array<Product>;
  @Output() productRemoved = new EventEmitter();


  constructor(
    protected apiService: ApiService,
    private cartService: CartService,
    protected router: Router,
    protected utils: Utils) {
    super(router, utils);
  }
  ngOnInit(): void {
    const t: Filters = {}
    this.getProduct(t);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Seu produto foi adicionado ao carrinho')
    console.log(product);
  }


  remove(product: Product) {
    debugger;
    this.cartService.clearCart(product);
    window.alert('seu produto foi removido com sucesso!')
  }

  getProduct = async (filters: Filters) => {
    try {
      this.itemArray = await this.apiService.showProduct(filters);
      console.log(this.itemArray);
    }
    catch (e) {
      console.log(e)
    }
  }
}
