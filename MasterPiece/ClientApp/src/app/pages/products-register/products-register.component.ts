import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'oidc-client';
import { BaseEdit } from 'src/app/pages/base-page/base-edit.component';
import { LoggedUser } from 'src/app/cache/loggedUser.component';
import { Product} from 'src/models/product/product';
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

      try {
        const result = await this.apiService.saveProduct(product);
        this.loggedUser.setLoggedUser(result);
      }
      catch (e) {
        console.log(e);
      }
 }
}
