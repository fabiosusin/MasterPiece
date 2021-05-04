import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-login-component',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.scss']
})
export class RegisterScreenComponent {

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
      this.signupForm = this.formBuilder.group({
          email: ['',
              [
                  Validators.required,
                  Validators.email
              ]
          ],
          fullName: ['',
              [
                  Validators.required,
                  Validators.minLength(2),
                  Validators.maxLength(40)
              ]
          ],
          password: ['',
              [
                  Validators.required,
                  Validators.minLength(8),
                  Validators.maxLength(14)
              ]
          ],

          confirmPassword: ['',
          [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(14)
          ]
      ]
      });
  }
}

