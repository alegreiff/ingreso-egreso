import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from "rxjs/operators";
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription: Subscription;
  private _user: Usuario;

  get user(){
    return { ...this._user }
  }

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
    ) { }



  crearUsuario(nombre: string, email: string, password: string){
    return this.auth.createUserWithEmailAndPassword( email, password )
    .then( ({ user }) => {
      const newUser = new Usuario( user.uid, nombre, user.email )
      return this.firestore.doc(`${user.uid}/usuario`).set( {...newUser} )

    } )

  }
  authUsuario(correo: string, password: string ){
    return this.auth.signInWithEmailAndPassword( correo, password )
  }

  logOut(){
    return this.auth.signOut();
  }

  initAuthListener(){
    this.auth.authState.subscribe( fuser=> {
      if(fuser){
        this.userSubscription = this.firestore.doc(`${ fuser.uid}/usuario`).valueChanges()
        .subscribe( (firestoreUser: any) => {
          const user = Usuario.fromFirebase( firestoreUser );
          this._user = user;
          this.store.dispatch( authActions.setUser({user}) )
        } )

      }else{
        //NO USER
        this._user = null
        this.userSubscription.unsubscribe()
        this.store.dispatch( authActions.UnSetUser() )
        this.store.dispatch( ingresoEgresoActions.unSetItems() )
      }
      //console.log(fuser?.uid )

    })
  }
  isAuth(){
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null )
    )
  }
}
