import { HttpClient } from "@angular/common/http";
import { User } from "src/models/register-login/user";

export class ApiService {
    constructor(protected httpClient: HttpClient) { }

    saveUser = async (user: User): Promise<any> =>
        this.httpClient.request('GET', this.heroesUrl + '?' + 'name=term', { responseType: 'json' });

}