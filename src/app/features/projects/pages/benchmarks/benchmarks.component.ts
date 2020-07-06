import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StudyState } from '@core/store/project/project.interfaces';
import { Store } from '@ngrx/store';
import { State } from '@core/store';
import { getCurrentStudyState } from '@core/store/project/project.selectors';

@Component({
  selector: 'app-optimizations',
  templateUrl: './benchmarks.component.html',
  styleUrls: ['./benchmarks.component.scss'],
})
export class BenchmarksComponent implements OnInit {
  study$: Observable<StudyState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.study$ = this.store.select(getCurrentStudyState);
  }
}
