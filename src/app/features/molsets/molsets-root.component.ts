import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './molsets-root.component.html',
  styleUrls: ['./molsets-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoleculeSetsRootComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
