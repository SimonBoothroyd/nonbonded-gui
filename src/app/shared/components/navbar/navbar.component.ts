import { Component, OnInit } from '@angular/core';
import { Author } from '@core/models/projects';

interface ISummarised {
  name?: string;
  id: string;

  description: string;

  authors?: Author[];
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
