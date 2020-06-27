import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  usuario: string = ''
  userSubs: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.userSubs = this.store.select('user')
    .pipe(
      filter( ({user}) => user !=null )
    )

    .subscribe( ({user}) => {
      this.usuario = user.nombre
    } )
  }
  ngOnDestroy(){
    this.userSubs.unsubscribe();
  }
  logout(){
    this.authService.logOut()
    .then(() => {
      this.router.navigate(['/login'])
    })

  }

}
