import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { State } from '@core/store';
import { BenchmarkResultsState } from '@core/store/benchmark-results/benchmark-results.interfaces';
import { Observable, Subscription } from 'rxjs';
import { selectBenchmarkResultsState } from '@core/store/benchmark-results/benchmark-results.selectors';
import { getRouterInfo } from '@core/store/routes/route.selectors';
import { LoadBenchmarkResults } from '@core/store/benchmark-results/benchmark-results.actions';
import { Figure } from '@core/models/plotly';
import { FigureState } from '@shared/components/plotly/plotly.interfaces';

@Component({
  selector: 'app-test-results',
  templateUrl: './benchmark-results.component.html',
  styleUrls: ['./benchmark-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BenchmarkResultsComponent implements OnInit, OnDestroy {
  private resultsSubscription: Subscription;

  public results$: Observable<BenchmarkResultsState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.resultsSubscription = this.store
      .select(getRouterInfo)
      .subscribe((routerInfo) => {
        this.store.dispatch(
          new LoadBenchmarkResults(
            routerInfo.params.projectId,
            routerInfo.params.studyId
          )
        );
      });

    this.results$ = this.store.select(selectBenchmarkResultsState);
  }

  ngOnDestroy() {
    if (this.resultsSubscription) this.resultsSubscription.unsubscribe();
  }

  figureToState(figure: Figure): FigureState {
    return { ...figure, loading: !figure, success: figure != undefined, error: null };
  }
}
