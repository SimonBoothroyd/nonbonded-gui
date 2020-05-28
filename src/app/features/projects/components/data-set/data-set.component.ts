import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DataSet } from '@core/models/datasets';

export class PerSubstanceDataSet {
  public readonly dataPoints: { [substance: string]: number[] };

  constructor(public dataSet: DataSet) {
    this.dataPoints = {};

    dataSet.entries.forEach((dataPoint, index) => {
      const smiles = dataPoint.components.map((component) => component.smiles);
      const substance = smiles.join(' + ');

      if (this.dataPoints[substance] === undefined) this.dataPoints[substance] = [];

      this.dataPoints[substance].push(index);
    });
  }
}

export interface SelectedDataEntry {
  substance: string;
  indices: number[];
}

@Component({
  selector: 'app-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSetComponent implements OnInit {
  _dataSet: DataSet = undefined;
  _perSubstanceDataSet: PerSubstanceDataSet = undefined;

  @Input()
  set value(value: DataSet) {
    this.selectedEntry = undefined;

    this._dataSet = value;
    this._perSubstanceDataSet = new PerSubstanceDataSet(value);
  }

  @Input() nColumns: number = 6;

  @Output() selectedEntry: SelectedDataEntry = undefined;

  constructor() {}

  ngOnInit(): void {}

  componentsToComposition(components) {
    return components.map((c) => c.mole_fraction).join(', ');
  }
}
