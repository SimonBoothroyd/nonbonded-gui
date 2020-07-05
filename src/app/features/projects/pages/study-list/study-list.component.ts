import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectState } from '@core/store/project/project.interfaces';
import { Store } from '@ngrx/store';
import { State } from '@core/store';
import { selectProjectState } from '@core/store/project/project.selectors';

@Component({
  selector: 'app-study-list',
  templateUrl: './study-list.component.html',
  styleUrls: ['./study-list.component.scss'],
})
export class StudyListComponent implements OnInit {
  project$: Observable<ProjectState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.project$ = this.store.select(selectProjectState);
  }
}
