import { Category } from './../../../models/category/category]';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/models/product/product';
import { ApiService } from 'src/shared/services/api.service';
import { SharedService } from 'src/shared/services/shared.service';
import { Utils } from 'src/shared/utils';
import { BaseEdit } from '../base/base-edit.component';
import { Filters } from 'src/models/product/filters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent extends BaseEdit<Product> implements OnInit {
  constructor(
    protected apiService: ApiService,
    protected router: Router,
    protected utils: Utils,
    protected sharedService: SharedService) {
    super(router, utils, sharedService);
  }

  products = Array<Product>();
  categories = Array<Category>();

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
    this.categories = await this.apiService.listCategories({
      limit: 8
    })
  }

}
