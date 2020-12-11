import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { State } from '@core/store';
import { Observable, of, Subscription } from 'rxjs';
import { RouterStateUrl } from '@core/store/routes/route.serializer';
import { Router } from '@angular/router';
import { DataSetService } from '@core/services/dataset.service';
import { getRouterInfo } from '@core/store/routes/route.selectors';
import { catchError, flatMap, map, startWith, tap } from 'rxjs/operators';
import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';
import { DataSetCollection } from '@core/models/datasets';

interface DataSetCollectionState extends Loadable, DataSetCollection {}

@Component({
  selector: 'app-data-sets-list',
  templateUrl: './data-sets.component.html',
  styleUrls: ['./data-sets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSetsComponent implements OnInit {
  public routerInfo$: Observable<RouterStateUrl>;

  public isLoading: boolean;
  public dataSets$: Observable<DataSetCollectionState>;

  public readonly pageSize: number = 5;

  private routerSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private router: Router,
    private dataSetsService: DataSetService
  ) {}

  ngOnInit(): void {
    this.routerInfo$ = this.store.select(getRouterInfo);

    this.dataSets$ = this.routerInfo$.pipe(
      tap(() => {
        this.isLoading = true;
      }),
      flatMap((routerState) =>
        this.dataSetsService.readAll(routerState.queryParams.skip, this.pageSize)
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

  public emptyState(): DataSetCollectionState {
    return { ...createDefaultLoadable(), dataSets: [], metadata: undefined };
  }

  public onPageChanged(e) {
    this.router.navigate(['/datasets/phys-prop'], {
      queryParams: { skip: e.pageIndex },
    });
  }

  public getDataSetState(
    dataSetsState: DataSetCollectionState
  ): DataSetCollectionState {
    return { ...dataSetsState, loading: this.isLoading };
  }
}
