import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MaterialModel } from '../../../../shared/types/materials-types.type';

const getMaterialState = createFeatureSelector<MaterialModel>('Materials')

export const getMaterialList = createSelector(getMaterialState, (state) => { return state.list })
export const getMaterial = createSelector(getMaterialState, (state) => { return state.material })

