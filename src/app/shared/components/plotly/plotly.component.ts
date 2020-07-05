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

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

import { Plotly } from 'angular-plotly.js/src/app/shared/plotly.interface';
import { PlotlyService } from 'angular-plotly.js';

import { PlotData } from '@shared/components/plotly/plotly.interfaces';

@Component({
  selector: 'app-plotly',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotlyComponent implements OnInit, OnChanges, OnDestroy {
  public readonly defaultClassName = 'js-plotly-plot';

  public plotlyInstance: Plotly.PlotlyHTMLElement;

  private nColumns: number;

  @ViewChild('plot', { static: true }) plotEl: ElementRef;

  @Input() divId?: string;

  @Input() data?: PlotData;

  @Input() showLegend: boolean;

  @Input() showXTicks: boolean;
  @Input() showYTicks: boolean;

  @Input() subplotWidth: number;
  @Input() subplotHeight: number;

  @Input() legendOrientation: string;

  @Input() layout?: Partial<Plotly.Layout>;
  @Input() config?: Partial<Plotly.Config>;
  @Input() style?: { [key: string]: string };

  @Output() initialized = new EventEmitter<Plotly.Figure>();
  @Output() update = new EventEmitter<Plotly.Figure>();
  @Output() error = new EventEmitter<Error>();

  @Input() breakpointQueries: string[];
  @Input() breakpointColumns: { [query: string]: number };

  constructor(
    public plotly: PlotlyService,
    private breakpointObserver: BreakpointObserver,
    private ref: ChangeDetectorRef
  ) {
    this.nColumns = 1;

    this.legendOrientation = 'h';

    this.subplotWidth = 350;
    this.subplotHeight = 350;

    this.showLegend = true;

    this.showXTicks = true;
    this.showYTicks = true;

    this.breakpointQueries = [
      '(max-width: 499px)',
      '(min-width: 500px) and (max-width: 849px)',
      '(min-width: 850px) and (max-width: 1199px)',
      '(min-width: 1200px) and (max-width: 1549px)',
      '(min-width: 1550px) and (max-width: 1899px)',
      '(min-width: 1900px) and (max-width: 2249px)',
      '(min-width: 2250px)',
    ];
    this.breakpointColumns = {
      '(max-width: 499px)': 1,
      '(min-width: 500px) and (max-width: 849px)': 1,
      '(min-width: 850px) and (max-width: 1199px)': 2,
      '(min-width: 1200px) and (max-width: 1549px)': 3,
      '(min-width: 1550px) and (max-width: 1899px)': 4,
      '(min-width: 1900px) and (max-width: 2249px)': 5,
      '(min-width: 2250px)': 6,
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
      .newPlot(this.plotEl.nativeElement, [], this.layout, this.config, undefined)
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

    if (this.data.loading || this.data.error) return;

    this.updateSubplots();

    const layout = { ...this.layout };
    const config = { ...this.config };

    return this.plotly
      .update(this.plotlyInstance, this.data.traces, layout, config, undefined)
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

    if (this.plotly && this.plotlyInstance && this.data && this.data.success) {
      this.updatePlot()
        .then(() => this.resizePlot())
        .then(() => this.ref.detectChanges());
    }
  }

  updateSubplots() {
    if (
      !this.data ||
      this.data.loading ||
      this.data.error ||
      !this.plotly ||
      !this.plotlyInstance
    )
      return;

    const nSubplots = this.data.subplotTitles.length;

    const nColumns = Math.max(1, Math.min(this.nColumns, nSubplots));
    const nRows = Math.max(1, Math.ceil(nSubplots / nColumns));

    const legendHeight = this.showLegend && this.legendOrientation == 'h' ? 150 : 0;
    const legendWidth = this.showLegend && this.legendOrientation == 'v' ? 150 : 0;

    this.layout = {
      grid: { rows: nRows, columns: nColumns, pattern: 'independent' },
      width: this.subplotWidth * nColumns + legendWidth,
      height: this.subplotHeight * nRows + legendHeight,
      margin: {
        t: 50,
        b: 50,
      },
      title: false,
    };

    if (this.showLegend) this.layout.legend = { orientation: this.legendOrientation };
    else this.layout.showlegend = false;

    for (let trace of this.data.traces) {
      // let xIndex = trace.index % nColumns;
      // let yIndex = Math.floor(trace.index / nColumns);

      trace.xaxis = `x${trace.index + 1}`;
      trace.yaxis = `y${trace.index + 1}`;

      this.layout[`xaxis${trace.index + 1}`] = {
        showticklabels: this.showXTicks,
        title: this.data.subplotTitles[trace.index],
      };
      this.layout[`yaxis${trace.index + 1}`] = {
        showticklabels: this.showYTicks,
      };
      // if (xIndex == 0)
      //   this.layout[`yaxis${trace.index + 1}`] = {
      //     title: 'RMSE',
      //   };
    }
  }
}
