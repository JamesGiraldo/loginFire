import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isValidemail = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.isValidemail)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private router: Router,
    private authSvc: AuthService) { }

  ngOnInit(): void {
  }

  getErrorMessage(field: string): string {
    let message;
    if (this.loginForm.get(field).errors.required) {
      message = 'Este campo es requerido';
    } else if (this.loginForm.get(field).hasError('pattern')) {
      message = 'Email no valido';
    } else if (this.loginForm.get(field).hasError('minlength')) {
      const minLength = this.loginForm.get(field).errors?.minlength.requiredLength;
      message = `Minimo de ${minLength} caracteres`;
    }
    return message;
  }

  isValidField(field: string): boolean {
    return (
      (this.loginForm.get(field).touched || this.loginForm.get(field).dirty)
      && !this.loginForm.get(field).valid
    );
  }

  async onLogin() {
    try {
      const { email, password } = this.loginForm.value;
      const user = await this.authSvc.login(email, password);
      // console.log('Form ->', this.loginForm.value);
      if (user) {
        // redirect to home
        this.router.navigate(['home']);
        Swal.fire({
          title: '¡Bienvenido!',
          text: 'Has iniciado sesión satisfatoriamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  irRegister(): void {
    this.router.navigate(['register']);
  }

}
