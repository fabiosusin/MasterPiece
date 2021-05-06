import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ApiService } from 'src/shared/services/api.service';
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
    ReactiveFormsModule,

    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
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
