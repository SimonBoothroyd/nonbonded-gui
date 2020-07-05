import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';

import { selectProjectsState } from '@core/store/projects/projects.selectors';
import {
  ProjectsState,
  ProjectSummary,
} from '@core/store/projects/projects.interfaces';
import { ITextElement, TextList, TextParagraph } from '@shared/pipes/format-text.pipe';

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
    this.projects$ = this.store.select(selectProjectsState);
  }

  authorList(project: ProjectSummary): string {
    return project.authors.map((author) => author.name).join(', ');
  }
}
