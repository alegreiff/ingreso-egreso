import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
suscribeUsuario: Subscription;
ingresosFBSubs: Subscription;
  constructor(
    private store: Store<AppState>,
    private ingreService: IngresoEgresoService,
  ) { }

  ngOnInit() {
    this.suscribeUsuario = this.store.select('user').pipe(
      filter( auth => auth.user != null )
    )
    .subscribe(
      ({ user }) => {
        console.log('USER EN DASHBOARD', user)
        this.ingresosFBSubs = this.ingreService.initIngresosEgresosListener(user.uid)
        .subscribe(ingresosEgresosFB => {
          this.store.dispatch( ingresoEgresoActions.setItems({ items: ingresosEgresosFB }) )
        })

      }
    )
  }
  ngOnDestroy(){
    this.suscribeUsuario.unsubscribe();
    this.ingresosFBSubs.unsubscribe();
  }



}
