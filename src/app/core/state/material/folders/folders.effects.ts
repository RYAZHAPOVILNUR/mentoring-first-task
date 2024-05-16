import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { addFolder, addFolderSuccess, deleteFolder, deleteFolderSuccess, emptyActionFolder, getFolder, getFolderSuccess, loadFolders, loadFoldersFail, loadFoldersSuccess, showAlertFolder } from './folders.actions';
import { FolderService } from '../../../services/materials/folders-api.service';

@Injectable()
export class FoldersEffects {
  constructor(
    private actions$: Actions,
    private _snackbar: MatSnackBar,
    private foldersService: FolderService
  ) { }

  loadFolders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFolders),
      switchMap(() =>
        this.foldersService.getAllFolders().pipe(
          map((data) => loadFoldersSuccess({ list: data })),
          catchError((err) => of(loadFoldersFail({ errormessage: err.message })))
        )
      )
    )
  );

  addFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addFolder),
      switchMap((action) =>
        this.foldersService.addFolder(action.inputdata).pipe(
          map((data) =>
            addFolderSuccess({ inputdata: data })
          ),
          catchError((err) => of(loadFoldersFail({ errormessage: err.message })))
        )
      )
    )
  );

  deleteFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteFolder),
      switchMap((action) =>
        this.foldersService.deleteFolder(action.id).pipe(
          map(() => deleteFolderSuccess({ id: action.id })),
          catchError((err) => of(loadFoldersFail({ errormessage: err.message })))
        )
      )
    )
  );

  showalert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showAlertFolder),
      exhaustMap((action) =>
        this.showSnackbarAlert(action.message, action.resptype).afterDismissed().pipe(
          map(() => emptyActionFolder())
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
