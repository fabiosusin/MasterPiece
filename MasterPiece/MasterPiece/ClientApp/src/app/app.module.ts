import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginScreenComponent } from './pages/login-screen/login-screen.component'
import { RegisterScreenComponent } from './pages/register-screen/register-screen.component'
import { ApiService } from 'src/shared/services/api.service';
import { NgxCurrencyModule } from 'ngx-currency';
import { customCurrencyMaskConfig } from './modules-config';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './modules/app-routing.module';
import { MoneyDirective } from 'src/shared/directives/money.directive';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoneyDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,

    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login-screen', component: LoginScreenComponent },
      { path: 'register-screen', component: RegisterScreenComponent },
    ])

  ],
  providers: [
    ApiService
  ],
  exports: [
    MoneyDirective
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
