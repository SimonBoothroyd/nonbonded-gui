import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@core/store';
import { getRouterInfo } from '@core/store/routes/route.selectors';
import { selectOptimizationPlots } from '@core/store/optimization-plots/optimization-plots.selectors';
import {
  LoadObjectivePlot,
  LoadRMSEPlot
} from '@core/store/optimization-plots/optimization-plots.actions';
import { OptimizationPlots } from '@core/store/optimization-plots/optimization-plots.interfaces';

@Component({
  selector: 'app-optimization-results',
  templateUrl: './optimization-results.component.html',
  styleUrls: ['./optimization-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptimizationResultsComponent implements OnInit, OnDestroy {
  private resultsSubscription: Subscription;

  public plots$: Observable<OptimizationPlots>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.resultsSubscription = this.store
      .select(getRouterInfo)
      .subscribe((routerInfo) => {
        this.store.dispatch(
          new LoadObjectivePlot(
            routerInfo.params.projectId,
            routerInfo.params.studyId
          )
        );
        this.store.dispatch(
          new LoadRMSEPlot(
            routerInfo.params.projectId,
            routerInfo.params.studyId
          )
        );
      });

    this.plots$ = this.store.select(selectOptimizationPlots);
  }

  ngOnDestroy() {
    if (this.resultsSubscription) this.resultsSubscription.unsubscribe();
  }
}
