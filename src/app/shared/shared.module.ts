import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoadableComponent } from '@shared/components/loadable/loadable.component';

import { throwIfAlreadyLoaded } from '@core/guards/module-import.guard';
import { FormsModule } from '@angular/forms';

import { PlotlyComponent } from '@shared/components/plotly/plotly.component';

import { PlotlyViaWindowModule } from 'angular-plotly.js';
import { FormatTextPipe } from '@shared/pipes/format-text.pipe';
import { TextDescriptionComponent } from '@shared/components/text-description/text-description.component';
import { SummaryCardComponent } from '@shared/components/summary-card/summary-card.component';
import { RouterModule } from '@angular/router';
import { PlotlyLegendEntryComponent } from '@shared/components/plotly-legend-entry/plotly-legend-entry.component';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { TableOfContentsComponent } from './components/table-of-contents/table-of-contents.component';

@NgModule({
  declarations: [
    LoadableComponent,
    NavbarComponent,
    PlotlyComponent,
    PlotlyLegendEntryComponent,
    SummaryCardComponent,
    FormatTextPipe,
    TextDescriptionComponent,
    TableOfContentsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    PlotlyViaWindowModule,
    RouterModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    LoadableComponent,
    NavbarComponent,
    PlotlyComponent,
    PlotlyLegendEntryComponent,
    SummaryCardComponent,
    FormsModule,
    PlotlyViaWindowModule,
    FormatTextPipe,
    TextDescriptionComponent,
    TableOfContentsComponent,
  ],
})
export class SharedModule {
  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    throwIfAlreadyLoaded(parentModule, 'SharedModule');
  }
}
