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

  onBackClicked() {
    let currentRoute = this.route;
    let previousRoute = currentRoute;

    while (currentRoute.children.length > 0) {
      previousRoute = currentRoute;
      currentRoute = currentRoute.children[0];
    }

    let relativeTo =
      currentRoute.url['value'] && currentRoute.url['value'].length > 0
        ? currentRoute
        : previousRoute;
    this.router.navigate(['..'], { relativeTo: relativeTo });
  }
}
