import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';

import { MoleculeSetsState } from '@core/store/molsets/molsets.interfaces';
import { selectMoleculeSetsState } from '@core/store/molsets/molsets.selectors';
import { LoadMoleculeSets } from '@core/store/molsets/molsets.actions';

@Component({
  selector: 'app-molecule-sets-list',
  templateUrl: './molecule-sets.component.html',
  styleUrls: ['./molecule-sets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoleculeSetsComponent implements OnInit {
  moleculeSets$: Observable<MoleculeSetsState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadMoleculeSets());
    this.moleculeSets$ = this.store.select(selectMoleculeSetsState);
  }
}
