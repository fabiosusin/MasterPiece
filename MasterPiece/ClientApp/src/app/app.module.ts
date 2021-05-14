import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiService } from 'src/shared/services/api.service';
import { customCurrencyMaskConfig } from './modules-config';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './modules/app-routing.module';
import { MoneyDirective } from 'src/shared/directives/money.directive';
import { NgxCurrencyModule } from 'ngx-currency';
import { CartService } from 'src/shared/services/cart-service/cart.service';
@NgModule({
  declarations: [
    AppComponent,
    MoneyDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgxMaskModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    ApiService,
    CartService
  ],
  exports: [
    MoneyDirective
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
