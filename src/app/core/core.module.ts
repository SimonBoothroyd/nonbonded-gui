import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@shared/material.module';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { reducers } from '@core/store';
import { throwIfAlreadyLoaded } from '@core/guards/module-import.guard';

import { RouteSerializer } from '@core/store/routes/route.serializer';

import { ProjectEffects } from '@core/store/project/project.effects';
import { BenchmarkPlotsEffects } from '@core/store/benchmark-plots/benchmark-plots.effects';
import { OptimizationPlotsEffects } from '@core/store/optimization-plots/optimization-plots.effects';
import { ProjectService } from '@core/services/project.service';
import { DataSetEffects } from '@core/store/dataset/dataset.effects';
import { DataSetService } from '@core/services/dataset.service';

@NgModule({
  imports: [
    CommonModule,

    MaterialModule,

    RouterModule,
    HttpClientModule,

    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      ProjectEffects,
      DataSetEffects,
      BenchmarkPlotsEffects,
      OptimizationPlotsEffects,
    ]),

    StoreRouterConnectingModule.forRoot({
      serializer: RouteSerializer,
    }),
  ],
  providers: [DataSetService, ProjectService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
