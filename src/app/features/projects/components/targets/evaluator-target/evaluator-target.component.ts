import { Component, Input, OnInit } from '@angular/core';
import { EvaluatorTarget } from '@core/models/projects';

@Component({
  selector: 'app-evaluator-target',
  templateUrl: './evaluator-target.component.html',
  styleUrls: ['./evaluator-target.component.scss'],
})
export class EvaluatorTargetComponent implements OnInit {
  @Input() target: EvaluatorTarget;

  constructor() {}

  ngOnInit(): void {}
}
