import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {
userSubs: Subscription;
usuario: string = '';
  constructor(
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

}
