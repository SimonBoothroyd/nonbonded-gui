import { Component, Input, OnInit } from '@angular/core';
import { Author } from '@core/models/projects';


interface ISummarised {
  name: string
  id: string

  description: string

  authors?: Author[]
}


@Component({
  selector: 'app-summary-card-list',
  templateUrl: './summary-card-list.component.html',
  styleUrls: ['./summary-card-list.component.scss'],
})
export class SummaryCardListComponent implements OnInit {
  @Input() title: string = '';
  @Input() baseLink: string = '';

  @Input() summaries: ISummarised[] = [];

  constructor() {}

  ngOnInit(): void {}

  authorList(summary: ISummarised): string {
    return summary.authors.map((author) => author.name).join(', ');
  }
}
