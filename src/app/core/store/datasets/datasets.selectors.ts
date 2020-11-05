import { createFeatureSelector } from '@ngrx/store';
import { DataSetsState } from '@core/store/datasets/datasets.interfaces';

export const selectDataSetsState = createFeatureSelector<DataSetsState>('datasets');
