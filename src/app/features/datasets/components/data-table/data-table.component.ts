import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DataSetEntry } from '@core/store/dataset/dataset.interfaces';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit {
  dataRows: { [key: string]: string }[] = [];
  columns: string[] = [];

  @Input() set entries(value: DataSetEntry[]) {
    if (!value) {
      this.columns = [];
      this.dataRows = [];
      return;
    }

    const substanceSmiles = Object.keys(value[0].components).sort();

    this.columns = ['T (K)', 'p (kPa)'];

    substanceSmiles.forEach((smiles, i) => {
      if (i == substanceSmiles.length - 1) return;

      const component = value[0].components[smiles];

      if (component.role && component.role != 'Solvent') this.columns.push(`${i}`);
      if (component.moleFraction) this.columns.push(`x<sub>${i}</sub>`);
      if (component.exactAmount) this.columns.push(`n<sub>${i}</sub>`);
    });

    this.columns.push('value');

    this.dataRows = [];

    value.forEach((entry) => {
      const dataRow = {
        'T (K)': entry.temperature.toFixed(2).toString(),
        'p (kPa)': entry.pressure.toFixed(3).toString(),
        value: entry.value.toFixed(3).toString(),
      };

      substanceSmiles.forEach((smiles, i) => {
        if (i == substanceSmiles.length - 1) return;

        const component = entry.components[smiles];

        if (component.role && component.role != 'Solvent')
          dataRow[`${i}`] = component.role;
        if (component.exactAmount && component.exactAmount > 0)
          dataRow[`n<sub>${i}</sub>`] = component.exactAmount.toString();
        if (component.moleFraction && component.moleFraction > 0.0)
          dataRow[`x<sub>${i}</sub>`] = component.moleFraction.toFixed(3).toString();
      });

      this.dataRows.push(dataRow);
    });
  }

  constructor(public domSanitizer: DomSanitizer) {}

  ngOnInit(): void {}
}
