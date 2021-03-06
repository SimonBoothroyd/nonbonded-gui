import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectSummaryComponent } from '@app/features/projects/pages/project-summary/project-summary.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectStoreGuard } from '@app/features/projects/guards/project-store.guard';
import { ProjectContainerComponent } from '@app/features/projects/pages/project-container/project-container.component';
import { StudiesComponent } from '@app/features/projects/pages/studies/studies.component';
import { StudySummaryComponent } from '@app/features/projects/pages/study-summary/study-summary.component';
import { OptimizationsComponent } from '@app/features/projects/pages/optimizations/optimizations.component';
import { OptimizationSummaryComponent } from '@app/features/projects/pages/optimization-summary/optimization-summary.component';
import { OptimizationResultsComponent } from '@app/features/projects/pages/optimization-results/optimization-results.component';
import { BenchmarksComponent } from '@app/features/projects/pages/benchmarks/benchmarks.component';
import { BenchmarkSummaryComponent } from '@app/features/projects/pages/benchmark-summary/benchmark-summary.component';
import { BenchmarkResultsComponent } from '@app/features/projects/pages/benchmark-results/benchmark-results.component';

const optimizationRoutes = {
  path: 'optimizations',
  children: [
    {
      path: '',
      component: OptimizationsComponent,
    },
    {
      path: ':optimizationId',
      component: OptimizationSummaryComponent,
    },
  ],
};

const benchmarkRoutes = {
  path: 'benchmarks',
  children: [
    {
      path: '',
      component: BenchmarksComponent,
    },
    {
      path: ':benchmarkId',
      component: BenchmarkSummaryComponent,
    },
  ],
};

const routes: Routes = [
  {
    path: 'projects',
    children: [
      {
        path: '',
        component: ProjectsComponent,
      },
      {
        path: ':projectId',
        canActivate: [ProjectStoreGuard],
        component: ProjectContainerComponent,
        children: [
          {
            path: '',
            component: ProjectSummaryComponent,
          },
          {
            path: 'studies',
            children: [
              {
                path: '',
                component: StudiesComponent,
              },
              {
                path: ':studyId',
                children: [
                  {
                    path: '',
                    component: StudySummaryComponent,
                  },
                  optimizationRoutes,
                  {
                    path: 'optimization-results',
                    component: OptimizationResultsComponent,
                  },
                  benchmarkRoutes,
                  {
                    path: 'benchmark-results',
                    component: BenchmarkResultsComponent,
                  },
                ],
              },
            ],
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
