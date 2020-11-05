import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';

import { DataSetsState } from '@core/store/datasets/datasets.interfaces';
import { selectDataSetsState } from '@core/store/datasets/datasets.selectors';
import { LoadDataSets } from '@core/store/datasets/datasets.actions';

@Component({
  selector: 'app-data-sets-list',
  templateUrl: './data-sets.component.html',
  styleUrls: ['./data-sets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSetsComponent implements OnInit {
  dataSets$: Observable<DataSetsState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadDataSets());
    this.dataSets$ = this.store.select(selectDataSetsState);
  }
}
