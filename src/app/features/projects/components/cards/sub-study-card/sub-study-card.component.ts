import { Component, Input, OnInit } from '@angular/core';
import { Benchmark, Optimization } from '@core/models/projects';

@Component({
  selector: 'app-sub-study-card',
  templateUrl: './sub-study-card.component.html',
  styleUrls: ['./sub-study-card.component.scss'],
})
export class SubStudyCardComponent implements OnInit {
  @Input() subStudy: Benchmark | Optimization;

  @Input() overviewLink: string[];
  @Input() resultsLink: string[];

  constructor() {}

  ngOnInit(): void {}
}
