import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@core/store';

import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';

import { getRouterInfo } from '@core/store/routes/route.selectors';
import { RouterStateUrl } from '@core/store/routes/route.serializer';

import { StudyState } from '@core/store/projects/projects.interfaces';
import { getCurrentStudyState } from '@core/store/projects/projects.selectors';

@Component({
  selector: 'app-training-data-set',
  templateUrl: './training-data-set.component.html',
  styleUrls: ['./training-data-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingDataSetComponent implements OnInit {
  study$: Observable<StudyState>;
  routerInfo$: Observable<RouterStateUrl>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.study$ = this.store.select(getCurrentStudyState);
    this.routerInfo$ = this.store.select(getRouterInfo);
  }

  onOptimizationChanged(event: MatSelectChange): void {
    this.router.navigate([event.value], { relativeTo: this.activatedRoute });
  }
}
