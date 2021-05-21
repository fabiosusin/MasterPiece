import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductType } from 'src/models/product/product';
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
  }

  ngAfterViewInit() {
    this.isLogged = this.loggedUser.getLoggedUser() != null;
  }

  onClickLogout = () => {
    this.loggedUser.removeLoggedUser();
    this.router.navigate(['/login']);
  }

  onClickGoToRegisterProduct(type: ProductType) {
    this.router.navigateByUrl('/products', { state: { type: type } });
  }
}
