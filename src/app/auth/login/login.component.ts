import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(){
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  autenticaUsuario(){
    if(this.loginForm.invalid){ return; }
    console.log(this.loginForm.value)
    const { correo, password } = this.loginForm.value;
    Swal.fire({
      title: 'Espere por favor',

      onBeforeOpen: () => {
        Swal.showLoading()

      }
    });

    this.authService.authUsuario(correo, password)
    .then( credenciales  => {
      console.log( credenciales )
      Swal.close();
      this.router.navigate(['/'])
    })
    .catch(err => {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })
    })

  }

}
