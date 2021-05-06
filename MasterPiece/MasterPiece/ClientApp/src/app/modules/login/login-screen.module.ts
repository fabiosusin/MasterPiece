import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../../app/modules/app-common.module';
import { Routes, RouterModule } from '@angular/router';
import { LoginScreenComponent } from 'src/app/pages/login-screen/login-screen.component';


export const CURRENT_ROUTES: Routes = [
  { path: 'login-screen', component: LoginScreenComponent},  
  { path: '', redirectTo: 'login-screen', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    LoginScreenComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(CURRENT_ROUTES),
  ]
})
export class LoginScreenModule { }