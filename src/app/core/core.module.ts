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

import { ProjectsEffects } from '@core/store/projects/projects.effects';
import { DataSetEffects } from '@core/store/datasets/datasets.effects';
import {
  BenchmarksEffects,
  OptimizationsEffects,
} from '@core/store/results/results.effects';

import { RouteSerializer } from '@core/store/routes/route.serializer';

@NgModule({
  imports: [
    CommonModule,

    MaterialModule,

    RouterModule,
    HttpClientModule,

    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      DataSetEffects,
      ProjectsEffects,
      BenchmarksEffects,
      OptimizationsEffects,
    ]),

    StoreRouterConnectingModule.forRoot({
      serializer: RouteSerializer,
    }),
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
