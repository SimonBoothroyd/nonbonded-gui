import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';

import { BenchmarkResultState } from '@core/store/results/results.interfaces';
import { getBenchmarkResultState } from '@core/store/results/results.selectors';
import { PlotComponent } from 'angular-plotly.js';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestResultsComponent implements OnInit {
  @ViewChild(PlotComponent)
  statisticsPlotComponent: PlotComponent;

  public benchmarkResults$: Observable<BenchmarkResultState>;
  private resultsSubscription: Subscription;

  private statisticsTraces;

  public statisticsGraphData;
  public statisticsGraphLayout;

  public statisticsType: string;
  private nProperties: number;

  constructor(private store: Store<State>, private ref: ApplicationRef) {}

  ngOnInit(): void {
    this.benchmarkResults$ = this.store.select(getBenchmarkResultState);

    this.statisticsType = 'RMSE';

    this.statisticsTraces = [];

    this.statisticsGraphData = [];
    this.statisticsGraphLayout = {};

    this.resultsSubscription = this.benchmarkResults$.subscribe((state) => {
      if (!state.success) return;
      this.reshapeData(state);
    });
  }

  ngOnDestroy() {
    this.resultsSubscription.unsubscribe();
  }

  reshapeData(benchmarkResult) {
    if (!benchmarkResult.success) return;

    this.nProperties = benchmarkResult.property_results.length;

    let traces = [];
    let traceCounter = 0;

    const defaultColors = [
      'rgb(31, 119, 180)',
      'rgb(255, 127, 14)',
      'rgb(44, 160, 44)',
      'rgb(214, 39, 40)',
      'rgb(148, 103, 189)',
      'rgb(140, 86, 75)',
      'rgb(227, 119, 194)',
      'rgb(127, 127, 127)',
      'rgb(188, 189, 34)',
      'rgb(23, 190, 207)',
    ];

    for (let propertyResult of benchmarkResult.property_results) {
      let forceFieldCounter = 0;

      for (let forceFieldResult of propertyResult.force_field_results) {
        const value = forceFieldResult.statistic_data.values[this.statisticsType];
        // const confidenceIntervals = forceFieldResult.statistic_data.confidence_intervals[statisticType]

        const trace = {
          type: 'bar',
          x: [forceFieldResult.force_field_name],
          y: [value],
          legendgroup: forceFieldResult.force_field_name,
          marker: { color: defaultColors[forceFieldCounter % defaultColors.length] },
          name: forceFieldResult.force_field_name,
          xaxis: `x${traceCounter + 1}`,
          yaxis: `y${traceCounter + 1}`,
          showlegend: traceCounter == 0,
        };

        traces.push(trace);
        forceFieldCounter += 1;
      }

      traceCounter += 1;
    }

    this.statisticsTraces = traces;

    if (!this.statisticsPlotComponent.plotlyInstance) {
      return;
    }

    this.updatePlotly();
  }

  updatePlotly() {
    this.statisticsGraphData = this.statisticsTraces;
    this.statisticsGraphLayout = {
      grid: { rows: 1, columns: this.nProperties, pattern: 'independent' },
      height: 400,
    };

    this.ref.tick();
  }

  onStatisticTypeChanged() {}
  onStatisticGraphResized() {
    if (
      !this.statisticsPlotComponent ||
      !this.statisticsPlotComponent.plotly ||
      !this.statisticsPlotComponent.plotlyInstance
    ) {
      this.statisticsPlotComponent.plotly.resize(this.statisticsPlotComponent.plotlyInstance);
    }
  }
}
