import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects-root.component.html',
  styleUrls: ['./projects-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsRootComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
