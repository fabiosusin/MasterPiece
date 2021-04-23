import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../../app/modules/app-common.module';
import { Routes, RouterModule } from '@angular/router';
import { ProductsRegisterComponent } from 'src/app/products-register/products-register.component';

export const CURRENT_ROUTES: Routes = [
  { path: 'products-register', component: ProductsRegisterComponent},  
  { path: '', redirectTo: 'products-register', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    ProductsRegisterComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(CURRENT_ROUTES),
  ]
})
export class ProductsRegisterModule { }