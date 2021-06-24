import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseEdit } from 'src/app/pages/base/base-edit.component';
import { LoggedUserService } from 'src/app/cache/loggedUser.component';
import { Login } from 'src/models/login-register/login';
import { ApiService } from 'src/shared/services/api.service';
import { Router } from '@angular/router';
import { Utils } from 'src/shared/utils';
import { SharedService } from 'src/shared/services/shared.service';

@Component({
  selector: 'app-tela-login-component',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent extends BaseEdit<Login> implements OnInit {
  constructor(
    protected sharedService: SharedService,
    protected apiService: ApiService,
    protected formBuilder: FormBuilder,
    protected loggedUser: LoggedUserService,
    protected utils: Utils,
    protected router: Router) {
    super(router, utils, sharedService);
  }
  ngOnInit(): void {
    this.assignForm();
  }

  ngAfterViewInit() { }


  assignForm = async () => {
    const login = new Login();

    this.form = this.formBuilder.group({
      email: [login.email, [Validators.required]],
      password: [login.password, Validators.required],
    })
  };

  onSubmit = async (user: Login) => {
    if (this.form.invalid) {
      this.utils.warningMessage('Informe Usuário e Senha!')
      return;
    }

    try {
      this.isLoading = true;
      const result = await this.apiService.login(user);
      if (!result) {
        this.utils.errorMessage('Usuário ou Senha incorretos. Verifique os dados e tente novamente!')
        return;
      }
      this.loggedUser.setLoggedUser(result);
      this.sharedService.changeLoggedUser();
      this.router.navigate(['/home'])
    }
    catch (e) {
      this.utils.errorMessage(e);
      console.error(e)
    }
    finally {
      this.isLoading = false;
    }
  }


}
