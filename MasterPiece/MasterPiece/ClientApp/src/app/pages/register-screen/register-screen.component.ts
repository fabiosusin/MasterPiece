import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoggedUser } from 'src/app/cache/loggedUser.component';
import { Address, User } from 'src/models/register-login/user';
import { ApiService } from 'src/shared/services/api.service';
import { BaseEdit } from '../../base/edit/base-edit.component';

@Component({
  selector: 'app-register-login-component',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.scss']
})
export class RegisterScreenComponent extends BaseEdit<User> implements OnInit {
  constructor(
    protected apiService: ApiService,
    protected formBuilder: FormBuilder,
    protected loggedUser: LoggedUser) {
    super();
  }
  ngOnInit(): void {
    this.assignForm();
  }

  validateForm = async () => this.form.valid;

  assignForm = async () => {
    const user = new User();
    user.address = new Address();

    this.form = this.formBuilder.group({
      name: [user.name, [Validators.required]],
      password: [user.password, Validators.required],
      confirmPassword: [user.confirmPassword, Validators.required],
      cpf: [user.cpf, Validators.required],
      email: [user.email, Validators.required],
      address: this.formBuilder.group({
        street: [user.address.street],
        city: [user.address.city],
        state: [user.address.state],
        zipCode: [user.address.zipCode],
        number: [user.address.number],
        neighborhood: [user.address.neighborhood]
      })
    });
  };

  onSubmit = async (user: User) => {
    if (!this.validateForm())
      return;

    try {
      const result = await this.apiService.saveUser(user);
      this.loggedUser.setLoggedUser(result);
    }
    catch (e) {
      console.log(e);
    }
  }

}