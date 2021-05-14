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
@NgModule({
  declarations: [
    AppComponent,
    MoneyDirective,
    CpfCnpjDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    Utils,
    ApiService
  ],
  exports: [
    MoneyDirective,
    CpfCnpjDirective
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
