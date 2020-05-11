import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';
import { getCurrentProjectState } from '@core/store/projects/projects.selectors';
import { ProjectState } from '@core/store/projects/projects.interfaces';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent implements OnInit {
  project$: Observable<ProjectState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.project$ = this.store.select(getCurrentProjectState);
  }
}
