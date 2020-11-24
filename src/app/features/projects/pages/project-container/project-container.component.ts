import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProjectState } from '@core/store/project/project.interfaces';
import { selectProjectState } from '@core/store/project/project.selectors';
import { Store } from '@ngrx/store';
import { State } from '@core/store';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';

// We use the same break-points as the https://material.angular.io/ site as these
// seem to be sensible values when tested across a range of devices.
const EXTRA_SMALL_WIDTH_BREAKPOINT = 720;
const SMALL_WIDTH_BREAKPOINT = 939;

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectContainerComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav) rootSidenav: MatSidenav;

  public isExtraSmallScreen$: Observable<boolean>;
  public isSmallScreen$: Observable<boolean>;

  public project$: Observable<ProjectState>;
  private readonly routerSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private router: Router,
    breakpoints: BreakpointObserver
  ) {
    // this.routerSubscription = router.events
    //   .pipe(filter((a) => a instanceof NavigationEnd))
    //   .subscribe((_) => (this.navbarOpen = false));

    this.isSmallScreen$ = breakpoints
      .observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map((breakpoint) => breakpoint.matches));
    this.isExtraSmallScreen$ = breakpoints
      .observe(`(max-width: ${EXTRA_SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map((breakpoint) => breakpoint.matches));
  }

  ngOnInit(): void {
    this.project$ = this.store.select(selectProjectState);
  }

  ngOnDestroy() {
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
  }

  public toggleSidenav(sidenav: MatSidenav): Promise<MatDrawerToggleResult> {
    return sidenav.toggle();
  }
}
