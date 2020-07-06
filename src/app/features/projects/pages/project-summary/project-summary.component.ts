import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';
import { selectProjectState } from '@core/store/project/project.selectors';
import { ProjectState } from '@core/store/project/project.interfaces';

@Component({
  selector: 'app-project',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSummaryComponent implements OnInit {
  project$: Observable<ProjectState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.project$ = this.store.select(selectProjectState);
  }
}
