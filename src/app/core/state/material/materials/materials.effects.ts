import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { MaterialService } from '../../../services/materials-api-service.service';
import { addMaterial, addMaterialSuccess, deleteMaterial, deleteMaterialSuccess, emptyActionMaterials, loadMaterial, loadMaterialSuccess, loadMaterials, loadMaterialsFail, loadMaterialsSuccess, showAlertMaterials } from './materials.actions';


@Injectable()
export class MaterialsEffects {
  constructor(
    private actions$: Actions,
    private _snackbar: MatSnackBar,
    private materialService: MaterialService
  ) { }

  loadMaterials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMaterials),
      switchMap(() =>
        this.materialService.getAllMaterials().pipe(
          map((data) => loadMaterialsSuccess({ list: data })),
          catchError((err) => of(loadMaterialsFail({ errormessage: err.message })))
        )
      )
    )
  );

  loadMaterial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMaterial),
      switchMap((action) =>
        this.materialService.getMaterial(action.id).pipe(
          map((data) => loadMaterialSuccess({ list: data })),
          catchError((err) => of(loadMaterialsFail({ errormessage: err.message })))
        )
      )
    )
  );

  addMaterial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addMaterial),
      switchMap((action) =>
        this.materialService.addMaterial(action.inputdata).pipe(
          map((data) =>
            addMaterialSuccess({ inputdata: data })
          ),
          catchError((err) => of(loadMaterialsFail({ errormessage: err.message })))
        )
      )
    )
  );

  deleteMaterial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteMaterial),
      switchMap((action) =>
        this.materialService.deleteMaterial(action.id).pipe(
          map(() => deleteMaterialSuccess({ id: action.id })),
          catchError((err) => of(loadMaterialsFail({ errormessage: err.message })))
        )
      )
    )
  );

  showalert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showAlertMaterials),
      exhaustMap((action) =>
        this.showSnackbarAlert(action.message, action.resptype).afterDismissed().pipe(
          map(() => emptyActionMaterials())
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
