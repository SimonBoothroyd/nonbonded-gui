import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyComponent implements OnInit {
  public navbarOpen: boolean;

  constructor() {
    this.navbarOpen = false;
  }

  ngOnInit(): void {}
}
