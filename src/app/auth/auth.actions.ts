import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';

export const setUser = createAction(
  '[Auth] setUser', props<{ user: Usuario }>()
  );

  export const UnSetUser = createAction('[Auth] UnSetUser');
