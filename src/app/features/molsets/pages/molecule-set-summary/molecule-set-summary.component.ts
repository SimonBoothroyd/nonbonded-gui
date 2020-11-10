import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';
import { selectMoleculeSetState } from '@core/store/molset/molset.selectors';
import { MoleculeSetState } from '@core/store/molset/molset.interfaces';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

import { MOLECULE_IMAGE_ENDPOINT } from '@core/endpoints';

@Component({
  selector: 'app-molecule-set-summary',
  templateUrl: './molecule-set-summary.component.html',
  styleUrls: ['./molecule-set-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoleculeSetSummaryComponent implements OnInit {
  public moleculeSet$: Observable<MoleculeSetState>;

  public nColumns: number = 10;

  constructor(
    private store: Store<State>,
    private breakpointObserver: BreakpointObserver,
    private ref: ChangeDetectorRef
  ) {}

  imageEndpoint(smiles: string): string {
    return `${MOLECULE_IMAGE_ENDPOINT}/${encodeURI(smiles)}`;
  }

  ngOnInit(): void {
    this.moleculeSet$ = this.store.select(selectMoleculeSetState);

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((state: BreakpointState) => this.updateColumns(state));
  }

  updateColumns(state: BreakpointState) {
    if (state.breakpoints[Breakpoints.XSmall]) this.nColumns = 2;
    else if (state.breakpoints[Breakpoints.Small]) this.nColumns = 4;
    else if (state.breakpoints[Breakpoints.Medium]) this.nColumns = 8;
    else if (state.breakpoints[Breakpoints.Large]) this.nColumns = 10;
    else if (state.breakpoints[Breakpoints.XLarge]) this.nColumns = 12;
    else this.nColumns = 1;

    this.ref.detectChanges();
  }
}
