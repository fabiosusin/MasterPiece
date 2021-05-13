import { Component, OnInit } from "@angular/core";
import { Filters } from "src/models/product/filters";
import { Product } from "src/models/product/product";
import { ApiService } from "src/shared/services/api.service";
import { BaseEdit } from "../base-page/base-edit.component";

@Component({
  selector: 'app-products-list-component',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})

export class ProductListComponent extends BaseEdit<Product> implements OnInit {
  itemArray: Array<Product>;
  

  constructor(
    protected apiService: ApiService,) {
    super();
  }
  ngOnInit(): void {
    const t: Filters = { }
    this.getProduct(t);
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
