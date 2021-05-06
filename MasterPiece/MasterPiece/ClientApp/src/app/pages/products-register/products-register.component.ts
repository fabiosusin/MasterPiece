import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'oidc-client';
import { BaseEdit } from 'src/app/base/edit/base-edit.component';
import { LoggedUser } from 'src/app/cache/loggedUser.component';
import { Product} from 'src/models/product-register/product';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-products-register',
  templateUrl: './products-register.component.html',
  styleUrls: ['./products-register.component.scss']
})
export class ProductsRegisterComponent extends BaseEdit<Product> implements OnInit {
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
    const product = new Product();


    this.form = this.formBuilder.group({
        name: [product.name, [Validators.required]],
        description: [product.description, Validators.required],
        category: [product.category, Validators.required],
        totalValue: [product.totalValue],
        unityValue: [product.unityValue],
        balance: [product.balance],
      })
  };

  onSubmit = async (product: Product) => {
    if (this.form.invalid)
      return;
 }
}
