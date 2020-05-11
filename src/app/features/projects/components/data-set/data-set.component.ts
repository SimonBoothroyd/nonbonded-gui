import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DataSet, DataSetEntry } from '@core/models/datasets';

@Component({
  selector: 'app-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSetComponent implements OnInit {
  @Input() value: DataSet = null;

  @Input() nColumns: number = 6;

  @Output() selectedEntry: DataSetEntry = null;

  constructor() {}

  ngOnInit(): void {}
}
