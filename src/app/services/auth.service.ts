import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public afAuth: AngularFireAuth ) {
    console.log('Servicio inicializado!');
  }

  async login( email: string, password: string){
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      Swal.fire({
        title: 'Problemas con la grabación.',
        text: 'Por favor, ingrese de nuevo.',
        icon: 'warning'
      });
      console.log(error);
    }
  }

  async register( email: string, password: string){
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      Swal.fire({
        title: 'Problemas con la grabación.',
        text: 'Por favor, ingrese nuevamente los datos.',
        icon: 'warning'
      });
      console.log(error);
    }
  }

  async logout(){
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
  getCurrentUser(){
    try {
      return this.afAuth.authState.pipe(first()).toPromise();
    } catch (error) {
      console.log(error);
    }
  }
}
