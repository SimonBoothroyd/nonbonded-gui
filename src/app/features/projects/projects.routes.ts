import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsStoreGuard } from '@app/features/projects/guards/projects-store.guard';

import { ProjectsComponent } from '@app/features/projects/projects.component';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { ProjectComponent } from '@app/features/projects/pages/project/project.component';
import { StudyComponent } from '@app/features/projects/pages/study/study.component';
import { SummaryComponent } from '@app/features/projects/pages/summary/summary.component';
import { TestDataSetComponent } from '@app/features/projects/pages/test-data-set/test-data-set.component';
import { DataSetsStoreGuard } from '@app/features/projects/guards/datasets-store.guard';
import { TrainingDataSetComponent } from '@app/features/projects/pages/training-data-set/training-data-set.component';
import { TrainingDataSetChildComponent } from '@app/features/projects/pages/training-data-set-child/training-data-set-child.component';
import { BenchmarksStoreGuard } from '@app/features/projects/guards/benchmarks-store.guard';
import { OptimizationsStoreGuard } from '@app/features/projects/guards/optimizations-store.guard';
import { TrainingResultsComponent } from '@app/features/projects/pages/training-results/training-results.component';
import { TestResultsComponent } from '@app/features/projects/pages/test-results/test-results.component';

const routes: Routes = [
  {
    path: 'projects',
    canActivate: [ProjectsStoreGuard],
    component: ProjectsComponent,
    children: [
      {
        path: '',
        component: ProjectsListComponent,
      },
      {
        path: ':projectId',
        component: ProjectComponent,
      },
      {
        path: ':projectId/studies',
        redirectTo: ':projectId',
      },
      {
        path: ':projectId/studies/:studyId',
        canActivate: [
          DataSetsStoreGuard,
          BenchmarksStoreGuard,
          OptimizationsStoreGuard,
        ],
        component: StudyComponent,
        children: [
          {
            path: '',
            redirectTo: 'summary',
            pathMatch: 'full',
          },
          {
            path: 'summary',
            component: SummaryComponent,
          },
          {
            path: 'test-set',
            component: TestDataSetComponent,
          },
          {
            path: 'test-results',
            component: TestResultsComponent,
          },
          {
            path: 'training-set',
            component: TrainingDataSetComponent,
            children: [
              {
                path: ':optimizationId',
                component: TrainingDataSetChildComponent,
              },
            ],
          },
          {
            path: 'training-results',
            component: TrainingResultsComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutes {}
