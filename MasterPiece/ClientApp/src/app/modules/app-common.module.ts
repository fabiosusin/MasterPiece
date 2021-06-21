import { QuantityPipe } from './../../shared/pipe/quantity.pipe';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material';
import { LoaderComponent } from 'src/shared/components/loader/loader.component';
import { MoneyDirective } from 'src/shared/directives/money.directive';
import { CpfCnpjDirective } from 'src/shared/directives/cpf-cnpj.directive';
import { ZipCodeDirective } from 'src/shared/directives/zip-code.directive';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [
    LoaderComponent,
    MoneyDirective,
    CpfCnpjDirective,
    ZipCodeDirective,
    QuantityPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    TooltipModule
  ],
  exports: [
    MoneyDirective,
    CpfCnpjDirective,
    ZipCodeDirective,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    LoaderComponent,
    TooltipModule,
    QuantityPipe
  ],
  providers: [QuantityPipe]
})
export class AppCommonModule { }