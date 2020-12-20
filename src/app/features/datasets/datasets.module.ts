import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { DataSetsComponent } from '@app/features/datasets/pages/data-sets/data-sets.component';

import { DataSetSectionComponent } from '@app/features/datasets/components/data-set-section/data-set-section.component';
import { DataEntryDialogComponent } from '@app/features/datasets/components/data-entry-dialog/data-entry-dialog.component';

import { DatasetsRoutes } from '@app/features/datasets/datasets.routes';
import { DataSetSummaryComponent } from '@app/features/datasets/pages/data-set-summary/data-set-summary.component';
import { MarkdownModule } from 'ngx-markdown';
import { DataTableComponent } from './components/data-table/data-table.component';

@NgModule({
  declarations: [
    DataSetsComponent,
    DataSetSectionComponent,
    DataSetSummaryComponent,
    DataEntryDialogComponent,
    DataTableComponent,
  ],
  imports: [CommonModule, DatasetsRoutes, SharedModule, MarkdownModule.forRoot()],
  entryComponents: [DataEntryDialogComponent],
})
export class DatasetsModule {}
