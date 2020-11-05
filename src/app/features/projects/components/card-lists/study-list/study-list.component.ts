import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '@core/store';
import { Study } from '@core/models/projects';

@Component({
  selector: 'app-study-list',
  templateUrl: './study-list.component.html',
  styleUrls: ['./study-list.component.scss'],
})
export class StudyListComponent implements OnInit {
  @Input() baseRouteUrl?: string;
  @Input() studies: Study[];

  constructor(private store: Store<State>) {
    this.studies = [];
  }

  ngOnInit(): void {}
}
