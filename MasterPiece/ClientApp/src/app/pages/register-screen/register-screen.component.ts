import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggedUserService } from 'src/app/cache/loggedUser.component';
import { Address, User } from 'src/models/register-login/user';
import { ApiService } from 'src/shared/services/api.service';
import { BaseEdit } from '../base/base-edit.component';

@Component({
  selector: 'app-register-login-component',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.scss']
})
export class RegisterScreenComponent extends BaseEdit<User> implements OnInit {
  constructor(
    protected apiService: ApiService,
    protected formBuilder: FormBuilder,
    protected loggedUser: LoggedUserService,
    protected router: Router) {
    super(router);
  }
  ngOnInit(): void {
    this.assignForm();
  }

  ngAfterViewInit() {
    const isLogged = this.loggedUser.getLoggedUser() != null;
    if (isLogged)
      this.router.navigate(['/home']);
  }

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
    if (await this.inValidateForm())
      return;

    try {
      if (!user.cpf)
        user.cpf = 0;
      if (!user.address.zipCode)
        user.address.zipCode = 0;

      +user.cpf;
      +user.address.zipCode;
      const result = await this.apiService.saveUser(user);
      this.loggedUser.setLoggedUser(result);
      this.router.navigate(['/home'])
    }
    catch (e) {
      console.log(e);
    }
  }
}