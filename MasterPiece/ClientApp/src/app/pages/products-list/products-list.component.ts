import { FiltersProduct } from 'src/models/product/filters-product';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/models/product/product";
import { ApiService } from "src/shared/services/api.service";
import { Utils } from "src/shared/utils";
import { BaseEdit } from "../base/base-edit.component";

@Component({
  selector: 'app-products-list-component',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})

export class ProductListComponent extends BaseEdit<Product> implements OnInit {
  itemArray: Array<Product>;
  constructor(
    protected apiService: ApiService,
    protected router: Router,
    protected utils: Utils) {
    super(router, utils);
  }
  ngOnInit(): void { }


  getProduct = async (filters: FiltersProduct) => {
    if (this.form.invalid)
      return;

    try {
      const result = await this.apiService.listProduct(filters);
    }
    catch (e) {
      this.utils.errorMessage(e);
    }
  }
}
