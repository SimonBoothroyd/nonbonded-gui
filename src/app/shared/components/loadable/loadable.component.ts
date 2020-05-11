import { Component, Input, OnInit } from '@angular/core';

import { Loadable } from '@core/loadable/loadable';

@Component({
  selector: 'app-loadable',
  templateUrl: './loadable.component.html',
  styleUrls: ['./loadable.component.scss'],
})
export class LoadableComponent implements OnInit {
  @Input() loadable: Loadable;

  constructor() {}

  ngOnInit(): void {}
}
