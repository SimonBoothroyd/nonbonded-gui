import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '@core/store';
import { getRouterInfo } from '@core/store/routes/route.selectors';
import { RouterStateUrl } from '@core/store/routes/route.serializer';
import { Observable } from 'rxjs';

interface TableLink {
  text: string;
  reference: string;
}

interface TableContents {
  title: string;
  links: TableLink[];
}

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOfContentsComponent {
  @Input() container: string;

  public routerState$: Observable<RouterStateUrl>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.routerState$ = this.store.select(getRouterInfo);
  }

  getBaseUrl(routerState: RouterStateUrl) {
    return routerState.url.split('#')[0];
  }

  getTableContents(): TableContents {
    const containerElement = document.getElementById(this.container);

    if (!containerElement) return { title: '', links: [] };

    const mainHeader = containerElement.querySelectorAll('h1')[0];
    const subHeaders = containerElement.querySelectorAll('h2');

    let links: TableLink[] = [];

    subHeaders.forEach((subHeaderElement) => {
      links.push({ text: subHeaderElement.innerText, reference: subHeaderElement.id });
    });

    return {
      title: mainHeader.innerText,
      links: links,
    };
  }
}
