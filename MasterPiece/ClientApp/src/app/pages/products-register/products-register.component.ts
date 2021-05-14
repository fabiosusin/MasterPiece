import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEdit } from 'src/app/pages/base/base-edit.component';
import { LoggedUserService } from 'src/app/cache/loggedUser.component';
import { Product, ProductType } from 'src/models/product-register/product';
import { ApiService } from 'src/shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-register',
  templateUrl: './products-register.component.html',
  styleUrls: ['./products-register.component.scss']
})
export class ProductsRegisterComponent extends BaseEdit<Product> implements OnInit {
  constructor(
    protected apiService: ApiService,
    protected formBuilder: FormBuilder,
    protected loggedUser: LoggedUserService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router) {
    super(router);
  }

  getFreeProduct = () => this.form.get('type').value == ProductType.Donation;

  productTypes: {}[] = [
    { value: ProductType.Donation, label: 'Doação' },
    { value: ProductType.ForSale, label: 'Venda' }
  ];

  ngOnInit(): void {
    this.assignForm();
  }

  ngAfterViewInit() {
    const isLogged = this.loggedUser.getLoggedUser() != null;
    if (!isLogged)
      this.router.navigate(['/login']);
  }

  assignForm = async () => {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      type: [this.dataReceived ? this.dataReceived.type : ProductType.Donation, Validators.required],
      price: [''],
      balance: [''],
    })
  };

  onSubmit = async (product: Product) => {
    if (await this.inValidateForm())
      return;

    try {
      if (!product.price)
        product.price = 0;
      if (!product.balance)
        product.balance = 0;

      +product.price;
      +product.balance;
      await this.apiService.saveProduct(product);
      this.router.navigate(['/home']);
    }
    catch (e) {
      console.log(e);
    }
  }

}
