import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@core/store';
import { selectOptimizationPlots } from '@core/store/optimization-plots/optimization-plots.selectors';
import {
  LoadObjectivePlot,
  LoadRMSEPlot,
} from '@core/store/optimization-plots/optimization-plots.actions';
import {
  OptimizationPlots,
  RMSEPlotCollection,
} from '@core/store/optimization-plots/optimization-plots.interfaces';
import { getCurrentStudyState } from '@core/store/project/project.selectors';
import { StudyState } from '@core/store/project/project.interfaces';
import { Study } from '@core/models/projects';
import { Figure } from '@core/models/plotly';

@Component({
  selector: 'app-optimization-results',
  templateUrl: './optimization-results.component.html',
  styleUrls: ['./optimization-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptimizationResultsComponent implements OnInit, OnDestroy {
  private plotsSubscription: Subscription;

  public study$: Observable<StudyState>;
  public plots$: Observable<OptimizationPlots>;

  public selectedOptimization: string;
  public selectedTarget: string;
  public selectedDataType: string;

  constructor(private store: Store<State>, public ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.study$ = this.store.select(getCurrentStudyState);

    this.plotsSubscription = this.study$.subscribe((study) => {
      this.store.dispatch(new LoadObjectivePlot(study.project_id, study.id));
      this.store.dispatch(new LoadRMSEPlot(study.project_id, study.id));
    });

    this.plots$ = this.store.select(selectOptimizationPlots);
  }

  ngOnDestroy() {
    if (this.plotsSubscription) this.plotsSubscription.unsubscribe();
  }

  public getTargets(study: Study): string[] {
    if (this.selectedOptimization == undefined) return [];

    let optimization = study.optimizations.filter(
      (x) => x.id == this.selectedOptimization
    )[0];
    return optimization.targets.map((x) => x.id);
  }
  public getDataTypes(plotCollection: RMSEPlotCollection): string[] {
    if (this.selectedOptimization == undefined || this.selectedTarget == undefined)
      return [];
    return Object.keys(
      plotCollection.plots[this.selectedOptimization][this.selectedTarget]
    );
  }

  public getRMSEFigure(plotCollection: RMSEPlotCollection): Figure | undefined {
    if (
      this.selectedOptimization == undefined ||
      this.selectedTarget == undefined ||
      this.selectedDataType == undefined
    )
      return undefined;
    return plotCollection.plots[this.selectedOptimization][this.selectedTarget][
      this.selectedDataType
    ];
  }

  public getRMSEPlotHeight(plotCollection: RMSEPlotCollection): number {
    const figure = this.getRMSEFigure(plotCollection);

    if (figure == undefined || figure.subplots.length < 1) return 250;

    return Math.max(200, figure.subplots[0].traces[0].y.length * 40.0);
  }
}
