import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';

import { DataSetCollectionState } from '@core/store/datasets/datasets.interfaces';
import { getCurrentTestSets } from '@core/store/study-details/study-details.selectors';

@Component({
  selector: 'app-test-data-set-child',
  templateUrl: './test-data-set-child.component.html',
  styleUrls: ['./test-data-set-child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDataSetChildComponent implements OnInit {
  dataSets$: Observable<DataSetCollectionState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.dataSets$ = this.store.select(getCurrentTestSets);
  }
}
