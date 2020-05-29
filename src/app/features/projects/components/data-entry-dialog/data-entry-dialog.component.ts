import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSetEntry } from '@core/models/datasets';

@Component({
  selector: 'app-data-entry-dialog',
  templateUrl: './data-entry-dialog.component.html',
  styleUrls: ['./data-entry-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataEntryDialogComponent implements OnInit {
  public substance: string;
  public dataEntries: DataSetEntry[];

  public displayedColumns: string[] = ['temperature', 'pressure', 'components'];

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.dataEntries = data.dataEntries;
    this.substance = data.substance;
  }

  mapComponents(value) {
    if (value.components === undefined) return '';
    return value.components.map((x) => x.mole_fraction.toFixed(3)).join(', ');
  }

  ngOnInit(): void {}
}
