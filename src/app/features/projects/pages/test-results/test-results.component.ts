import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';
import {
  getTestScatterPlot,
  getTestSummaryPlot,
} from '@core/store/study-details/study-details.selectors';
import { PlotData } from '@shared/components/plotly/plotly.interfaces';
import { TestResultsState } from '@core/store/study-details/study-details.interfaces';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestResultsComponent implements OnInit, OnDestroy {
  public summaryStatistics$: Observable<PlotData>;
  public results$: Observable<TestResultsState>;

  public propertyType: string;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.summaryStatistics$ = this.store.select(getTestSummaryPlot, {
      statisticsType: 'RMSE',
    });
    this.results$ = this.store.select(getTestScatterPlot);
  }
  ngOnDestroy() {}
}
