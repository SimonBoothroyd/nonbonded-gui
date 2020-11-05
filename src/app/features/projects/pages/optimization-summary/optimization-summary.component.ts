import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';

import { OptimizationState } from '@core/store/project/project.interfaces';
import { getCurrentOptimizationState } from '@core/store/project/project.selectors';
import { Parameter, Priors } from '@core/models/projects';

@Component({
  selector: 'app-optimization-summary',
  templateUrl: './optimization-summary.component.html',
  styleUrls: ['./optimization-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptimizationSummaryComponent implements OnInit {
  optimization$: Observable<OptimizationState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.optimization$ = this.store.select(getCurrentOptimizationState);
  }

  public groupParameters(
    parameters: Parameter[]
  ): { [handler: string]: { [smirks: string]: string[] } } {
    let groupedParameters = {};

    parameters.forEach((parameter) => {
      const handler = parameter.handler_type;
      const smirks = parameter.smirks;

      groupedParameters[handler] = groupedParameters[handler] || {};
      groupedParameters[handler][smirks] = groupedParameters[handler][smirks] || [];

      groupedParameters[handler][smirks].push(parameter.attribute_name);
    });

    return groupedParameters;
  }

  public groupPriors(
    priors: Priors
  ): { [handler: string]: { [attribute: string]: number } } {
    let groupedPriors = {};

    for (let [key, value] of Object.entries(priors)) {
      const split_key = key.split('/');

      const handler = split_key[0];
      const attribute = split_key[2];

      groupedPriors[handler] = groupedPriors[handler] || {};
      groupedPriors[handler][attribute] = value;
    }

    return groupedPriors;
  }
}
