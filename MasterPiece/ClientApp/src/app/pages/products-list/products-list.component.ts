import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FiltersProduct } from 'src/models/product/filters-product';
import { Router } from "@angular/router";
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
  items = [];
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

  removeProduct(product) { 
    debugger;
    this.items.splice(product, 1)
    return;
  }

  removing(product: Product) { 
    debugger;
    this.removeProduct(product);
    console.log("Produto Removido com sucesso")
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
      const result = await this.apiService.listProduct(filters);
    }
    catch (e) {
      this.utils.errorMessage(e);
    }
  }
}
