import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggedUserService } from 'src/app/cache/loggedUser.component';
import { Address, User } from 'src/models/register-login/user';
import { ApiService } from 'src/shared/services/api.service';
import { SharedService } from 'src/shared/services/shared.service';
import { Utils } from 'src/shared/utils';
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
    protected sharedService: SharedService,
    protected utils: Utils,
    protected router: Router) {
    super(router, utils, sharedService);
  }
  user: User = new User();

  ngOnInit(): void {
    this.assignForm();
  }

  assignForm = async () => {
    this.form = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      password: [this.user.password, Validators.required],
      confirmPassword: [this.user.confirmPassword, Validators.required],
      cpf: [this.user.cpf, Validators.required],
      email: [this.user.email, Validators.required],
      address: this.formBuilder.group({
        street: [this.user.address.street],
        city: [this.user.address.city],
        state: [this.user.address.state],
        zipCode: [this.user.address.zipCode],
        number: [this.user.address.number],
        neighborhood: [this.user.address.neighborhood]
      })
    });
  };

  errors = () => {
    const invalidFields: string[] = [];
    if (!this.user.name)
      invalidFields.push('Nome')
    if (!this.user.cpf)
      invalidFields.push('CPF')
    if (!this.user.email)
      invalidFields.push('Email')
    if (!this.user.password)
      invalidFields.push('Senha')
    if (!this.user.confirmPassword)
      invalidFields.push('Confirmação de Senha')

    super.showValidationsError(invalidFields, 'Os campos devem ser informados');
  }

  onSubmit = async (user: User) => {
    if (await this.inValidateForm()) {
      this.errors();
      return;
    }

    try {
      this.isLoading = true;
      const result = await this.apiService.saveUser(user);
      this.loggedUser.setLoggedUser(result);
      this.sharedService.changeLoggedUser();
      this.router.navigate(['/home'])
    }
    catch (e) {
      this.utils.errorMessage(e);
    }
    finally {
      this.isLoading = false;
    }
  }
}