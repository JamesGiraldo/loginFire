import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFrom = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor( private router: Router,
               private authSvc: AuthService  ) { }

  ngOnInit(): void {
  }

  async onRegister(){
    try {
      const {email, password} = this.registerFrom.value;
      const user = await this.authSvc.register(email, password);
      // console.log('Form ->', this.loginForm.value);
      if ( user ){
        // redirect to home
        this.router.navigate( ['home'] );
      }
    } catch (error) {
      console.log(error);
    }
  }

  irLogin(): void {
    this.router.navigate( ['login'] );
  }

}
