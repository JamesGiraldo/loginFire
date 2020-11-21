import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // isLogged = false;
  // user: any;
  // debolver un objeto que es user
  user$: Observable<any> = this.authSvc.afAuth.user;

  constructor( private router: Router,
               private authSvc: AuthService  ) { }

  async ngOnInit(){    
    // this.user = await this.authSvc.getCurrentUser();
    // if (this.user){
    //   this.isLogged = true;
    // }else{
    //   this.isLogged = false;
    //   console.log('Usuario no encontrado');
    // }
  }

  async onLogout(){
    try {
      await this.authSvc.logout();
      this.router.navigate( ['login'] );
      Swal.fire({
        title: '¡Adiós!',
        text: 'Te esperamos pronto.',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      console.log(error);
    }
  }

}
