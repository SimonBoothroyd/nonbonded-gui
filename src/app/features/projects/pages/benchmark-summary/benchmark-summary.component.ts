import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';

import { BenchmarkState } from '@core/store/project/project.interfaces';
import { getCurrentBenchmarkState } from '@core/store/project/project.selectors';
// import { DataSetCollectionState } from '@core/store/data-sets/data-sets.interfaces';
// import { getCurrentTestSets } from '@core/store/study-details/study-details.selectors';

@Component({
  selector: 'app-benchmark-summary',
  templateUrl: './benchmark-summary.component.html',
  styleUrls: ['./benchmark-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BenchmarkSummaryComponent implements OnInit {
  benchmark$: Observable<BenchmarkState>;

  // testSet$: Observable<DataSetCollectionState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.benchmark$ = this.store.select(getCurrentBenchmarkState);
    // this.testSet$ = this.store.select(getCurrentTestSets);
  }
}
