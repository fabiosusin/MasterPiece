import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEdit } from 'src/app/pages/base/base-edit.component';
import { LoggedUserService } from 'src/app/cache/loggedUser.component';
import { Product, ProductType } from 'src/models/product-register/product';
import { ApiService } from 'src/shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/shared/utils';

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
    protected utils: Utils,
    protected router: Router) {
    super(router, utils);
  }

  product: Product = new Product();
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

  getFreeProduct = () => this.form.get('type').value == ProductType.Donation;
  assignForm = async () => {
    this.form = this.formBuilder.group({
      name: [this.product.name, [Validators.required]],
      description: [this.product.description, Validators.required],
      category: [this.product.category, Validators.required],
      type: [this.dataReceived ? this.dataReceived.type : ProductType.Donation, Validators.required],
      price: [this.product.price],
      balance: [this.product.balance],
    })
  };

  errors = () => {
    const invalidFields: string[] = [];
    if (!this.product.name)
      invalidFields.push('Nome')
    if (!this.product.description)
      invalidFields.push('Descrição')
    if (!this.product.category)
      invalidFields.push('Categoria')

    super.showValidationsError(invalidFields, 'Os campos devem ser informados');
  }

  onSubmit = async (product: Product) => {
    if (await this.inValidateForm()) {
      this.errors();
      return;
    }

    try {
      this.isLoading = true;
      await this.apiService.saveProduct(product);
      this.router.navigate(['/home']);
    }
    catch (e) {
      this.utils.errorMessage(e)
    }
    finally {
      this.isLoading = false;
    }

  }

}
