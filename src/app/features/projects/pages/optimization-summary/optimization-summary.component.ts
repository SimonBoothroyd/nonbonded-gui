import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';

import { OptimizationState } from '@core/store/project/project.interfaces';
import { getCurrentOptimizationState } from '@core/store/project/project.selectors';
import { DataSetCollectionState } from '@core/store/datasets/datasets.interfaces';
import { getCurrentTrainingSets } from '@core/store/study-details/study-details.selectors';

@Component({
  selector: 'app-optimization-summary',
  templateUrl: './optimization-summary.component.html',
  styleUrls: ['./optimization-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptimizationSummaryComponent implements OnInit {
  optimization$: Observable<OptimizationState>;
  trainingSet$: Observable<DataSetCollectionState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.optimization$ = this.store.select(getCurrentOptimizationState);
    this.trainingSet$ = this.store.select(getCurrentTrainingSets);
  }
}
