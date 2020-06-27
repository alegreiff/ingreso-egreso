import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { MultiDataSet, Label } from 'ng2-charts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit,OnDestroy {
ingresos : number = 0;
egresos : number = 0;
totalIngresos : number = 0;
totalEgresos : number = 0;

itemsSubs: Subscription

 // Doughnut
 public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
 public doughnutChartData: MultiDataSet = [[350, 450]];


  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.itemsSubs = this.store.select('ingresosEgresos')
    .subscribe( ({ items }) => this.generarEstadistica(items))
  }
  ngOnDestroy(){
    this.itemsSubs.unsubscribe();
  }

  generarEstadistica(items: IngresoEgreso[]){
    this.ingresos = 0;
    this.egresos = 0;
    this.totalEgresos = 0;
    this.totalIngresos = 0;


    for (const item of items) {
      if( item.tipo === 'ingreso' ){
        this.totalIngresos += item.monto;
        this.ingresos ++;
      }else{
        this.totalEgresos += item.monto;
        this.egresos ++;
      }

    }
    this.doughnutChartData = [ [this.totalIngresos,this.totalEgresos] ]

  }

}
