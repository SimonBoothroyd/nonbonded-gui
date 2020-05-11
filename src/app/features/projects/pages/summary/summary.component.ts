import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';

import { StudyState } from '@core/store/projects/projects.interfaces';
import { getCurrentStudyState } from '@core/store/projects/projects.selectors';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent implements OnInit {
  study$: Observable<StudyState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.study$ = this.store.select(getCurrentStudyState);
  }
}
