import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

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
      alert('Problemas al iniciar sesión');
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
      alert('Problemas al registrar');
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
