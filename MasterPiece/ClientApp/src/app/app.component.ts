import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductType } from 'src/models/product/product';
import { SharedService } from 'src/shared/services/shared.service';
import { Utils } from 'src/shared/utils';
import { LoggedUserService } from './cache/loggedUser.component';
import { BasePage } from './pages/base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BasePage implements OnInit {
  constructor(
    protected sharedService: SharedService,
    protected loggedUser: LoggedUserService,
    protected router: Router,
    protected utils: Utils
  ) {
    super(router, utils, sharedService)
  }

  logged: boolean;

  ngOnInit(): void {
    this.isLoggedUser();
  }

  onClickLogout = () => {
    this.loggedUser.removeLoggedUser();
    this.router.navigate(['/login']);
    this.isLoggedUser();
  }

  isLoggedUser() {
    this.sharedService.getIsLoggedUser()
      .subscribe(item => {
        console.log('item => ', item)
        this.logged = item
      });
  }

  onClickGoToRegisterProduct(type: ProductType) {
    this.router.navigateByUrl('/products', { state: { type: type } });
  }
}
