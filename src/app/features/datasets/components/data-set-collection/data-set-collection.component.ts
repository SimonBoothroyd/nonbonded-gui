import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DataSetCollection, DataSetEntry } from '@core/models/datasets';
import { DataSetsState } from '@core/store/datasets/datasets.interfaces';
import { DataSetState } from '@core/store/dataset/dataset.interfaces';

export class PerPropertyDataSet {
  public readonly dataEntries: {
    [propertyType: string]: { [substance: string]: DataSetEntry[] };
  };

  constructor(public dataSetCollection: DataSetCollection) {
    this.dataEntries = {};

    for (const dataSet of dataSetCollection.data_sets) {
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

        if (this.dataEntries[propertyType] === undefined) {
          this.dataEntries[propertyType] = {};
        }
        if (this.dataEntries[propertyType][substance] === undefined) {
          this.dataEntries[propertyType][substance] = [];
        }

        this.dataEntries[propertyType][substance].push(entry);
      }
    }
  }
}

@Component({
  selector: 'app-data-set-collection',
  templateUrl: './data-set-collection.component.html',
  styleUrls: ['./data-set-collection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSetCollectionComponent implements OnInit {
  _dataSet: PerPropertyDataSet = undefined;

  @Input()
  set value(value: (DataSetState | DataSetsState)) {
    if (!value.success) return;

    if (!value.data_sets) {
      this._dataSet = new PerPropertyDataSet(
        {data_sets: [<DataSetState>value]}
      )
    }
    else {
      this._dataSet = new PerPropertyDataSet(value)
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
