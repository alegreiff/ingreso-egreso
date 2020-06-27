import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const unSetItems = createAction('[InresoEgreso] Unset Items');
export const setItems = createAction(
  '[InresoEgreso] Set Items',
  props<{ items: IngresoEgreso[] }>()
  );
