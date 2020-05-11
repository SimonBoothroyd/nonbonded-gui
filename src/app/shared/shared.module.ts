import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoadableComponent } from '@shared/components/loadable/loadable.component';

import { throwIfAlreadyLoaded } from '@core/guards/module-import.guard';
import { FormsModule } from '@angular/forms';

import { PlotlyViaCDNModule } from 'angular-plotly.js';
PlotlyViaCDNModule.plotlyVersion = 'latest';

@NgModule({
  declarations: [LoadableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    PlotlyViaCDNModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    LoadableComponent,
    FormsModule,
    PlotlyViaCDNModule,
  ],
})
export class SharedModule {
  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    throwIfAlreadyLoaded(parentModule, 'SharedModule');
  }
}