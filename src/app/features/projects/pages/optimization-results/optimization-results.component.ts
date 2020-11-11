import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@core/store';
import { OptimizationResultsState } from '@core/store/optimization-results/optimization-results.interfaces';
import { getRouterInfo } from '@core/store/routes/route.selectors';
import { LoadOptimizationResults } from '@core/store/optimization-results/optimization-results.actions';
import { selectOptimizationResultsState } from '@core/store/optimization-results/optimization-results.selectors';

@Component({
  selector: 'app-optimization-results',
  templateUrl: './optimization-results.component.html',
  styleUrls: ['./optimization-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptimizationResultsComponent implements OnInit, OnDestroy {
  private resultsSubscription: Subscription;

  public results$: Observable<OptimizationResultsState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.resultsSubscription = this.store
      .select(getRouterInfo)
      .subscribe((routerInfo) => {
        this.store.dispatch(
          new LoadOptimizationResults(
            routerInfo.params.projectId,
            routerInfo.params.studyId
          )
        );
      });

    this.results$ = this.store.select(selectOptimizationResultsState);
  }

  ngOnDestroy() {
    if (this.resultsSubscription) this.resultsSubscription.unsubscribe();
  }
}
