import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RestapiService } from 'src/app/services/restapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success width-md waves-effect mx-2',
      cancelButton: 'btn btn-danger width-md waves-effect mx-2'
    },
    buttonsStyling: false
  });

  filterByName: string = "";
  users: any[] = [];
  form: FormGroup | undefined;

  constructor(private api: RestapiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUsers();
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private buildForm (){
    this.form = this.formBuilder.group({
      start: [''],
      end: ['']
    },{
      validator: this.dateRangeValidator
    });
  }

  private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let invalid = false;
    const start = this.form && this.form.get("start")?.value;
    const end = this.form && this.form.get("end")?.value;

    if (start && end) {
      invalid = new Date(start).valueOf() > new Date(end).valueOf();
    }

    return invalid ? { invalidRange: { start, end } } : null;
  }

  filterDate(e: Event){
    e.preventDefault();
    if (this.form?.valid){
      let value = this.form?.value;
      console.log(value);
      this.subscriptions.push(
        this.api.filterByRangeDate(value).subscribe(
          (res: any) => {
            console.log(res);
            this.users = res;
          },
          (err: any) => console.log(err)
        )
      );
    } else {
      this.swalWithBootstrapButtons.fire('', 'El Rando de Fechas no es Valido', 'error')
    }
  }

  getUsers(){
    this.subscriptions.push( this.api.findAllUsers().subscribe((res: any) => this.users = res ));
  }

  deleteUser(id: number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success width-md waves-effect mx-2',
        cancelButton: 'btn btn-danger width-md waves-effect mx-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esta acción!.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscriptions.push(
          this.api.deleteUser(id).subscribe(
            (res: any) => {
              swalWithBootstrapButtons.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
              this.api.findAllUsers().subscribe( (res: any) => this.users = res );
            },
            (err: any) => {
              swalWithBootstrapButtons.fire('Acción Cancelada', 'Ups!, Ha ocurrido un problema, intente más tarde.', 'error');
            }
          )
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire('Cancelado', 'Acción Cancelada.', 'error');
      }
    });
  }

  filterByStatus(e: Event, status: string){
    e.preventDefault();
    if (status == '') {
      this.getUsers();
    } else {
      this.subscriptions.push( this.api.filterByStatus(status).subscribe((res: any) => this.users = res) );
    }
  }
}
