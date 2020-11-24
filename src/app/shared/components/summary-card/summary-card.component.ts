import { Component, Input, OnInit } from '@angular/core';
import { Author } from '@core/models/projects';

interface ISummarised {
  name?: string;
  id: string;

  description: string;

  authors?: Author[];
}

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
})
export class SummaryCardComponent implements OnInit {
  @Input() baseLink: string = '';
  @Input() summary: ISummarised;

  constructor() {}

  ngOnInit(): void {}

  authorList(): string {
    return this.summary.authors.map((author) => author.name).join(', ');
  }
}
