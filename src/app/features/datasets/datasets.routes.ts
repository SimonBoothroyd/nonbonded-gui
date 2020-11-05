import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DatasetsRootComponent } from '@app/features/datasets/datasets-root.component';
import { DataSetsComponent } from '@app/features/datasets/pages/data-sets/data-sets.component';
import { DataSetSummaryComponent } from '@app/features/datasets/pages/data-set-summary/data-set-summary.component';
import { DataSetStoreGuard } from '@app/features/datasets/guards/data-set-store.guard';

const routes: Routes = [
  {
    path: 'datasets',
    component: DatasetsRootComponent,
    children: [
      {
        path: '',
        component: DataSetsComponent,
      },
      {
        path: ':dataSetId',
        canActivate: [DataSetStoreGuard],
        component: DataSetSummaryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatasetsRoutes {}
