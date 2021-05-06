import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseEdit } from 'src/app/base/edit/base-edit.component';
import { LoggedUser } from 'src/app/cache/loggedUser.component';
import { Login } from 'src/models/login-register/login';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-tela-login-component',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent extends BaseEdit<Login> implements OnInit {
  constructor(
    protected apiService: ApiService,
    protected formBuilder: FormBuilder,
    protected loggedUser: LoggedUser) {
    super();
  }
  ngOnInit(): void {
    this.assignForm();
  }
 
  assignForm = async () => {
    const login = new Login();

        this.form = this.formBuilder.group({
        email: [login.email, [Validators.required]],
        password: [login.password, Validators.required],
      })
  };

  onSubmit = async (product: Login) => {
    if (this.form.invalid)
      return;
 }


}
