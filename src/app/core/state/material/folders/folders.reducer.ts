import { createReducer, on } from '@ngrx/store'
import { FolderModel } from '../../../../shared/types/materials-types.type'
import { addFolderSuccess, deleteFolderSuccess, loadFoldersFail, loadFoldersSuccess } from './folders.actions'

export const folderState: FolderModel = {
  list: [],
  errormessage: ''
}

const folderReducer = createReducer(folderState,

  on(loadFoldersSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errormessage: '',
    };
  }),

  on(loadFoldersFail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage
    }
  }),

  on(deleteFolderSuccess, (state, action) => {
    let _newdate = state.list.filter(o => o.id != action.id)
    return {
      ...state,
      list: _newdate,
      errormessage: ''
    }
  }),

  on(addFolderSuccess, (state, action) => {
    return {
      ...state,
      list: [...state.list, action.inputdata],
      errormessage: ''
    }
  })
)

export function FolderReducer(state: any, action: any) {
  return folderReducer(state, action)
}