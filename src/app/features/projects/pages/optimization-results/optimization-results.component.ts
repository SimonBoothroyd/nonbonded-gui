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

import { OptimizationState } from '@core/store/project/project.interfaces';
import { getCurrentOptimizationState } from '@core/store/project/project.selectors';
import { PlotData } from '@shared/components/plotly/plotly.interfaces';
import { TrainingResultsState } from '@core/store/study-details/study-details.interfaces';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  getIterationRMSE,
  getObjectiveFunction,
} from '@core/store/study-details/study-details.selectors';

@Component({
  selector: 'app-optimization-results',
  templateUrl: './optimization-results.component.html',
  styleUrls: ['./optimization-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptimizationResultsComponent implements OnInit, OnDestroy {
  public optimization$: Observable<OptimizationState>;

  public objectiveFunction$: Observable<PlotData>;

  public iterationRMSE$: Observable<TrainingResultsState>;
  private iterationRMSESubscription: Subscription;

  public propertyType: string;

  public layoutType: string;

  constructor(
    private store: Store<State>,
    private breakpointObserver: BreakpointObserver,
    private ref: ChangeDetectorRef
  ) {
    this.layoutType = 'row';
  }

  ngOnInit(): void {
    this.optimization$ = this.store.select(getCurrentOptimizationState);
    this.objectiveFunction$ = this.store.select(getObjectiveFunction);
    this.iterationRMSE$ = this.store.select(getIterationRMSE);

    this.iterationRMSESubscription = this.iterationRMSE$.subscribe(
      (state: TrainingResultsState) => {
        if (!state) return;

        const propertyNames = Object.keys(state.plotData);

        if (propertyNames.length == 0) {
          this.propertyType = undefined;
          return;
        }

        if (propertyNames.includes(this.propertyType)) return;
        this.propertyType = propertyNames[0];
      }
    );

    this.breakpointObserver
      .observe(['(max-width: 1420px)'])
      .subscribe((state: BreakpointState) => this.updateLayout(state));
  }

  updateLayout(state: BreakpointState) {
    this.layoutType = state.breakpoints['(max-width: 1420px)'] ? 'column' : 'row';
    this.ref.detectChanges();
  }

  ngOnDestroy() {
    if (this.iterationRMSESubscription) this.iterationRMSESubscription.unsubscribe();
  }
}
