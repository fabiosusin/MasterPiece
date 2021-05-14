import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductType } from 'src/models/product-register/product';
import { Utils } from 'src/shared/utils';
import { LoggedUserService } from './cache/loggedUser.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    protected loggedUser: LoggedUserService,
    protected router: Router,
    protected utils: Utils
  ) { }

  isLogged: boolean;

  ngOnInit(): void {
    this.getIsLogged();
  }

  ngAfterViewInit() {
    console.log('oi')
    this.getIsLogged();
  }

  getIsLogged() {
    this.isLogged = this.loggedUser.getLoggedUser() != null;
  }

  onClickLogout = () => {
    this.loggedUser.removeLoggedUser();
    this.router.navigate(['/login']);
    this.getIsLogged();
  }

  onClickGoToRegisterProduct(type: ProductType) {
    this.router.navigateByUrl('/products', { state: { type: type } });
  }
}
