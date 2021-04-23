import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "src/models/register-login/user";
import { BaseApiService } from "../base/base-api.service";

@Injectable({ providedIn: 'root' })
export class ApiService extends BaseApiService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  saveUser = async (user: User): Promise<any> =>
    await this.post('users/create', user);

}