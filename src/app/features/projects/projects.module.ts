import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BREAKPOINT, DEFAULT_BREAKPOINTS } from '@angular/flex-layout';

import { SharedModule } from '@shared/shared.module';

import { ProjectsRootComponent } from '@app/features/projects/projects-root.component';
import { ProjectsComponent } from '@app/features/projects/pages/projects/projects.component';
import { ProjectComponent } from '@app/features/projects/pages/project/project.component';
import { StudyComponent } from '@app/features/projects/pages/study/study.component';

import { ProjectsRoutes } from '@app/features/projects/projects.routes';

import { StudySummaryComponent } from './pages/study-summary/study-summary.component';
import { TestDataSetComponent } from './pages/test-data-set/test-data-set.component';
import { TrainingDataSetComponent } from './pages/training-data-set/training-data-set.component';
import { TrainingDataSetChildComponent } from './pages/training-data-set-child/training-data-set-child.component';
import { TrainingResultsComponent } from './pages/training-results/training-results.component';
import { TrainingResultsChildComponent } from './pages/training-results-child/training-results-child.component';
import { TestResultsComponent } from './pages/test-results/test-results.component';
import { TestDataSetChildComponent } from './pages/test-data-set-child/test-data-set-child.component';
import { StudiesComponent } from './pages/studies/studies.component';
import { StudyListComponent } from '@app/features/projects/components/study-list/study-list.component';

const RESULTS_BREAKPOINTS = [
  {
    alias: 'md.train',
    suffix: 'MdTrain',
    mediaQuery: '(max-width: 1420)',
    overlapping: false,
    priority: 1001, // Needed if overriding the default print breakpoint
  },
  {
    alias: 'gt-md.train',
    suffix: 'GtMdTrain',
    mediaQuery: '(min-width: 1421)',
    overlapping: false,
    priority: 1001, // Needed if overriding the default print breakpoint
  },
];

export const CustomBreakPointsProvider = {
  provide: BREAKPOINT,
  useValue: RESULTS_BREAKPOINTS,
  multi: true,
};

@NgModule({
  declarations: [
    ProjectsRootComponent,
    ProjectsComponent,
    ProjectComponent,
    StudyComponent,
    StudiesComponent,
    StudyListComponent,
    StudySummaryComponent,
    TestDataSetComponent,
    TestDataSetChildComponent,
    TrainingDataSetComponent,
    TrainingDataSetChildComponent,
    TrainingResultsComponent,
    TrainingResultsChildComponent,
    TestResultsComponent,
  ],
  imports: [CommonModule, ProjectsRoutes, SharedModule],
  // providers: [CustomBreakPointsProvider]
})
export class ProjectsModule {}
