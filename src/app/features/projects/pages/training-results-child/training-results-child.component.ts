import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';

import { PlotData } from '@shared/components/plotly/plotly.interfaces';

import { getIterationRMSE, getObjectiveFunction } from '@core/store/study-details/study-details.selectors';
import { getCurrentOptimizationState } from '@core/store/project/project.selectors';

import { TrainingResultsState } from '@core/store/study-details/study-details.interfaces';
import { OptimizationState } from '@core/store/project/project.interfaces';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-training-results-child',
  templateUrl: './training-results-child.component.html',
  styleUrls: ['./training-results-child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingResultsChildComponent implements OnInit, OnDestroy {

  public optimization$: Observable<OptimizationState>

  public objectiveFunction$: Observable<PlotData>;

  public iterationRMSE$: Observable<TrainingResultsState>;
  private iterationRMSESubscription: Subscription

  public propertyType: string;

  // private matcher: MediaQueryList;
  public layoutType: string;

  constructor(
    private store: Store<State>,
    private breakpointObserver: BreakpointObserver,
    private ref: ChangeDetectorRef,
  ) {
    this.layoutType = "row"
  }

  ngOnInit(): void {
    this.optimization$ = this.store.select(getCurrentOptimizationState)
    this.objectiveFunction$ = this.store.select(getObjectiveFunction);
    this.iterationRMSE$ = this.store.select(getIterationRMSE);

    this.iterationRMSESubscription = this.iterationRMSE$.subscribe(
      (state: TrainingResultsState) => {

        if (!state) return;

        const propertyNames = Object.keys(state.plotData)

        if (propertyNames.length == 0) {
          this.propertyType = undefined;
          return
        }

        if (propertyNames.includes(this.propertyType)) return
        this.propertyType = propertyNames[0]
      }
    )

    this.breakpointObserver
      .observe(['(max-width: 1420px)'])
      .subscribe((state: BreakpointState) => this.updateLayout(state));
  }

  updateLayout(state: BreakpointState) {
    this.layoutType = state.breakpoints['(max-width: 1420px)'] ? "column" : "row";
    this.ref.detectChanges();
  }

  ngOnDestroy() {
    if (this.iterationRMSESubscription) this.iterationRMSESubscription.unsubscribe()
  }
}
