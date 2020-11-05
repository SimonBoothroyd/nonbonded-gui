import { Component, Input, OnInit } from '@angular/core';
import { Project } from '@core/models/projects';
import { DataSet } from '@core/models/datasets';

@Component({
  selector: 'app-summary-card-list',
  templateUrl: './summary-card-list.component.html',
  styleUrls: ['./summary-card-list.component.scss'],
})
export class SummaryCardListComponent implements OnInit {
  @Input() title: string = '';
  @Input() baseLink: string = '';

  @Input() summaries: (DataSet | Project)[] = [];

  constructor() {}

  ngOnInit(): void {}

  authorList(summary: DataSet | Project): string {
    return summary.authors.map((author) => author.name).join(', ');
  }
}
