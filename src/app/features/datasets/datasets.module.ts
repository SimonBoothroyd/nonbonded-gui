import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { DataSetsComponent } from '@app/features/datasets/pages/data-sets/data-sets.component';

import { DataSetSectionComponent } from '@app/features/datasets/components/data-set-section/data-set-section.component';
import { DataEntryDialogComponent } from '@app/features/datasets/components/data-entry-dialog/data-entry-dialog.component';

import { DatasetsRoutes } from '@app/features/datasets/datasets.routes';
import { DataSetSummaryComponent } from '@app/features/datasets/pages/data-set-summary/data-set-summary.component';

@NgModule({
  declarations: [
    DataSetsComponent,
    DataSetSectionComponent,
    DataSetSummaryComponent,
    DataEntryDialogComponent,
  ],
  imports: [CommonModule, DatasetsRoutes, SharedModule],
  entryComponents: [DataEntryDialogComponent],
})
export class DatasetsModule {}
