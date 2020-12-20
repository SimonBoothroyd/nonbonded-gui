import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { DATA_SETS_ENDPOINT } from '@core/endpoints';
import {
  DataSet as RawDataSet,
  DataSetEntry as RawDataSetEntry,
} from '@core/models/datasets';
import {
  DataSetActionsTypes,
  LoadDataSet,
  LoadDataSetError,
  LoadDataSetSuccess,
} from '@core/store/dataset/dataset.actions';
import { DataSet, DataSetEntry } from '@core/store/dataset/dataset.interfaces';

@Injectable()
export class DataSetEffects {
  @Effect()
  loadDataSet = this.actions$.pipe(
    ofType(DataSetActionsTypes.Load),
    switchMap((action: LoadDataSet) => {
      return this.http
        .get<RawDataSet>(`${DATA_SETS_ENDPOINT}/phys-prop/${action.dataSetId}`)
        .pipe(
          map(
            (response: RawDataSet) =>
              new LoadDataSetSuccess(DataSetEffects.processDataSet(response))
          ),
          catchError((error) => of(new LoadDataSetError(error)))
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}

  private static entryToDataType(entry: RawDataSetEntry): string {
    const propertyName = entry.property_type
      .replace(/([A-Z])/g, ' $1')
      .replace(' Of ', ' of ')
      .trim();

    if (
      propertyName == 'Solvation Free Energy' ||
      propertyName == 'Host Guest Binding Affinity'
    ) {
      return propertyName;
    }

    const substanceType = {
      1: 'Pure',
      2: 'Binary',
      3: 'Ternary',
    }[entry.components.length];

    return [substanceType, propertyName].join(' ');
  }

  private static processDataSet(dataSet: RawDataSet): DataSet {
    const entries: { [substanceKey: string]: DataSetEntry[] } = {};
    const dataTypes = new Set<string>();

    dataSet.entries.forEach((rawEntry) => {
      const substanceKey = rawEntry.components
        .map((component) => component.smiles)
        .sort()
        .join(' + ');

      const dataType = DataSetEffects.entryToDataType(rawEntry);
      dataTypes.add(dataType);

      const entry: DataSetEntry = {
        dataType: dataType,
        temperature: rawEntry.temperature,
        pressure: rawEntry.pressure,
        phase: rawEntry.phase,
        value: rawEntry.value,
        stdError: rawEntry.std_error,
        components: rawEntry.components.reduce(
          (components, rawComponent) => ({
            ...components,
            [rawComponent.smiles]: {
              moleFraction: rawComponent.mole_fraction,
              exactAmount: rawComponent.exact_amount,
              role: rawComponent.role,
            },
          }),
          {}
        ),
      };

      if (entries[substanceKey] === undefined) entries[substanceKey] = [];
      entries[substanceKey].push(entry);
    });

    return {
      id: dataSet.id,
      description: dataSet.description,
      authors: dataSet.authors,
      entries: entries,
      dataTypes: dataTypes,
    };
  }
}
