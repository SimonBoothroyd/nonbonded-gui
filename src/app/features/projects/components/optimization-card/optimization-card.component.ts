import { Component, Input, OnInit } from '@angular/core';
import { Optimization } from '@core/models/projects';

@Component({
  selector: 'app-optimization-card',
  templateUrl: './optimization-card.component.html',
  styleUrls: ['./optimization-card.component.scss'],
})
export class OptimizationCardComponent implements OnInit {
  @Input() optimization: Optimization;

  constructor() {}

  ngOnInit(): void {}
}
