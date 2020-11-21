import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public isValidemail = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

  registerFrom = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.isValidemail)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor( private router: Router,
               private authSvc: AuthService  ) { }

  ngOnInit(): void {
  }

  getErrorMessage(field: string): string{
    let message;
    if (this.registerFrom.get(field).errors.required) {
      message = 'Este campo es requerido';
    }else if ( this.registerFrom.get(field).hasError('pattern')){
      message = 'Formato de email no valido';
    }else if (this.registerFrom.get(field).hasError('minlength')){
      const minLength = this.registerFrom.get(field).errors?.minlength.requiredLength;
      message = `Minimo de ${ minLength } caracteres`;
    }
    return message;
  }

  isValidField(field: string): boolean{
    return (
       (this.registerFrom.get(field).touched || this.registerFrom.get(field).dirty) 
        && !this.registerFrom.get(field).valid
    );
  }


  async onRegister(){
    try {
      const {email, password} = this.registerFrom.value;
      const user = await this.authSvc.register(email, password);
      // console.log('Form ->', this.registerFrom.value);
      if ( user ){
        // redirect to home
        this.router.navigate( ['home'] );
        Swal.fire({
          title: '¡Bienvenido!',
          text: 'Te has registrado corectamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  irLogin(): void {
    this.router.navigate( ['login'] );
  }

}
