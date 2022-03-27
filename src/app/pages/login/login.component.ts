import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription: Subscription | undefined;

  form: FormGroup | undefined;
  message: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: RestapiService
  ) {
    this.buildForm();
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
  }

  private buildForm (){
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  async auth(event: Event){
    event.preventDefault();
    if (this.form?.valid) {
      const value = this.form.value;
      this.subscription = this.api.authLogin(value).subscribe(
        (res: any) => {
          let data: any = res;

          localStorage.setItem("id", data.user.id);
          localStorage.setItem("nombre", data.user.nombre);
          localStorage.setItem("paterno", data.user.apellido_paterno);
          localStorage.setItem("materno", data.user.apellido_materno);

          this.router.navigate(['/dashboard']);
        },
        (err: any) => {
          let data: any = err;
          this.message = data.error.message_error;
        }
      )
    } else {
      this.form?.markAllAsTouched();
    }
  }

  get usernameField(){ return this.form?.get('username'); }
  get usernameIsValid(){ return this.usernameField?.touched && this.usernameField.valid; }
  get usernameIsInvalid(){ return this.usernameField?.touched && this.usernameField.invalid; }

  get passwordField(){ return this.form?.get('password'); }
  get passwordIsValid(){ return this.passwordField?.touched && this.passwordField.valid; }
  get passwordIsInvalid(){ return this.passwordField?.touched && this.passwordField.invalid; }
}
