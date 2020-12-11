import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { State } from '@core/store';
import { Observable } from 'rxjs';
import { DataSetState, SubstanceDataSet } from '@core/store/dataset/dataset.interfaces';
import { selectDataSetState } from '@core/store/dataset/dataset.selectors';
import { DataSet } from '@core/models/datasets';

@Component({
  selector: 'app-data-set-summary',
  templateUrl: './data-set-summary.component.html',
  styleUrls: ['./data-set-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSetSummaryComponent implements OnInit {
  dataSet$: Observable<DataSetState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.dataSet$ = this.store.select(selectDataSetState);
  }

  perPropertyDataSets(dataSet: DataSet): { [dataType: string]: SubstanceDataSet } {
    let substanceDataSets = {};

    for (const entry of dataSet.entries) {
      const smiles = entry.components.map((component) => component.smiles);
      const substance = smiles.sort().join(' + ');

      const substanceType = ''
        ? entry.components.length > 2
        : entry.components.length === 1
        ? 'Pure'
        : 'Binary';
      const propertyName = entry.property_type.replace('Of', ' of ');
      const propertyType = [substanceType, propertyName].join(' ');

      if (substanceDataSets[propertyType] === undefined) {
        substanceDataSets[propertyType] = {};
      }
      if (substanceDataSets[propertyType][substance] === undefined) {
        substanceDataSets[propertyType][substance] = [];
      }

      substanceDataSets[propertyType][substance].push(entry);
    }

    return substanceDataSets;
  }
}
