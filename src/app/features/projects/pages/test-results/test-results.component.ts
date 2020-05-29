import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PlotComponent } from 'angular-plotly.js';

import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';

import {
  TestResultsState,
  TestSummaryStatisticsState,
} from '@core/store/study-details/study-details.interfaces';
import {
  getTestResults,
  getTestSummaryStatistics,
} from '@core/store/study-details/study-details.selectors';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestResultsComponent implements OnInit, OnDestroy {
  @ViewChild(PlotComponent)
  summaryStatisticsComponent: PlotComponent;

  @ViewChild(PlotComponent)
  resultsComponent: PlotComponent;

  public summaryStatistics$: Observable<TestSummaryStatisticsState>;
  public summaryStatisticsSubscription: Subscription;
  private _summaryStatistics: TestSummaryStatisticsState;
  public summaryStatisticsGraphData;
  public summaryStatisticsGraphLayout;

  public results$: Observable<TestResultsState>;
  public resultsSubscription: Subscription;
  private _results: TestResultsState;
  public resultsPropertyType: string;
  public resultsGraphData;
  public resultsGraphLayout;

  private nColumns: number;

  constructor(
    private store: Store<State>,
    private breakpointObserver: BreakpointObserver,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeSummaryStatistics();
    this.initializeResults();

    this.nColumns = 1;

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((state: BreakpointState) => this.updateColumns(state));
  }
  ngOnDestroy() {
    if (this.summaryStatisticsSubscription)
      this.summaryStatisticsSubscription.unsubscribe();
    if (this.resultsSubscription) this.resultsSubscription.unsubscribe();
  }

  initializeSummaryStatistics() {
    this.summaryStatistics$ = this.store.select(getTestSummaryStatistics, {
      statisticsType: 'RMSE',
    });

    this._summaryStatistics = undefined;

    this.summaryStatisticsGraphData = [];
    this.summaryStatisticsGraphLayout = {};

    this.summaryStatisticsSubscription = this.summaryStatistics$.subscribe((state) => {
      if (!state.success) return;

      this._summaryStatistics = state;

      if (
        !this.summaryStatisticsComponent ||
        !this.summaryStatisticsComponent.plotlyInstance
      ) {
        return;
      }

      this.updateSummaryStatistics();
    });
  }
  initializeResults() {
    this.results$ = this.store.select(getTestResults);

    this._results = undefined;

    this.resultsGraphData = [];
    this.resultsGraphLayout = {};

    this.resultsSubscription = this.results$.subscribe((state) => {
      if (!state.success) return;

      this._results = state;
      this.resultsPropertyType = Object.keys(state.traces)[0];

      if (!this.resultsComponent || !this.resultsComponent.plotlyInstance) {
        return;
      }

      this.updateResults();
    });
  }

  updateColumns(state: BreakpointState) {
    if (state.breakpoints[Breakpoints.XSmall]) this.nColumns = 1;
    else if (state.breakpoints[Breakpoints.Small]) this.nColumns = 1;
    else if (state.breakpoints[Breakpoints.Medium]) this.nColumns = 2;
    else if (state.breakpoints[Breakpoints.Large]) this.nColumns = 3;
    else this.nColumns = 4;

    this.updateResults();
    this.updateSummaryStatistics();

    this.ref.detectChanges();
  }

  updateSummaryStatistics() {
    if (!this._summaryStatistics) return;

    const nProperties = this._summaryStatistics.propertyTitles.length;

    this.summaryStatisticsGraphData = this._summaryStatistics.traces;

    const nColumns = Math.min(this.nColumns + 2, nProperties);
    const nRows = Math.ceil(nProperties / nColumns);

    this.summaryStatisticsGraphLayout = {
      grid: { rows: nRows, columns: nColumns, pattern: 'independent' },
      width: 250 * nColumns,
      height: 320 * nRows,
      margin: {
        t: 50,
      },
      title: false,
      legend: { orientation: 'h', xanchor: 'center', y: -0.3, x: 0.5 },
    };

    for (let trace of this.summaryStatisticsGraphData) {
      let xIndex = trace.index % nColumns;
      let yIndex = Math.floor(trace.index / nColumns);

      trace.xaxis = `x${trace.index + 1}`;
      trace.yaxis = `y${trace.index + 1}`;

      this.summaryStatisticsGraphLayout[`xaxis${trace.index + 1}`] = {
        showticklabels: false,
        title: this._summaryStatistics.propertyTitles[trace.index],
      };
      if (xIndex == 0)
        this.summaryStatisticsGraphLayout[`yaxis${trace.index + 1}`] = {
          title: 'RMSE',
        };
    }
  }
  updateResults() {
    if (!this._results) return;

    const nBenchmarks = this._results.benchmarkNames.length;

    this.resultsGraphData = this._results.traces[this.resultsPropertyType];

    const nColumns = Math.min(this.nColumns, nBenchmarks);
    const nRows = Math.ceil(nBenchmarks / nColumns);

    this.resultsGraphLayout = {
      grid: { rows: nRows, columns: nColumns, pattern: 'independent' },
      width: 320 * nColumns + 300,
      height: 320 * nRows,
      margin: {
        t: 50,
      },
      title: false,
    };

    for (let trace of this.resultsGraphData) {
      let xIndex = trace.index % nColumns;
      let yIndex = Math.floor(trace.index / nColumns);

      trace.xaxis = `x${trace.index + 1}`;
      trace.yaxis = `y${trace.index + 1}`;

      this.resultsGraphLayout[`xaxis${trace.index + 1}`] = {
        title: this._results.benchmarkNames[trace.index],
      };
      if (xIndex == 0)
        this.resultsGraphLayout[`yaxis${trace.index + 1}`] = {
          title: 'Reference Value',
        };
    }
  }

  onStatisticTypeChanged() {
    if (
      !this.summaryStatisticsComponent ||
      !this.summaryStatisticsComponent.plotly ||
      !this.summaryStatisticsComponent.plotlyInstance
    ) {
      return;
    }

    this.updateSummaryStatistics();
  }
  onResultPropertyChanged() {
    if (
      !this.resultsComponent ||
      !this.resultsComponent.plotly ||
      !this.resultsComponent.plotlyInstance
    ) {
      return;
    }

    this.updateResults();
  }

  onStatisticGraphResized() {
    if (
      !this.summaryStatisticsComponent ||
      !this.summaryStatisticsComponent.plotly ||
      !this.summaryStatisticsComponent.plotlyInstance
    ) {
      return;
    }

    this.summaryStatisticsComponent.plotly.resize(
      this.summaryStatisticsComponent.plotlyInstance
    );
  }
}
