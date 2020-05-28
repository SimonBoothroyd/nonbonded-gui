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

import { ProjectsEffects } from '@core/store/projects/projects.effects';
import { ProjectEffects } from '@core/store/project/project.effects';
import { StudyDetailsEffects } from '@core/store/study-details/study-details.effects';

@NgModule({
  imports: [
    CommonModule,

    MaterialModule,

    RouterModule,
    HttpClientModule,

    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ProjectsEffects, ProjectEffects, StudyDetailsEffects]),

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
