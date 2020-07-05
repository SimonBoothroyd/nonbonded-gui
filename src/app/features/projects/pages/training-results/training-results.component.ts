import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@core/store';

import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';

import { getRouterInfo } from '@core/store/routes/route.selectors';
import { RouterStateUrl } from '@core/store/routes/route.serializer';

import { StudyState } from '@core/store/project/project.interfaces';
import { getCurrentStudyState } from '@core/store/project/project.selectors';

@Component({
  selector: 'app-training-results',
  templateUrl: './training-results.component.html',
  styleUrls: ['./training-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingResultsComponent implements OnInit, OnDestroy {
  study$: Observable<StudyState>;
  routerInfo$: Observable<RouterStateUrl>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<State>
  ) {
  }

  ngOnInit(): void {

    this.study$ = this.store.select(getCurrentStudyState);
    this.routerInfo$ = this.store.select(getRouterInfo);
  }

  ngOnDestroy() {
  }

  onOptimizationChanged(event: MatSelectChange): void {
    this.router.navigate([event.value], { relativeTo: this.activatedRoute });
  }
}
