import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseEdit } from 'src/app/pages/base/base-edit.component';
import { LoggedUserService } from 'src/app/cache/loggedUser.component';
import { Login } from 'src/models/login-register/login';
import { ApiService } from 'src/shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-login-component',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent extends BaseEdit<Login> implements OnInit {
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
    const login = new Login();

    this.form = this.formBuilder.group({
      email: [login.email, [Validators.required]],
      password: [login.password, Validators.required],
    })
  };

  onSubmit = async (user: Login) => {
    if (this.form.invalid)
      return;

    try {
      const result = await this.apiService.login(user);
      this.loggedUser.setLoggedUser(result);
      this.router.navigate(['/home'])
    }
    catch (e) {
      console.log(e)
    }
  }


}
