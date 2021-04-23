import { Component } from '@angular/core';
import { User } from 'src/models/register-login/user';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-register-login-component',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.scss']
})
export class RegisterScreenComponent {
  constructor(protected apiService: ApiService) { }

  async createUser() {
    var user = new User();
    user.name = 'fabio';
    user.cpf = '027.865.520-36';
    user.password = 'teste123';
    user.email = 'fabiosusin@gmail.com';
    user.address = {
      city: 'caxias',
      neighborhood: 'ana rech',
      number: '20',
      state: 'rs',
      street: 'osvaldo artico'
    }
    debugger;
    const result = await this.apiService.saveUser(user)
    console.log(result);
  }

}
