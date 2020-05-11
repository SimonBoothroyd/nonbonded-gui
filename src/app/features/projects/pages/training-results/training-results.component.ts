import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';

import { OptimizationResultsState } from '@core/store/results/results.interfaces';
import { getOptimizationResultState } from '@core/store/results/results.selectors';

@Component({
  selector: 'app-training-results',
  templateUrl: './training-results.component.html',
  styleUrls: ['./training-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingResultsComponent implements OnInit {
  optimizationResults$: Observable<OptimizationResultsState>;

  public graphData = {
    data: [
      {
        x: [1, 2, 3],
        y: [2, 6, 3],
        type: 'scatter',
        mode: 'lines+points',
        marker: { color: 'red' },
      },
      { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
    ],
    layout: { title: 'A Fancy Plot' },
  };

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.optimizationResults$ = this.store.select(getOptimizationResultState, {});
  }
}
