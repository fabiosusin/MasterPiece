import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  //Login
  { path: 'login-screen', loadChildren: () => import('./login/login-screen.module').then(m => m.LoginScreenModule)},
  { path: 'register-screen', loadChildren: () => import('./register/register-screen.module').then(m => m.RegisterScreenModule)},
  { path: 'products-register', loadChildren: () => import('./products-register/products-register.module').then(m => m.ProductsRegisterModule)}
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }