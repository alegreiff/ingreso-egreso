import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando: boolean = false;
  uiSuscription: Subscription

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
    ) { }

  ngOnInit(){
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

    this.uiSuscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading)

  }
  ngOnDestroy(){
    this.uiSuscription.unsubscribe()
  }
  crearUsuario(){
    if(this.registroForm.invalid) {return;}
    this.store.dispatch(ui.isLoading());

    /* Swal.fire({
      title: 'Espere por favor',

      onBeforeOpen: () => {
        Swal.showLoading()

      }
    }); */

    const { nombre, correo, password } = this.registroForm.value
    this.authService.crearUsuario(nombre, correo, password)
    .then( credenciales  => {
      console.log( credenciales )
      this.store.dispatch(ui.stopLoading());
      /* Swal.close(); */
      this.router.navigate(['/'])
    })
    .catch(err => {
      this.store.dispatch(ui.stopLoading());

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })
    })

  }

}
