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
import { FormatTextPipe } from '@shared/pipes/format-text.pipe';
import { TextDescriptionComponent } from '@shared/components/text-description/text-description.component';
import { SummaryCardListComponent } from '@shared/components/card-lists/summary-card-list/summary-card-list.component';
import { RouterModule } from '@angular/router';

PlotlyViaCDNModule.plotlyVersion = 'latest';

@NgModule({
  declarations: [
    LoadableComponent,
    PlotlyComponent,
    SummaryCardListComponent,
    FormatTextPipe,
    TextDescriptionComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    PlotlyViaCDNModule,
    AngularResizedEventModule,
    RouterModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    LoadableComponent,
    PlotlyComponent,
    SummaryCardListComponent,
    FormsModule,
    PlotlyViaCDNModule,
    AngularResizedEventModule,
    FormatTextPipe,
    TextDescriptionComponent,
  ],
})
export class SharedModule {
  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    throwIfAlreadyLoaded(parentModule, 'SharedModule');
  }
}
