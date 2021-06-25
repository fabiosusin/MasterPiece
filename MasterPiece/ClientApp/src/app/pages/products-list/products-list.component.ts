import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FiltersProduct } from 'src/models/product/filters-product';
import { Router } from "@angular/router";
import { Product } from "src/models/product/product";
import { ApiService } from "src/shared/services/api.service";
import { Utils } from "src/shared/utils";
import { BaseEdit } from "../../pages/base/base-edit.component";
import { CartComponent } from "src/app/cache/cart.component";
import { UserService } from "src/shared/services/user.service";


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
    protected cartService: CartComponent,
    protected userService: UserService,
    protected router: Router,
    protected utils: Utils) {
    super(router, utils);
  }
  ngOnInit(): void {
    this.getProduct(new FiltersProduct());
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
    this.cartService.setShoppingCartNewItem(product);
    this.userService.changeShoppingCartAmount();
    window.alert('Seu produto foi adicionado ao carrinho')
    console.log(product);
  }



  remove(product: Product) {
    debugger;
    this.cartService.removeProduct(product);
    this.userService.changeShoppingCartAmount();
    window.alert('seu produto foi removido com sucesso!')
  }

  getProduct = async (filters: FiltersProduct) => {
    debugger;
    try {
      this.itemArray = await this.apiService.listProduct(filters);
    }
    catch (e) {
      this.utils.errorMessage(e);
    }
  }
}
