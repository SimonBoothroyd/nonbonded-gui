import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';
import { Author } from '@core/models/datasets';

export const propertyToAbbreviation = {
  Density: 'rho',
  DielectricConstant: 'eps',
  EnthalpyOfMixing: 'h-mix',
  EnthalpyOfVaporization: 'h-vap',
  ExcessMolarVolume: 'v-ex',
  HostGuestBindingAffinity: 'hg-bind',
  SolvationFreeEnergy: 'g-solv',
};
export const abbreviationToProperty = Object.keys(propertyToAbbreviation).reduce(
  (ret, key) => {
    ret[propertyToAbbreviation[key]] = key;
    return ret;
  },
  {}
);

export interface Component {
  moleFraction?: number;
  exactAmount?: number;

  role: string;
}

export interface DataSetEntry {
  dataType: string;

  temperature: number;
  pressure: number;

  phase: string;

  value: number;
  stdError: number;

  components: { [smiles: string]: Component };
}

export interface DataSet {
  id: string;
  description: string;
  authors: Author[];

  dataTypes: Set<string>;
  entries: { [substance: string]: DataSetEntry[] };
}

export const initialDataSet: DataSet = {
  id: '',
  description: '',
  authors: [],
  dataTypes: new Set<string>(),
  entries: {},
};

export interface DataSetState extends Loadable, DataSet {}

export const initialDataSetState: DataSetState = {
  ...createDefaultLoadable(),
  ...initialDataSet,
};
