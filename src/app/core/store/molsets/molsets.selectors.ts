import { createFeatureSelector } from '@ngrx/store';
import { MoleculeSetsState } from '@core/store/molsets/molsets.interfaces';

export const selectMoleculeSetsState = createFeatureSelector<MoleculeSetsState>(
  'molsets'
);
