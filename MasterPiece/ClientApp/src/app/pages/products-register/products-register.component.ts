import { Category } from './../../../models/category/category]';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/shared/utils';
import { BaseEdit } from '../base/base-edit.component';
import { Product, ProductType } from 'src/models/product/product';
import { SharedService } from 'src/shared/services/shared.service';
import { Filters } from 'src/models/product/filters';

@Component({
  selector: 'app-products-register',
  templateUrl: './products-register.component.html',
  styleUrls: ['./products-register.component.scss']
})
export class ProductsRegisterComponent extends BaseEdit<Product> implements OnInit {
  constructor(
    protected apiService: ApiService,
    protected formBuilder: FormBuilder,
    protected activatedRoute: ActivatedRoute,
    protected utils: Utils,
    protected router: Router,
    protected sharedService: SharedService) {
    super(router, utils, sharedService);
  }

  categories: Array<Category>;
  product: Product = new Product();
  productTypes: {}[] = [
    { value: ProductType.Donation, label: 'Doação' },
    { value: ProductType.ForSale, label: 'Venda' }
  ];

  async ngOnInit(): Promise<void> {
    await this.getCategories();
    this.assignForm();
  }

  getImage = () => this.form.get('pictureBase64').value;
  getFreeProduct = () => this.form.get('type').value == ProductType.Donation;
  onClickRemoveImage = () => this.form.controls['pictureBase64'].setValue(null)
  assignForm = async () => {
    this.form = this.formBuilder.group({
      name: [this.product.name, [Validators.required]],
      description: [this.product.description, Validators.required],
      category: [this.product.category, Validators.required],
      type: [this.dataReceived ? this.dataReceived.type : ProductType.Donation, Validators.required],
      price: [this.product.price],
      balance: [this.product.balance],
      pictureBase64: [this.product.pictureBase64],
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

  async getCategories() {
    this.categories = await this.apiService.listCategories(new Filters())
  }


  async attachFile(event: any) {
    if (event.target.files.length <= 0) {
      this.utils.errorMessage('Ocorreu um erro ao importar a imagem!');
      return;
    }

    const file = <File>event.target.files[0];
    if (file.size / 1024 / 1024 > 5) { //5MB
      this.utils.warningMessage('O tamanho máximo para os arquivos é de 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        this.form.controls['pictureBase64'].setValue(reader.result.toString());
      } catch (e) {
        this.utils.errorMessage(e);
      }
    };
  }

}
