import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../../app/modules/app-common.module';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';


export const CURRENT_ROUTES: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(CURRENT_ROUTES),
  ]
})
export class HomeModule { }