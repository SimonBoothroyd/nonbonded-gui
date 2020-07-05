import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsStoreGuard } from '@app/features/projects/guards/projects-store.guard';

import { ProjectsRootComponent } from '@app/features/projects/projects-root.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectComponent } from '@app/features/projects/pages/project/project.component';
import { StudyComponent } from '@app/features/projects/pages/study/study.component';
import { StudySummaryComponent } from '@app/features/projects/pages/study-summary/study-summary.component';
import { TestDataSetComponent } from '@app/features/projects/pages/test-data-set/test-data-set.component';
import { TestDataSetChildComponent } from '@app/features/projects/pages/test-data-set-child/test-data-set-child.component';
import { TestResultsComponent } from '@app/features/projects/pages/test-results/test-results.component';
import { TrainingDataSetComponent } from '@app/features/projects/pages/training-data-set/training-data-set.component';
import { TrainingDataSetChildComponent } from '@app/features/projects/pages/training-data-set-child/training-data-set-child.component';
import { TrainingResultsComponent } from '@app/features/projects/pages/training-results/training-results.component';
import { TrainingResultsChildComponent } from '@app/features/projects/pages/training-results-child/training-results-child.component';
import { StudyDetailsStoreGuard } from '@app/features/projects/guards/study-details-store.guard';
import { ProjectStoreGuard } from '@app/features/projects/guards/project-store.guard';
import { StudiesComponent } from '@app/features/projects/pages/studies/studies.component';

const routes: Routes = [
  {
    path: 'projects',
    canActivate: [ProjectsStoreGuard],
    component: ProjectsRootComponent,
    children: [
      {
        path: '',
        component: ProjectsComponent,
      },
      {
        path: ':projectId',
        canActivate: [ProjectStoreGuard],
        children: [
          {
            path: '',
            component: ProjectComponent,
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
                canActivate: [StudyDetailsStoreGuard],
                component: StudyComponent,
                children: [
                  {
                    path: '',
                    component: StudySummaryComponent,
                  },
                  {
                    path: 'test-set',
                    component: TestDataSetComponent,
                    children: [
                      {
                        path: ':benchmarkId',
                        component: TestDataSetChildComponent,
                      },
                    ],
                  },
                  {
                    path: 'test-results',
                    component: TestResultsComponent,
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
                    children: [
                      {
                        path: ':optimizationId',
                        component: TrainingResultsChildComponent,
                      },
                    ],
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
