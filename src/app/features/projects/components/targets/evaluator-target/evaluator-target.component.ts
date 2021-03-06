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

  formatDenominator(denominatorKey: string) {
    if (denominatorKey == 'Density') return 'ρ';
    if (denominatorKey == 'EnthalpyOfMixing') return 'ΔHmix';
    if (denominatorKey == 'EnthalpyOfVaporization') return 'ΔHvap';
    if (denominatorKey == 'ExcessMolarVolume') return 'ΔVex';
    if (denominatorKey == 'SolvationFreeEnergy') return 'ΔGsolv';
  }
}
