import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material';
import { LoaderComponent } from 'src/shared/components/loader/loader.component';
import { MoneyDirective } from 'src/shared/directives/money.directive';
import { CpfCnpjDirective } from 'src/shared/directives/cpf-cnpj.directive';
import { ZipCodeDirective } from 'src/shared/directives/zip-code.directive';

@NgModule({
  declarations: [
    LoaderComponent,
    MoneyDirective,
    CpfCnpjDirective,
    ZipCodeDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MoneyDirective,
    CpfCnpjDirective,
    ZipCodeDirective,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    LoaderComponent
  ],
})
export class AppCommonModule { }