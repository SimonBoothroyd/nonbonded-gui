import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';

import { getDataSetState } from '@core/store/datasets/datasets.selectors';
import { DataSetState } from '@core/store/datasets/datasets.interfaces';

@Component({
  selector: 'app-training-data-set-child',
  templateUrl: './training-data-set-child.component.html',
  styleUrls: ['./training-data-set-child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingDataSetChildComponent implements OnInit {
  dataSet$: Observable<DataSetState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.dataSet$ = this.store.select(getDataSetState, {});
  }
}
