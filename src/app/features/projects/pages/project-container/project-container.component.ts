import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProjectState } from '@core/store/project/project.interfaces';
import { selectProjectState } from '@core/store/project/project.selectors';
import { Store } from '@ngrx/store';
import { State } from '@core/store';

@Component({
  selector: 'app-study',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectContainerComponent implements OnInit, OnDestroy {
  public navbarOpen: boolean;

  public project$: Observable<ProjectState>;
  private readonly routerSubscription: Subscription;

  constructor(private store: Store<State>, private router: Router) {
    this.navbarOpen = true;

    this.routerSubscription = router.events
      .pipe(filter((a) => a instanceof NavigationEnd))
      .subscribe((_) => (this.navbarOpen = false));
  }

  ngOnInit(): void {
    this.project$ = this.store.select(selectProjectState);
  }

  ngOnDestroy() {
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
  }
}
