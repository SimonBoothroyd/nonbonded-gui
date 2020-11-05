import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './datasets-root.component.html',
  styleUrls: ['./datasets-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetsRootComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
