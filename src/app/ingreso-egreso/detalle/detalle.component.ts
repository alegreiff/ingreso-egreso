import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {
ingresosEgresos: IngresoEgreso[] = []
ingresosSubs: Subscription
  constructor(
    private store: Store<AppState>,
    private ingreService: IngresoEgresoService
  ) { }

  ngOnInit(){
    this.ingresosSubs = this.store.select('ingresosEgresos').subscribe(
      ({ items }) => {
        this.ingresosEgresos = items
      }
    )
  }
  ngOnDestroy(){
    this.ingresosSubs.unsubscribe();
  }

  borrar(uid: string){
    console.log(uid)
    this.ingreService.borrarIngresoEgreso( uid )
    .then( () => {
      Swal.fire('Borrado', 'Elemento borrado', 'success');
    } )
    .catch( err => Swal.fire('Error', err.message, 'error'))
  }

}
