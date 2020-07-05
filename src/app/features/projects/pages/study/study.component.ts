import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { filter, withLatestFrom } from 'rxjs/operators';
import { StudyState } from '@core/store/project/project.interfaces';
import { getCurrentStudyState } from '@core/store/project/project.selectors';
import { Store } from '@ngrx/store';
import { State } from '@core/store';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyComponent implements OnInit, OnDestroy {
  public navbarOpen: boolean;

  public study$: Observable<StudyState>;
  private readonly routerSubscription: Subscription;

  constructor(private store: Store<State>, private router: Router) {
    this.navbarOpen = false;

    this.routerSubscription = router.events
      .pipe(filter((a) => a instanceof NavigationEnd))
      .subscribe((_) => (this.navbarOpen = false));
  }

  ngOnInit(): void {
    this.study$ = this.store.select(getCurrentStudyState);
  }

  ngOnDestroy() {
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
  }
}
