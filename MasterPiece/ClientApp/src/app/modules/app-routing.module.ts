import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  //Login
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./login/login-screen.module').then(m => m.LoginScreenModule) },
  { path: 'register', loadChildren: () => import('./register/register-screen.module').then(m => m.RegisterScreenModule) },
  { path: 'products', loadChildren: () => import('./products-register/products-register.module').then(m => m.ProductsRegisterModule) }
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }