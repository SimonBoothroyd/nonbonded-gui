import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectState } from '@core/store/project/project.interfaces';
import { Store } from '@ngrx/store';
import { State } from '@core/store';
import { selectProjectState } from '@core/store/project/project.selectors';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss'],
})
export class StudiesComponent implements OnInit {
  project$: Observable<ProjectState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.project$ = this.store.select(selectProjectState);
  }
}
