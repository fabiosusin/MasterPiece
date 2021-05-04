import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { MoneyDirective } from 'src/shared/directives/money.directive';
import { VMessageModule } from 'src/shared/directives/vmessage/vmessage.module';
import { VMessageComponent } from 'src/shared/directives/vmessage/vmessage.component';
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
    VMessageComponent,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ])
    
  ],
  exports: [
    MoneyDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
