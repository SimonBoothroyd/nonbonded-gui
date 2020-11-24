import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataSetsComponent } from '@app/features/datasets/pages/data-sets/data-sets.component';
import { DataSetSummaryComponent } from '@app/features/datasets/pages/data-set-summary/data-set-summary.component';
import { DataSetStoreGuard } from '@app/features/datasets/guards/data-set-store.guard';
import { MoleculeSetSummaryComponent } from '@app/features/datasets/pages/molecule-set-summary/molecule-set-summary.component';
import { MoleculeSetStoreGuard } from '@app/features/datasets/guards/molecule-set-store.guard';

const routes: Routes = [
  {
    path: 'datasets',
    children: [
      {
        path: '',
        component: DataSetsComponent,
      },
      {
        path: 'phys-prop',
        children: [
          {
            path: ':dataSetId',
            canActivate: [DataSetStoreGuard],
            component: DataSetSummaryComponent,
          }
        ]
      },
      {
        path: 'quantum',
        children: [
          {
            path: ':moleculeSetId',
            canActivate: [MoleculeSetStoreGuard],
            component: MoleculeSetSummaryComponent,
          }
        ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatasetsRoutes {}
