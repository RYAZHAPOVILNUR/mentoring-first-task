import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addUser, addUserSuccess, deleteUser, deleteUserSuccess, emptyAction, getUser, getUserSuccess, loadUsers, loadUserFail, loadUserSuccess, showAlert, updateUser, updateUserSuccess } from './users.actions';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ngrxLocalUsersService } from '../../services/ngrxlocalstorage.service';
import { of } from 'rxjs';

@Injectable()
export class CustomerEffects {
  constructor(
    private actions$: Actions,
    private _snackbar: MatSnackBar,
    private localService: ngrxLocalUsersService
  ) { }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.localService.getAllUsers().pipe(
          map((data) => loadUserSuccess({ list: data })),
          catchError((err) => of(loadUserFail({ errormessage: err.message })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      switchMap((action) =>
        this.localService.addUser(action.inputdata).pipe(
          map((data) => addUserSuccess({ inputdata: data })),
          catchError((err) => of(loadUserFail({ errormessage: err.message })))
        )
      )
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      switchMap((action) =>
        this.localService.getUserById(action.id).pipe(
          map((data) => getUserSuccess({ obj: data })),
          catchError((err) => of(loadUserFail({ errormessage: err.message })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      switchMap((action) =>
        this.localService.updateUser(action.inputdata).pipe(
          map((data) => updateUserSuccess({ inputdata: data })),
          catchError((err) => of(loadUserFail({ errormessage: err.message })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      switchMap((action) =>
        this.localService.deleteUser(action.id).pipe(
          map((data) => deleteUserSuccess({ id: data })),
          catchError((err) => of(loadUserFail({ errormessage: err.message })))
        )
      )
    )
  );

  showalert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showAlert),
      exhaustMap((action) =>
        this.showSnackbarAlert(action.message, action.resptype).afterDismissed().pipe(
          map(() => emptyAction())
        )
      )
    )
  );

  showSnackbarAlert(message: string, resptype: string = 'fail') {
    let _class = resptype === 'pass' ? 'text-green' : 'text-red';
    return this._snackbar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 5000,
      panelClass: [_class]
    });
  }

}
