import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/shared/services/api.service';
import { AppRoutingModule } from './modules/app-routing.module';
import { MoneyDirective } from 'src/shared/directives/money.directive';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { Utils } from 'src/shared/utils';
import { CpfCnpjDirective } from 'src/shared/directives/cpf-cnpj.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxCurrencyModule } from 'ngx-currency';
import { CartService } from 'src/shared/services/cart-service/cart.service';
@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule // ToastrModule added
  ],
  providers: [
    Utils,
    ApiService
    ApiService,
    CartService
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
