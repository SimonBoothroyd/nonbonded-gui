import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ProjectsRootComponent } from '@app/features/projects/projects-root.component';

import { ProjectSummaryComponent } from '@app/features/projects/pages/project-summary/project-summary.component';
import { ProjectsComponent } from '@app/features/projects/pages/projects/projects.component';

import { StudyComponent } from '@app/features/projects/pages/study/study.component';
import { StudiesComponent } from './pages/studies/studies.component';
import { StudyListComponent } from '@app/features/projects/components/study-list/study-list.component';
import { StudySummaryComponent } from './pages/study-summary/study-summary.component';

import { OptimizationsComponent } from '@app/features/projects/pages/optimizations/optimizations.component';
import { OptimizationSummaryComponent } from '@app/features/projects/pages/optimization-summary/optimization-summary.component';
import { OptimizationCardComponent } from './components/optimization-card/optimization-card.component';
import { OptimizationResultsComponent } from './pages/optimization-results/optimization-results.component';

import { BenchmarksComponent } from '@app/features/projects/pages/benchmarks/benchmarks.component';
import { BenchmarkSummaryComponent } from '@app/features/projects/pages/benchmark-summary/benchmark-summary.component';
import { BenchmarkCardComponent } from '@app/features/projects/components/benchmark-card/benchmark-card.component';
import { BenchmarkResultsComponent } from './pages/benchmark-results/benchmark-results.component';

import { ProjectsRoutes } from '@app/features/projects/projects.routes';

@NgModule({
  declarations: [
    ProjectsRootComponent,
    ProjectsComponent,
    ProjectSummaryComponent,
    StudyComponent,
    StudiesComponent,
    StudyListComponent,
    StudySummaryComponent,
    OptimizationsComponent,
    OptimizationSummaryComponent,
    OptimizationCardComponent,
    OptimizationResultsComponent,
    BenchmarksComponent,
    BenchmarkSummaryComponent,
    BenchmarkCardComponent,
    BenchmarkResultsComponent,
  ],
  imports: [CommonModule, ProjectsRoutes, SharedModule],
})
export class ProjectsModule {}
