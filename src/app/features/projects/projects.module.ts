import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {BREAKPOINT, DEFAULT_BREAKPOINTS} from '@angular/flex-layout';

import { SharedModule } from '@shared/shared.module';

import { ProjectsComponent } from '@app/features/projects/projects.component';
import { ProjectsListComponent } from '@app/features/projects/pages/projects-list/projects-list.component';
import { ProjectComponent } from '@app/features/projects/pages/project/project.component';
import { StudyComponent } from '@app/features/projects/pages/study/study.component';

import { ProjectsRoutes } from '@app/features/projects/projects.routes';

import { SummaryComponent } from './pages/summary/summary.component';
import { TestDataSetComponent } from './pages/test-data-set/test-data-set.component';
import { TrainingDataSetComponent } from './pages/training-data-set/training-data-set.component';
import { TrainingDataSetChildComponent } from './pages/training-data-set-child/training-data-set-child.component';
import { TrainingResultsComponent } from './pages/training-results/training-results.component';
import { TrainingResultsChildComponent } from './pages/training-results-child/training-results-child.component';
import { TestResultsComponent } from './pages/test-results/test-results.component';
import { TestDataSetChildComponent } from './pages/test-data-set-child/test-data-set-child.component';
import { StudyListComponent } from './pages/study-list/study-list.component';

const RESULTS_BREAKPOINTS = [
  {
    alias: 'md.train',
    suffix: 'MdTrain',
    mediaQuery: '(max-width: 1420)',
    overlapping: false,
    priority: 1001 // Needed if overriding the default print breakpoint
  },
  {
    alias: 'gt-md.train',
    suffix: 'GtMdTrain',
    mediaQuery: '(min-width: 1421)',
    overlapping: false,
    priority: 1001 // Needed if overriding the default print breakpoint
  }
];

export const CustomBreakPointsProvider = {
  provide: BREAKPOINT,
  useValue: RESULTS_BREAKPOINTS,
  multi: true
};

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectsListComponent,
    ProjectComponent,
    StudyComponent,
    SummaryComponent,
    TestDataSetComponent,
    TestDataSetChildComponent,
    TrainingDataSetComponent,
    TrainingDataSetChildComponent,
    TrainingResultsComponent,
    TrainingResultsChildComponent,
    TestResultsComponent,
    StudyListComponent,
  ],
  imports: [CommonModule, ProjectsRoutes, SharedModule],
  // providers: [CustomBreakPointsProvider]
})
export class ProjectsModule {}
