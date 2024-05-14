import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FolderModel } from '../../../../shared/types/materials-types.type';

const getFolderState = createFeatureSelector<FolderModel>('Folders')

export const getFolderList = createSelector(getFolderState, (state) => { return state.list })

