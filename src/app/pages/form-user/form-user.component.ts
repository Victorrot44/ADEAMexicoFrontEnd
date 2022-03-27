import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestapiService } from 'src/app/services/restapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
})
export class FormUserComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  action: number = 0;
  userid: number = 0;
  notfound: boolean = false;
  message: string = "";
  actionTitle: string = "Añadir Usuario";
  formUser:FormGroup | undefined;
  user: any;
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success width-md waves-effect mx-2',
      cancelButton: 'btn btn-danger width-md waves-effect mx-2'
    },
    buttonsStyling: false
  });

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private api: RestapiService
    ) { }


  ngOnInit(): void {
    let param = this.activeRouter.snapshot.params['id'];
    if (param) {
      this.action = 1
      this.actionTitle = "Actualizar Usuario";
      this.userid = param;
      this.getUser();
    }

    this.buildForm(this.action);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  buildForm(option: number){
    if (option > 0) {
      // updated
      this.formUser = this.formBuilder.group({
        nombre: ['', [Validators.required]],
        login: ['', [Validators.required]],
        apellido_paterno: [''],
        apellido_materno: [''],
        email: [''],
        password: [''],
        cliente: ['', [Validators.required, Validators.min(1)]],
        area: [''],
        fecha_vigencia: [''],
        status: ['A']
      });
    } else {
      // insert
      this.formUser = this.formBuilder.group({
        nombre: ['', [Validators.required]],
        apellido_paterno: [''],
        apellido_materno: [''],
        email: [''],
        password: ['', [Validators.required, Validators.minLength(4)]],
        cliente: ['', [Validators.required, Validators.min(1)]],
        area: [''],
        fecha_vigencia: ['']
      });
    }
  }

  save(e: Event){
    e.preventDefault();
    if (this.formUser?.valid) {
      let value = this.formUser.value;
      if(this.action == 0){
        this.insert(value);
      } else {
        this.update(value);
      }
    } else {
      this.formUser?.markAllAsTouched();
    }
  }

  insert(form: any){
    this.subscriptions.push(
      this.api.saveUser(form).subscribe(
        (res: any) => this.router.navigate(['/users']),
        (err: any) => this.swalWithBootstrapButtons.fire('Acción Cancelada', 'Ups!, Ha ocurrido un problema al intentar guardar el usaurio, intente más tarde.', 'error')
      )
    );
  }

  getUser(){
    this.subscriptions.push(
      this.api.findUserById(this.userid).subscribe(
        (res: any) => {
          let data = res;
          let { nombre, apellido_paterno, apellido_materno, email, login, cliente, fecha_vigencia, area, status} = data.user;
          this.formUser?.setValue({
            nombre,
            apellido_paterno,
            apellido_materno,
            email,
            password : "",
            login,
            cliente,
            status,
            area,
            fecha_vigencia : fecha_vigencia == null ? '' : new Date(fecha_vigencia).toISOString().slice(0, 10)
          });
        },
        (err: any) => {
          this.notfound = true;
          this.message = err.error.message_error;
        }
      )
    );
  }

  update(form:any){
    this.subscriptions.push(
      this.api.updateUser(this.userid, form).subscribe(
        (res: any) => this.router.navigate(['/users']),
        (err: any) => this.swalWithBootstrapButtons.fire('Acción Cancelada', 'Ups!, Ha ocurrido un problema al actualizar el usaurio, intente más tarde.', 'error')
      )
    );
  }

  get nombreField(){ return this.formUser?.get('nombre'); }
  get nombreValid(){ return this.nombreField?.touched && this.nombreField.valid; }
  get nombreInvalid(){ return this.nombreField?.touched && this.nombreField.invalid; }


  get usernameField(){ return this.formUser?.get('login'); }
  get usernameValid(){ return this.usernameField?.touched && this.usernameField.valid; }
  get usernameInvalid(){ return this.usernameField?.touched && this.usernameField.invalid; }

  get passwordField(){ return this.formUser?.get('password'); }
  get passwordValid(){ return this.passwordField?.touched && this.passwordField.valid; }
  get passwordInvalid(){ return this.passwordField?.touched && this.passwordField.invalid; }

  get clienteField(){ return this.formUser?.get('cliente'); }
  get clienteValid(){ return this.clienteField?.touched && this.clienteField.valid; }
  get clienteInvalid(){ return this.clienteField?.touched && this.clienteField.invalid; }

  get emailField(){ return this.formUser?.get('email'); }
  get emailValid(){ return this.emailField?.touched && this.emailField.valid; }

  get paternoField(){ return this.formUser?.get('apellido_paterno'); }
  get paternoValid(){ return this.paternoField?.touched && this.paternoField.valid; }

  get maternoField(){ return this.formUser?.get('apellido_materno'); }
  get maternoValid(){ return this.maternoField?.touched && this.maternoField.valid; }

  get areaField(){ return this.formUser?.get('area'); }
  get areaValid(){ return this.areaField?.touched && this.areaField.valid; }

  get vigenciaField(){ return this.formUser?.get('fecha_vigencia'); }
  get vigenciaValid(){ return this.vigenciaField?.touched && this.vigenciaField.valid; }


  get statusField(){ return this.formUser?.get('status'); }
  get statusValid(){ return this.statusField?.touched && this.statusField.valid; }
}
