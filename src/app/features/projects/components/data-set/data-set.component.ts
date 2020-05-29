import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DataSetEntry } from '@core/models/datasets';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataEntryDialogComponent } from '@app/features/projects/components/data-entry-dialog/data-entry-dialog.component';
import { strict } from 'assert';

export interface SubstanceDataSet {
  [substance: string]: DataSetEntry[];
}

export interface SelectedDataEntry {
  substance: string;
  entries: DataSetEntry[];
}

@Component({
  selector: 'app-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSetComponent implements OnInit {
  _dataSet: SubstanceDataSet = undefined;

  @Input()
  public title: string;

  @Input()
  public set value(value: SubstanceDataSet) {
    this.selectedEntry = undefined;
    this._dataSet = value;
  }

  @Input() nColumns: number = 10;

  @Output() selectedEntry: SelectedDataEntry = undefined;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private ref: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  openEntryDialog(substance: string, dataEntries: DataSetEntry[]) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      dataEntries: dataEntries,
      substance: substance,
    };

    this.dialog.open(DataEntryDialogComponent, dialogConfig);
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((state: BreakpointState) => this.updateColumns(state));
  }

  updateColumns(state: BreakpointState) {
    if (state.breakpoints[Breakpoints.XSmall]) this.nColumns = 2;
    else if (state.breakpoints[Breakpoints.Small]) this.nColumns = 4;
    else if (state.breakpoints[Breakpoints.Medium]) this.nColumns = 8;
    else if (state.breakpoints[Breakpoints.Large]) this.nColumns = 10;
    else if (state.breakpoints[Breakpoints.XLarge]) this.nColumns = 12;
    else this.nColumns = 1;

    this.ref.detectChanges();
  }
}
