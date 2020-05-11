import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ProjectsComponent } from '@app/features/projects/projects.component';
import { ProjectsListComponent } from '@app/features/projects/pages/projects-list/projects-list.component';
import { ProjectComponent } from '@app/features/projects/pages/project/project.component';
import { StudyComponent } from '@app/features/projects/pages/study/study.component';

import { ProjectsRoutes } from '@app/features/projects/projects.routes';
import { SummaryComponent } from './pages/summary/summary.component';
import { DataSetComponent } from './components/data-set/data-set.component';
import { TestDataSetComponent } from './pages/test-data-set/test-data-set.component';
import { TrainingDataSetComponent } from '@app/features/projects/pages/training-data-set/training-data-set.component';
import { TrainingDataSetChildComponent } from '@app/features/projects/pages/training-data-set-child/training-data-set-child.component';
import { TrainingResultsComponent } from './pages/training-results/training-results.component';
import { TestResultsComponent } from './pages/test-results/test-results.component';
import { ReshapeStatisticsPipe } from './pipes/reshape-statistics.pipe';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectsListComponent,
    ProjectComponent,
    StudyComponent,
    SummaryComponent,
    DataSetComponent,
    TestDataSetComponent,
    TrainingDataSetComponent,
    TrainingDataSetChildComponent,
    TrainingResultsComponent,
    TestResultsComponent,
    ReshapeStatisticsPipe,
  ],
  imports: [CommonModule, ProjectsRoutes, SharedModule],
})
export class ProjectsModule {}
