import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, of, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';
import { getRouterInfo } from '@core/store/routes/route.selectors';
import { ProjectService } from '@core/services/project.service';
import { Router } from '@angular/router';
import { ProjectCollection } from '@core/models/projects';
import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';
import { catchError, flatMap, map, startWith, tap } from 'rxjs/operators';
import { RouterStateUrl } from '@core/store/routes/route.serializer';

interface ProjectCollectionState extends Loadable, ProjectCollection {}

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit, OnDestroy {
  public routerInfo$: Observable<RouterStateUrl>;

  public isLoading: boolean;
  public projects$: Observable<ProjectCollectionState>;

  public readonly pageSize: number = 5;

  private routerSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private router: Router,
    private projectsService: ProjectService
  ) {}

  ngOnInit(): void {
    this.routerInfo$ = this.store.select(getRouterInfo);

    this.projects$ = this.routerInfo$.pipe(
      tap(() => {
        this.isLoading = true;
      }),
      flatMap((routerState) =>
        this.projectsService.readAll(routerState.queryParams.skip, this.pageSize)
      ),
      tap(() => {
        this.isLoading = false;
      }),
      map((response) => ({ ...this.emptyState(), ...response, success: true })),
      catchError((error) => of({ ...this.emptyState(), error: error })),
      startWith({ ...this.emptyState(), loading: true })
    );
  }

  ngOnDestroy() {
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
  }

  public emptyState(): ProjectCollectionState {
    return { ...createDefaultLoadable(), projects: [], metadata: undefined };
  }

  public onPageChanged(e) {
    this.router.navigate(['/projects'], {
      queryParams: { skip: e.pageIndex },
    });
  }

  public getProjectState(
    projectsState: ProjectCollectionState
  ): ProjectCollectionState {
    return { ...projectsState, loading: this.isLoading };
  }
}
