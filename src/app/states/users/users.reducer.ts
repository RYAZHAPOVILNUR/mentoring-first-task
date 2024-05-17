import {User} from "../../users.interface";
import {Inject} from "@angular/core";
import {StorageService} from "../../services/localestorage.service";
import {createFeature, createReducer, on} from "@ngrx/store";
import {saveUserAction} from "./users.actions";

const initialState: User  = Inject(StorageService);

// const saveUserFeature = createFeature({
//   initialState,
//
// })


export const saveUserReducer = createReducer(
  initialState,
  on(saveUserAction, (state)=>{
    ...state,
  })
)
