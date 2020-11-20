import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor( private router: Router,
               private authSvc: AuthService  ) { }

  ngOnInit(): void {
  }

  async onLogin(){
    try {
      const {email, password} = this.loginForm.value;
      const user = await this.authSvc.login(email, password);
      // console.log('Form ->', this.loginForm.value);
      if ( user ){
        // redirect to home
        this.router.navigate( ['home'] );
      }
    } catch (error) {
      console.log(error);
    }
  }

  irRegister(): void{
     this.router.navigate( ['register'] );
  }

}
