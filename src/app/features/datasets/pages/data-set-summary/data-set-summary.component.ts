import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { State } from '@core/store';
import { Observable } from 'rxjs';
import {
  getDataTypeFilters,
  getFilteredDataSet,
} from '@core/store/dataset/dataset.selectors';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DataSetState } from '@core/store/dataset/dataset.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterStateUrl } from '@core/store/routes/route.serializer';
import { getRouterInfo } from '@core/store/routes/route.selectors';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataEntryDialogComponent } from '@app/features/datasets/components/data-entry-dialog/data-entry-dialog.component';

@Component({
  selector: 'app-data-set-summary',
  templateUrl: './data-set-summary.component.html',
  styleUrls: ['./data-set-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSetSummaryComponent implements OnInit {
  readonly PAGE_SIZE = 25;

  routerInfo$: Observable<RouterStateUrl>;
  dataSet$: Observable<DataSetState>;
  dataTypeFilters$: Observable<string[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<State>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSet$ = this.store.select(getFilteredDataSet);
    this.dataTypeFilters$ = this.store.select(getDataTypeFilters);
    this.routerInfo$ = this.store.select(getRouterInfo);
  }

  public nEntries(dataSet: DataSetState): number {
    return Object.keys(dataSet.entries).length;
  }

  public pageIndex(routerInfo: RouterStateUrl): number {
    return parseInt(!routerInfo.queryParams.page ? 0 : routerInfo.queryParams.page);
  }

  public paginatedEntries(dataSet: DataSetState, routerInfo: RouterStateUrl): string[] {
    const pageIndex = this.pageIndex(routerInfo);

    return Object.keys(dataSet.entries)
      .sort((a, b) => a.lastIndexOf(' + ') - b.lastIndexOf(' + ') || a.localeCompare(b))
      .slice(pageIndex * this.PAGE_SIZE, (pageIndex + 1) * this.PAGE_SIZE);
  }

  public openEntryDialog(substance: string, dataSet: DataSetState) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      dataEntries: dataSet.entries[substance],
      substance: substance,
    };

    this.dialog.open(DataEntryDialogComponent, dialogConfig);
  }

  public cleanupText(text: string): string {
    return text.replace(/  +/g, ' ');
  }

  public onToggleFilter(
    dataType: string,
    routerInfo: RouterStateUrl,
    e: MatCheckboxChange
  ) {
    const filters = !routerInfo.queryParams.types
      ? []
      : routerInfo.queryParams.types.split(',');

    if (!e.checked) filters.splice(filters.indexOf(dataType), 1);
    else filters.push(dataType);

    const typeParams = { types: filters.length > 0 ? filters.join(',') : null };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: typeParams,
    });
  }

  public onPageChanged(routerInfo: RouterStateUrl, e) {
    const queryParams = { page: !e.pageIndex ? null : e.pageIndex };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...routerInfo.queryParams, ...queryParams },
    });
  }
}
