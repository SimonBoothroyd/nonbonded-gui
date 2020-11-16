// This component is heavily cannibalised from the angular-plotly version
// which can be found here:
//
//     https://github.com/plotly/angular-plotly.js/blob/master/src/app/shared/plot/plot.component.ts
//

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { Plotly } from 'angular-plotly.js/src/app/shared/plotly.interface';
import { PlotlyService } from 'angular-plotly.js';

import { Subscription } from 'rxjs';
import { Figure } from '@core/models/plotly';

interface LegendEntry {
  group: string;
  name: string;

  text: string;
  marker: string;
  color: string;
  line: boolean;
}

@Component({
  selector: 'app-plotly',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotlyComponent implements OnInit, OnChanges, OnDestroy {
  private _figure: Figure;
  private _plotData;

  private toggleLegendTimer: any;

  private plotsPerRow$: Subscription;
  private plotsPerRow: number;

  public readonly defaultClassName = 'js-plotly-plot';

  plotInstance: Plotly.PlotlyHTMLElement;

  @ViewChild('plot', { static: true }) plotElement: ElementRef;

  @Input() set figure(value: Figure) {
    if (this._figure == value) return;

    this._figure = value;
    this._plotData = !this._figure ? [] : this.generatePlotData();
  }

  @Input() subplotWidth: number;
  @Input() subplotHeight: number;

  @Input() config?: Partial<Plotly.Config>;

  @Input() breakpointQueries: string[];
  @Input() breakpointColumns: { [query: string]: number };

  constructor(
    public plotly: PlotlyService,
    private breakpointObserver: BreakpointObserver,
    private ref: ChangeDetectorRef
  ) {
    this.plotsPerRow = 1;

    this.subplotWidth = 260;
    this.subplotHeight = 260;

    this.breakpointQueries = [
      '(max-width: 999px)',
      '(min-width: 1000px) and (max-width: 1259px)',
      '(min-width: 1260px)',
    ];
    this.breakpointColumns = {
      '(max-width: 999px)': 1,
      '(min-width: 1000px) and (max-width: 1259px)': 2,
      '(min-width: 1260px)': 3,
    };
  }

  ngOnInit() {
    this.createPlot().then(
      () => this.ref.detectChanges(),
      (error) => console.error('There was an error creating the plot: ' + error)
    );

    this.plotsPerRow$ = this.breakpointObserver
      .observe(this.breakpointQueries)
      .subscribe((state: BreakpointState) => this.updatePlotsPerRow(state));
  }

  ngOnDestroy() {
    if (this.plotInstance) PlotlyService.remove(this.plotInstance);
    if (this.plotsPerRow$) this.plotsPerRow$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.plotInstance) return;
    this.updatePlot().then(() => {});
  }

  private createPlot(): Promise<void> {
    let plot$: Promise<Plotly.PlotlyHTMLElement> = this.plotly.newPlot(
      this.plotElement.nativeElement,
      [],
      undefined,
      this.config,
      undefined
    );

    return plot$
      .then(
        (plotInstance) => (this.plotInstance = plotInstance),
        (error) => console.error('Error while initializing plot:', error)
      )
      .then(() => this.updatePlot())
      .then(() => this.resizePlot());
  }

  private generatePlotData() {
    let traces = this._figure.subplots.map((subplot, i) =>
      subplot.traces.map((trace) => ({
        ...trace,
        xaxis: `x${i + 1}`,
        yaxis: `y${i + 1}`,
        visible: true,
      }))
    );

    return JSON.parse(JSON.stringify([].concat(...traces)));
  }

  private generateLayout() {
    const nSubplots = this._figure.subplots.length;

    const nCols = Math.max(1, Math.min(this.plotsPerRow, nSubplots));
    const nRows = Math.max(1, Math.ceil(nSubplots / nCols));

    // Define any plot sub-titles.
    const annotations = this._figure.subplots.map((subplot, i) =>
      !subplot.title
        ? undefined
        : {
            font: { size: 12 },
            showarrow: false,
            text: subplot.title,
            x: 0.5,
            xanchor: 'center',
            xref: i > 0 ? `x${i + 1} domain` : 'x domain',
            y: 1.01,
            yanchor: 'bottom',
            yref: i > 0 ? `y${i + 1} domain` : 'y domain',
          }
    );

    // Define any x-axis titles.
    const xAxes = this._figure.subplots.reduce(
      (object, subplot, i) => ({
        ...object,
        [`xaxis${i + 1}`]: {
          title: subplot.x_axis_label,
          showticklabels: subplot.show_x_ticks,
        },
      }),
      {}
    );

    // Define any y-axis titles.
    const yAxes = this._figure.subplots.reduce(
      (object, subplot, i) => ({
        ...object,
        [`yaxis${i + 1}`]: {
          title: i % nCols == 0 ? subplot.y_axis_label : undefined,
          showticklabels: subplot.show_y_ticks,
        },
      }),
      {}
    );

    // Match axes if requested.
    if (this._figure.shared_axes) {
      for (let k in xAxes) {
        if (k == 'xaxis1') {
          continue;
        }
        xAxes[k]['matches'] = 'x';
      }
      for (let k in yAxes) yAxes[k]['matches'] = 'x';
    }

    // Check whether to add padding at the bottom.
    let includeXAxisPadding = false;

    if (this._figure.subplots.some((subplot) => subplot.x_axis_label != undefined)) {
      includeXAxisPadding = true;
    }

    return {
      grid: { rows: nRows, columns: nCols, pattern: 'independent' },
      showlegend: false,
      width: this.subplotWidth * nCols,
      height: this.subplotHeight * nRows,
      annotations: annotations,
      margin: {
        t: 50,
        b: includeXAxisPadding ? 50 : 0,
      },
      hovermode: 'closest',
      ...xAxes,
      ...yAxes,
    };
  }

  private updatePlotsPerRow(state: BreakpointState) {
    let plotsPerRow = this.plotsPerRow;

    for (const breakpointQuery of this.breakpointQueries) {
      if (!state.breakpoints[breakpointQuery]) continue;

      plotsPerRow = this.breakpointColumns[breakpointQuery];
      break;
    }

    if (plotsPerRow == this.plotsPerRow) return;

    this.plotsPerRow = plotsPerRow;

    this.updatePlot().then(() => this.resizePlot());
  }

  public updatePlot(): Promise<void> {
    if (!this._figure || !this.plotly || !this.plotInstance) return Promise.resolve();

    let plotLayout = this.generateLayout();
    let plotConfig = { ...this.config };

    return this.plotly
      .update(this.plotInstance, this._plotData, plotLayout, plotConfig, undefined)
      .then(
        () => {},
        (error) => console.error('There was an error updating the plot: ' + error)
      );
  }

  public resizePlot() {
    if (!this.plotly || !this.plotInstance) return;

    if (this.plotInstance.offsetWidth <= 0 || this.plotInstance.offsetHeight <= 0)
      return;

    this.plotly.resize(this.plotInstance);
  }

  public generateLegend(): LegendEntry[] {
    if (!this._figure) return [];

    return this._plotData
      .filter((value) => value.showlegend)
      .map((value) => ({
        group: value.legendgroup,
        name: value.name,
        text: value.name,
        marker: !value.marker ? 'circle' : value.marker.symbol,
        color: !value.visible
          ? 'lightgray'
          : !value.marker
          ? 'rgb(0, 0, 0)'
          : value.marker.color,
        line: value.type == 'scatter',
      }));
  }

  private toggleTrace(legendGroup: string, traceName: string) {
    this._plotData
      .filter((trace) => trace.legendgroup == legendGroup && trace.name == traceName)
      .forEach((trace) => (trace.visible = !trace.visible));

    this.plotly.getPlotly().redraw(this.plotInstance);
    this.ref.detectChanges();
  }

  private toggleTraces(legendGroup: string, traceName: string) {
    const shouldEnable = this._plotData.some((trace) => !trace.visible);

    if (shouldEnable) {
      this._plotData.forEach((trace) => (trace.visible = true));
    } else {
      this._plotData.forEach(
        (trace) =>
          (trace.visible = trace.legendgroup == legendGroup && trace.name == traceName)
      );
    }

    this.plotly.getPlotly().redraw(this.plotInstance);
  }

  public onToggleTrace(legendGroup: string, traceName: string): void {
    if (this.toggleLegendTimer != undefined) {
      clearTimeout(this.toggleLegendTimer);
      this.toggleLegendTimer = undefined;

      this.toggleTraces(legendGroup, traceName);
      return;
    }

    this.toggleLegendTimer = setTimeout(() => {
      this.toggleLegendTimer = undefined;
      this.toggleTrace(legendGroup, traceName);
    }, 250);
  }
}
