import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { DatasetsRootComponent } from '@app/features/datasets/datasets-root.component';
import { DataSetsComponent } from '@app/features/datasets/pages/data-sets/data-sets.component';

import { DataSetComponent } from '@app/features/datasets/components/data-set/data-set.component';
import { DataSetCollectionComponent } from '@app/features/datasets/components/data-set-collection/data-set-collection.component';
import { DataEntryDialogComponent } from '@app/features/datasets/components/data-entry-dialog/data-entry-dialog.component';

import { DatasetsRoutes } from '@app/features/datasets/datasets.routes';
import { DataSetSummaryComponent } from '@app/features/datasets/pages/data-set-summary/data-set-summary.component';

@NgModule({
  declarations: [
    DatasetsRootComponent,
    DataSetsComponent,
    DataSetComponent,
    DataSetSummaryComponent,
    DataSetCollectionComponent,
    DataEntryDialogComponent,
  ],
  imports: [CommonModule, DatasetsRoutes, SharedModule],
  entryComponents: [DataEntryDialogComponent],
})
export class DatasetsModule {}
