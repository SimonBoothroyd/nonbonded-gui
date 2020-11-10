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
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { Plotly } from 'angular-plotly.js/src/app/shared/plotly.interface';
import { PlotlyService } from 'angular-plotly.js';

import { FigureState } from '@shared/components/plotly/plotly.interfaces';

@Component({
  selector: 'app-plotly',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotlyComponent implements OnInit, OnChanges, OnDestroy {
  private nColumns: number;

  public readonly defaultClassName = 'js-plotly-plot';

  public plotlyInstance: Plotly.PlotlyHTMLElement;

  @ViewChild('plot', { static: true }) plotEl: ElementRef;

  @Input() divId?: string;

  @Input() figure: FigureState;

  @Input() subplotWidth: number;
  @Input() subplotHeight: number;

  @Input() config?: Partial<Plotly.Config>;
  @Input() style?: { [key: string]: string };

  @Input() breakpointQueries: string[];
  @Input() breakpointColumns: { [query: string]: number };

  @Output() initialized = new EventEmitter<Plotly.Figure>();
  @Output() update = new EventEmitter<Plotly.Figure>();
  @Output() error = new EventEmitter<Error>();

  constructor(
    public plotly: PlotlyService,
    private breakpointObserver: BreakpointObserver,
    private ref: ChangeDetectorRef
  ) {
    this.nColumns = 1;

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
    this.createPlot().then(() => {
      const figure = this.createFigure();
      this.initialized.emit(figure);
    });

    this.breakpointObserver
      .observe(this.breakpointQueries)
      .subscribe((state: BreakpointState) => this.updateColumns(state));
  }

  ngOnDestroy() {
    PlotlyService.remove(this.plotlyInstance);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.plotlyInstance) this.updatePlot();
  }

  createPlot(): Promise<void> {
    return this.plotly
      .newPlot(this.plotEl.nativeElement, [], undefined, this.config, undefined)
      .then(
        (plotlyInstance) => {
          this.plotlyInstance = plotlyInstance;
        },
        (err) => {
          console.error('Error while initializing plot:', err);
          this.error.emit(err);
        }
      )
      .then(() => this.updatePlot())
      .then(() => this.resizePlot());
  }

  createFigure(): Plotly.Figure {
    const instance: any = this.plotlyInstance;

    return {
      data: instance.data,
      layout: instance.layout,
      frames: null,
    };
  }

  updatePlot() {
    if (!this.plotlyInstance) {
      const error = new Error(`Plotly component wasn't initialized`);
      this.error.emit(error);
      throw error;
    }

    if (!this.figure || !this.figure.success || !this.plotly || !this.plotlyInstance)
      return;

    let subData = this.figure.subplots.map((subplot, i) =>
      subplot.traces.map((trace) => ({
        ...trace,
        xaxis: `x${i + 1}`,
        yaxis: `y${i + 1}`,
      }))
    );

    let data = JSON.parse(JSON.stringify([].concat(...subData)));

    let layout = this.generateLayout();
    let config = { ...this.config };

    return this.plotly
      .update(this.plotlyInstance, data, layout, config, undefined)
      .then(
        () => {
          const figure = this.createFigure();
          this.update.emit(figure);
        },
        (err) => {
          console.error('Error while updating plot:', err);
          this.error.emit(err);
        }
      );
  }

  resizePlot() {
    if (!this.plotly || !this.plotlyInstance) return;

    if (this.plotlyInstance.offsetWidth <= 0 || this.plotlyInstance.offsetHeight <= 0)
      return;

    this.plotly.resize(this.plotlyInstance);
  }

  updateColumns(state: BreakpointState) {
    for (const breakpointQuery of this.breakpointQueries) {
      if (!state.breakpoints[breakpointQuery]) continue;

      this.nColumns = this.breakpointColumns[breakpointQuery];
      break;
    }

    if (this.plotly && this.plotlyInstance && this.figure && this.figure.success) {
      this.updatePlot()
        .then(() => this.resizePlot())
        .then(() => this.ref.detectChanges());
    }
  }

  private generateLayout() {
    const nSubplots = this.figure.subplots.length;

    const nCols = Math.max(1, Math.min(this.nColumns, nSubplots));
    const nRows = Math.max(1, Math.ceil(nSubplots / nCols));

    // Define any plot sub-titles.
    const annotations = this.figure.subplots.map((subplot, i) =>
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
    const xAxes = this.figure.subplots.reduce(
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
    const yAxes = this.figure.subplots.reduce(
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
    if (this.figure.shared_axes) {
      for (let k in xAxes) {
        if (k == 'xaxis1') {
          continue;
        }
        xAxes[k]['matches'] = 'x';
      }
      for (let k in yAxes) yAxes[k]['matches'] = 'x';
    }

    return {
      grid: { rows: nRows, columns: nCols, pattern: 'independent' },
      legend: this.figure.legend,
      width: this.subplotWidth * nCols,
      height: this.subplotHeight * nRows,
      annotations: annotations,
      margin: {
        t: 50,
        b: 50,
      },
      ...xAxes,
      ...yAxes,
    };
  }
}
