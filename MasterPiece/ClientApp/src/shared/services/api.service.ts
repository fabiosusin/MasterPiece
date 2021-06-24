import { Category } from './../../models/category/category]';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoggedUserModel } from "src/models/logged-user/logged-user";
import { Login } from "src/models/login-register/login";
import { Filters } from "src/models/product/filters";
import { Product } from "src/models/product/product";
import { User } from "src/models/register-login/user";
import { BaseApiService } from "../base/base-api.service";

@Injectable({ providedIn: 'root' })
export class ApiService extends BaseApiService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  saveUser = async (user: User): Promise<LoggedUserModel> =>
    await this.post('users/create', user, await this.getRequestHeaders());

  login = async (user: Login): Promise<LoggedUserModel> =>
    await this.post('users/login', user, await this.getRequestHeaders());

  saveProduct = async (product: Product): Promise<any> =>
    await this.post('productsregister/create', product, await this.getRequestHeaders());

    listProduct = async (filters: Filters): Promise<Product[]> =>
    await this.post('productsList/list', filters, await this.getRequestHeaders());

    listCategories = async (filters: Filters): Promise<Category[]> =>
    await this.post('productsList/categories', filters, await this.getRequestHeaders());

}