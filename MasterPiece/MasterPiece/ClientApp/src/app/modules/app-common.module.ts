import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginScreenComponent } from '../login-screen/login-screen.component';
import { RegisterScreenComponent } from '../register-screen/register-screen.component';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  exports: [
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AppCommonModule { }