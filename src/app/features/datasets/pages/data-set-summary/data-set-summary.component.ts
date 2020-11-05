import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';
import { selectDataSetState } from '@core/store/dataset/dataset.selectors';
import { DataSetState } from '@core/store/dataset/dataset.interfaces';

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
}
