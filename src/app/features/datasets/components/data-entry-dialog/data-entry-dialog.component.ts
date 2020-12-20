import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MOLECULE_IMAGE_ENDPOINT } from '@core/endpoints';
import { DataSetEntry } from '@core/store/dataset/dataset.interfaces';

@Component({
  selector: 'app-data-entry-dialog',
  templateUrl: './data-entry-dialog.component.html',
  styleUrls: ['./data-entry-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataEntryDialogComponent implements OnInit {
  public substance: string;
  public dataEntries: DataSetEntry[];

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.dataEntries = data.dataEntries;
    this.substance = data.substance;
  }

  ngOnInit(): void {}

  imageEndpoint(smiles: string): string {
    return `${MOLECULE_IMAGE_ENDPOINT}/${encodeURI(smiles)}`;
  }

  dataTypes(): string[] {
    if (!this.dataEntries) return [];

    return Array.from(new Set(this.dataEntries.map((entry) => entry.dataType))).sort();
  }

  dataTypeEntries(dataType: string): DataSetEntry[] {
    if (!this.dataEntries) return [];

    return Array.from(
      new Set(this.dataEntries.filter((entry) => entry.dataType == dataType))
    );
  }

  mapComponents(value) {
    if (value.components === undefined) return '';
    return value.components.map((x) => x.mole_fraction.toFixed(3)).join(', ');
  }
}
