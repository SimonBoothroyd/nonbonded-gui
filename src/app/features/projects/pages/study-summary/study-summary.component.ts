import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';

import { StudyState } from '@core/store/project/project.interfaces';
import { getCurrentStudyState } from '@core/store/project/project.selectors';

@Component({
  selector: 'app-summary',
  templateUrl: './study-summary.component.html',
  styleUrls: ['./study-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudySummaryComponent implements OnInit {
  study$: Observable<StudyState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.study$ = this.store.select(getCurrentStudyState);
  }
}
