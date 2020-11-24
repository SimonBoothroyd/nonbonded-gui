import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { DataSetsComponent } from '@app/features/datasets/pages/data-sets/data-sets.component';

import { DataSetComponent } from '@app/features/datasets/components/data-set/data-set.component';
import { DataSetCollectionComponent } from '@app/features/datasets/components/data-set-collection/data-set-collection.component';
import { DataEntryDialogComponent } from '@app/features/datasets/components/data-entry-dialog/data-entry-dialog.component';

import { DatasetsRoutes } from '@app/features/datasets/datasets.routes';
import { DataSetSummaryComponent } from '@app/features/datasets/pages/data-set-summary/data-set-summary.component';
import { MoleculeSetSummaryComponent } from '@app/features/datasets/pages/molecule-set-summary/molecule-set-summary.component';

@NgModule({
  declarations: [
    DataSetsComponent,
    DataSetComponent,
    DataSetSummaryComponent,
    DataSetCollectionComponent,
    DataEntryDialogComponent,
    MoleculeSetSummaryComponent,
  ],
  imports: [CommonModule, DatasetsRoutes, SharedModule],
  entryComponents: [DataEntryDialogComponent],
})
export class DatasetsModule {}
