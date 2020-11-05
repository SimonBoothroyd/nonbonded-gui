import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';

import { selectProjectsState } from '@core/store/projects/projects.selectors';
import { ProjectsState } from '@core/store/projects/projects.interfaces';
import { LoadProjects } from '@core/store/projects/projects.actions';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<ProjectsState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadProjects());
    this.projects$ = this.store.select(selectProjectsState);
  }
}
