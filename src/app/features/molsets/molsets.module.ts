import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { MoleculeSetsRootComponent } from '@app/features/molsets/molsets-root.component';
import { MoleculeSetsComponent } from '@app/features/molsets/pages/molecule-sets/molecule-sets.component';
import { MoleculeSetSummaryComponent } from '@app/features/molsets/pages/molecule-set-summary/molecule-set-summary.component';
import { MolsetsRoutes } from '@app/features/molsets/molsets.routes';

@NgModule({
  declarations: [
    MoleculeSetsRootComponent,
    MoleculeSetsComponent,
    MoleculeSetSummaryComponent,
  ],
  imports: [CommonModule, MolsetsRoutes, SharedModule],
})
export class MolsetsModule {}
