import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoggedUserModel } from "src/models/logged-user/logged-user";
import { User } from "src/models/register-login/user";
import { BaseApiService } from "../base/base-api.service";

@Injectable({ providedIn: 'root' })
export class ApiService extends BaseApiService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  saveUser = async (user: User): Promise<LoggedUserModel> =>
    await this.post('users/create', user, await this.getRequestHeaders());

}