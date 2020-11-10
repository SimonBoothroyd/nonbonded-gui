import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoleculeSetsRootComponent } from '@app/features/molsets/molsets-root.component';
import { MoleculeSetsComponent } from '@app/features/molsets/pages/molecule-sets/molecule-sets.component';
import { MoleculeSetStoreGuard } from '@app/features/molsets/guards/molecule-set-store.guard';
import { MoleculeSetSummaryComponent } from '@app/features/molsets/pages/molecule-set-summary/molecule-set-summary.component';

const routes: Routes = [
  {
    path: 'molsets',
    component: MoleculeSetsRootComponent,
    children: [
      {
        path: '',
        component: MoleculeSetsComponent,
      },
      {
        path: ':moleculeSetId',
        canActivate: [MoleculeSetStoreGuard],
        component: MoleculeSetSummaryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MolsetsRoutes {}
