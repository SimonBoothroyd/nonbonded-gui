import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ProjectsRootComponent } from '@app/features/projects/projects-root.component';

import { ProjectSummaryComponent } from '@app/features/projects/pages/project-summary/project-summary.component';
import { ProjectsComponent } from '@app/features/projects/pages/projects/projects.component';

import { ProjectContainerComponent } from '@app/features/projects/pages/project-container/project-container.component';
import { StudiesComponent } from './pages/studies/studies.component';
import { StudyListComponent } from '@app/features/projects/components/card-lists/study-list/study-list.component';
import { StudySummaryComponent } from './pages/study-summary/study-summary.component';

import { SubStudyCardComponent } from '@app/features/projects/components/cards/sub-study-card/sub-study-card.component';

import { OptimizationsComponent } from '@app/features/projects/pages/optimizations/optimizations.component';
import { OptimizationSummaryComponent } from '@app/features/projects/pages/optimization-summary/optimization-summary.component';
import { OptimizationResultsComponent } from './pages/optimization-results/optimization-results.component';

import { BenchmarksComponent } from '@app/features/projects/pages/benchmarks/benchmarks.component';
import { BenchmarkSummaryComponent } from '@app/features/projects/pages/benchmark-summary/benchmark-summary.component';
import { BenchmarkResultsComponent } from './pages/benchmark-results/benchmark-results.component';

import { ProjectsRoutes } from '@app/features/projects/projects.routes';
import { NavigationTreeComponent } from './components/navigation-tree/navigation-tree.component';
import { EvaluatorTargetComponent } from './components/targets/evaluator-target/evaluator-target.component';
import { RechargeTargetComponent } from './components/targets/recharge-target/recharge-target.component';

@NgModule({
  declarations: [
    ProjectsRootComponent,
    ProjectsComponent,
    ProjectSummaryComponent,
    ProjectContainerComponent,
    StudiesComponent,
    StudyListComponent,
    StudySummaryComponent,
    SubStudyCardComponent,
    OptimizationsComponent,
    OptimizationSummaryComponent,
    OptimizationResultsComponent,
    BenchmarksComponent,
    BenchmarkSummaryComponent,
    BenchmarkResultsComponent,
    NavigationTreeComponent,
    EvaluatorTargetComponent,
    RechargeTargetComponent,
  ],
  imports: [CommonModule, ProjectsRoutes, SharedModule],
})
export class ProjectsModule {}
