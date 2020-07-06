import { Component, Input, OnInit } from '@angular/core';
import { Benchmark } from '@core/models/projects';

@Component({
  selector: 'app-benchmark-card',
  templateUrl: './benchmark-card.component.html',
  styleUrls: ['./benchmark-card.component.scss'],
})
export class BenchmarkCardComponent implements OnInit {
  @Input() benchmark: Benchmark;

  constructor() {}

  ngOnInit(): void {}
}
