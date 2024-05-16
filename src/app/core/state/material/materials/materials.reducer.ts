import { createReducer, on } from '@ngrx/store'
import { MaterialModel } from '../../../../shared/types/materials-types.type'
import { addMaterialSuccess, deleteMaterialSuccess, loadMaterialSuccess, loadMaterialsFail, loadMaterialsSuccess } from './materials.actions';

export const folderState: MaterialModel = {
  list: [],
  errormessage: '',
  material: {
    "title": '',
    "material_link": '',
    "folder_id": 0
  }
}

const materialReducer = createReducer(folderState,

  on(loadMaterialsSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errormessage: '',
    };
  }),
  on(loadMaterialSuccess, (state, action) => {
    return {
      ...state,
      errormessage: '',
      material: action.list
    };
  }),

  on(loadMaterialsFail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage
    }
  }),

  on(deleteMaterialSuccess, (state, action) => {
    let _newdate = state.list.filter(o => o.id != action.id)
    return {
      ...state,
      list: _newdate,
      errormessage: ''
    }
  }),

  on(addMaterialSuccess, (state, action) => {
    return {
      ...state,
      list: [...state.list, action.inputdata],
      errormessage: ''
    }
  })
)

export function MaterialReducer(state: any, action: any) {
  return materialReducer(state, action)
}