import {
  ChangeDetectionStrategy,
  Component, OnDestroy,
  OnInit,
  ViewChild
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
export class TestResultsComponent implements OnInit, OnDestroy {
  @ViewChild(PlotComponent)
  statisticsPlotComponent: PlotComponent;

  public benchmarkResults$: Observable<BenchmarkResultState>;
  private resultsSubscription: Subscription;

  private statisticsTraces;

  public statisticsGraphData;
  public statisticsGraphLayout;

  public statisticsType: string;

  private nProperties: number;
  private propertyTitles: string[];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.benchmarkResults$ = this.store.select(getBenchmarkResultState);

    this.statisticsType = 'RMSE';

    this.statisticsTraces = {};

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

    let statisticTraces = {};

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

    this.propertyTitles = []

    for (let propertyResult of benchmarkResult.property_results) {

      let friendlyNComponents = propertyResult.n_components == 1 ? "Pure" : "Binary"
      let propertyName = `${friendlyNComponents} ${propertyResult.property_type}`

      this.propertyTitles.push(propertyName)
    }

    for (let statisticType of ["RMSE", "R^2"]) {

      let traces = []
      let traceCounter = 0;

      for (let propertyResult of benchmarkResult.property_results) {

        let friendlyNComponents = propertyResult.n_components == 1 ? "Pure" : "Binary"
        let propertyName = `${friendlyNComponents} ${propertyResult.property_type}`

        let forceFieldCounter = 0;

        for (let forceFieldResult of propertyResult.force_field_results) {

          const value = forceFieldResult.statistic_data.values[statisticType];
          const confidenceIntervals = forceFieldResult.statistic_data.confidence_intervals[statisticType]

          const trace = {
            type: 'bar',
            x: [forceFieldResult.force_field_name],
            y: [value],
            error_y: {
              type: 'data',
              symmetric: false,
              array: [Math.abs(value - confidenceIntervals[1])],
              arrayminus: [Math.abs(value - confidenceIntervals[0])]
            },
            legendgroup: forceFieldResult.force_field_name,
            marker: { color: defaultColors[forceFieldCounter % defaultColors.length] },
            name: forceFieldResult.force_field_name,
            xaxis: `x${traceCounter + 1}`,
            yaxis: `y${traceCounter + 1}`,
            showlegend: traceCounter == 0,
            hoverinfo: "none",
          };

          traces.push(trace);
          forceFieldCounter += 1;
        }

        traceCounter += 1;
      }

      statisticTraces[statisticType] = traces

    }

    this.statisticsTraces = statisticTraces;

    if (!this.statisticsPlotComponent || !this.statisticsPlotComponent.plotlyInstance) {
      return;
    }

    this.updatePlotly();
  }

  updatePlotly() {

    this.statisticsGraphData = this.statisticsTraces[this.statisticsType];
    this.statisticsGraphLayout = {
      grid: { rows: 1, columns: this.nProperties, pattern: 'independent' },
      height: 400,
      yaxis: { title: this.statisticsType },
      legend: {orientation: "h", xanchor: 'center', y: -0.1, x: 0.5},
      margin: {
        t: 50,
      },
      title: false,
    };

    let annotations = []

    for (let i = 0; i < this.nProperties; i++) {

      let axisName = i == 0 ? "xaxis" : `xaxis${i + 1}`
      this.statisticsGraphLayout[axisName] = { showticklabels: false }

      console.log((i + 0.5) / this.nProperties)

      annotations.push(
        {
          text: this.propertyTitles[i],
          font: {
            size: 14,
          },
          showarrow: false,
          x: 0.5,
          y: 1.15,
          xref: `x${i + 1}`,
          yref: 'paper',
        }
      )
    }

    this.statisticsGraphLayout.annotations = annotations
  }

  onStatisticTypeChanged() {

    if (
      !this.statisticsPlotComponent ||
      !this.statisticsPlotComponent.plotly ||
      !this.statisticsPlotComponent.plotlyInstance
    ) {
      return
    }

    this.updatePlotly()
  }
  onStatisticGraphResized() {
    if (
      !this.statisticsPlotComponent ||
      !this.statisticsPlotComponent.plotly ||
      !this.statisticsPlotComponent.plotlyInstance
    ) {
      return
    }

    this.statisticsPlotComponent.plotly.resize(this.statisticsPlotComponent.plotlyInstance);
  }
}
