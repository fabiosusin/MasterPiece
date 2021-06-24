import { ApiService } from './../shared/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/models/category/category]';
import { Filters } from 'src/models/product/filters';
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
    protected apiService: ApiService,
    protected router: Router,
    protected utils: Utils
  ) {
    super(router, utils, sharedService)
  }

  openDropdown: boolean;
  logged: boolean;
  categories = Array<Category>();

  ngOnInit(): void {
    this.isLoggedUser();
    this.getCategories();
  }


  async getCategories() {
    this.categories = await this.apiService.listCategories(new Filters())
  }

  onClickLogout = () => {
    this.loggedUser.removeLoggedUser();
    this.router.navigate(['/login']);
    this.isLoggedUser();
  }

  isLoggedUser() {
    this.sharedService.getIsLoggedUser()
      .subscribe((item: boolean) => {
        this.logged = item
      });
  }

  onClickOutsideChangeDropdown = (state?: boolean) => {
    setTimeout(() => {
      this.openDropdown = state ? state : !this.openDropdown;
    }, 0);
  }

  onClickGoToRegisterProduct(type: ProductType) {
    this.router.navigateByUrl('/products', { state: { type: type } });
  }
}
