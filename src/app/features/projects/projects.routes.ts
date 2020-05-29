import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsStoreGuard } from '@app/features/projects/guards/projects-store.guard';

import { ProjectsComponent } from '@app/features/projects/projects.component';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { ProjectComponent } from '@app/features/projects/pages/project/project.component';
import { StudyComponent } from '@app/features/projects/pages/study/study.component';
import { SummaryComponent } from '@app/features/projects/pages/summary/summary.component';
import { TestDataSetComponent } from '@app/features/projects/pages/test-data-set/test-data-set.component';
import { TestDataSetChildComponent } from '@app/features/projects/pages/test-data-set-child/test-data-set-child.component';
import { TestResultsComponent } from '@app/features/projects/pages/test-results/test-results.component';
import { TrainingDataSetComponent } from '@app/features/projects/pages/training-data-set/training-data-set.component';
import { TrainingDataSetChildComponent } from '@app/features/projects/pages/training-data-set-child/training-data-set-child.component';
import { TrainingResultsComponent } from '@app/features/projects/pages/training-results/training-results.component';
import { StudyDetailsStoreGuard } from '@app/features/projects/guards/study-details-store.guard';
import { ProjectStoreGuard } from '@app/features/projects/guards/project-store.guard';
import { StudyListComponent } from '@app/features/projects/pages/study-list/study-list.component';

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
                // redirectTo: '..',
                // pathMatch: 'full',
                component: StudyListComponent,
              },
              {
                path: ':studyId',
                canActivate: [StudyDetailsStoreGuard],
                component: StudyComponent,
                children: [
                  {
                    path: '',
                    component: SummaryComponent,
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
