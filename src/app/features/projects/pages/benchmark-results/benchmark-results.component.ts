import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Store } from '@ngrx/store';

import { State } from '@core/store';
import { Observable, Subscription } from 'rxjs';
import { StudyState } from '@core/store/project/project.interfaces';
import { BenchmarkPlots } from '@core/store/benchmark-plots/benchmark-plots.interfaces';
import { getCurrentStudyState } from '@core/store/project/project.selectors';
import {
  LoadRMSEPlot,
  LoadScatterPlots,
} from '@core/store/benchmark-plots/benchmark-plots.actions';
import { selectBenchmarkPlots } from '@core/store/benchmark-plots/benchmark-plots.selectors';

@Component({
  selector: 'app-test-results',
  templateUrl: './benchmark-results.component.html',
  styleUrls: ['./benchmark-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BenchmarkResultsComponent implements OnInit, OnDestroy {
  private plotsSubscription: Subscription;

  public study$: Observable<StudyState>;
  public plots$: Observable<BenchmarkPlots>;

  constructor(private store: Store<State>, public ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.study$ = this.store.select(getCurrentStudyState);

    this.plotsSubscription = this.study$.subscribe((study) => {
      this.store.dispatch(new LoadScatterPlots(study.project_id, study.id));
      this.store.dispatch(new LoadRMSEPlot(study.project_id, study.id));
    });

    this.plots$ = this.store.select(selectBenchmarkPlots);
  }

  ngOnDestroy() {
    if (this.plotsSubscription) this.plotsSubscription.unsubscribe();
  }
}
