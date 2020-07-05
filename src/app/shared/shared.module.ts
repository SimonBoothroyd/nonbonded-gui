import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoadableComponent } from '@shared/components/loadable/loadable.component';

import { throwIfAlreadyLoaded } from '@core/guards/module-import.guard';
import { FormsModule } from '@angular/forms';

import { AngularResizedEventModule } from 'angular-resize-event';
import { PlotlyComponent } from '@shared/components/plotly/plotly.component';

import { PlotlyViaCDNModule } from 'angular-plotly.js';
import { DataSetComponent } from '@shared/components/data-set/data-set.component';
import { DataSetCollectionComponent } from '@shared/components/data-set-collection/data-set-collection.component';
import { DataEntryDialogComponent } from '@shared/components/data-entry-dialog/data-entry-dialog.component';

PlotlyViaCDNModule.plotlyVersion = 'latest';

@NgModule({
  declarations: [
    LoadableComponent,
    PlotlyComponent,
    DataSetComponent,
    DataSetCollectionComponent,
    DataEntryDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    PlotlyViaCDNModule,
    AngularResizedEventModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    LoadableComponent,
    PlotlyComponent,
    FormsModule,
    PlotlyViaCDNModule,
    AngularResizedEventModule,
    DataSetComponent,
    DataSetCollectionComponent,
    DataEntryDialogComponent
  ],
  entryComponents: [DataEntryDialogComponent],
})
export class SharedModule {
  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    throwIfAlreadyLoaded(parentModule, 'SharedModule');
  }
}
