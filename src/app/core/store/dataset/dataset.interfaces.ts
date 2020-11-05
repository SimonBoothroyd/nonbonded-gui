import { DataSet } from '@core/models/datasets';
import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';

export const initialDataSet: DataSet = {
  id: '',
  description: '',
  authors: [],
  entries: [],
};

export interface DataSetState extends Loadable, DataSet {}

export const initialDataSetState: DataSetState = {
  ...createDefaultLoadable(),
  ...initialDataSet,
};
