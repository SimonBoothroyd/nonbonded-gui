import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';

import { selectProjectsState } from '@core/store/projects/projects.selectors';
import { ProjectCollectionState } from '@core/store/projects/projects.interfaces';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListComponent implements OnInit {
  projectCollection$: Observable<ProjectCollectionState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.projectCollection$ = this.store.select(selectProjectsState);
  }
}
