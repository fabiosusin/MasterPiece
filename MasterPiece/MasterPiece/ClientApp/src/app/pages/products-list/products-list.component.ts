import { Component, OnInit } from "@angular/core";
import { BaseEdit } from "src/app/base/edit/base-edit.component";
import { Product } from "src/models/product-register/product";
import { ApiService } from "src/shared/services/api.service";

@Component({
    selector: 'app-products-list-component',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
  })

export class ProductListComponent extends BaseEdit<Product> implements OnInit { 
    itemArray: Array<Product>;
    constructor(
        protected apiService: ApiService,) {
        super();
      }
      ngOnInit(): void {
        
      }
      getProduct = async (showProduct: Product) => {
        if (this.form.invalid)
          return;
    
        try {
          const result = await this.apiService.showProduct(showProduct);
          console.log('result', result);
        }
        catch (e) {
          console.log(e)
        }
      }
}