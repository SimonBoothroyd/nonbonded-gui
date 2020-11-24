import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProjectsModule } from '@app/features/projects/projects.module';
import { DatasetsModule } from '@app/features/datasets/datasets.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    SharedModule,
    MaterialModule,

    DatasetsModule,
    ProjectsModule,

    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
