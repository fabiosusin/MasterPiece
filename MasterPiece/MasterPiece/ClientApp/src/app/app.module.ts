import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {LoginScreenComponent} from './login-screen/login-screen.component'
import {RegisterScreenComponent} from './register-screen/register-screen.component'
import { ApiService } from 'src/shared/services/api.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginScreenComponent,
    RegisterScreenComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login-screen', component: LoginScreenComponent },
      { path: 'register-screen', component: RegisterScreenComponent},
    ])
    
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
