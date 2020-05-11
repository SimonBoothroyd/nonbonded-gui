import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from '@core/store';

import { DataSetState } from '@core/store/datasets/datasets.interfaces';
import { getDataSetState } from '@core/store/datasets/datasets.selectors';

@Component({
  selector: 'app-test-data-set',
  templateUrl: './test-data-set.component.html',
  styleUrls: ['./test-data-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDataSetComponent implements OnInit {
  dataSet$: Observable<DataSetState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.dataSet$ = this.store.select(getDataSetState, {});
  }
}
