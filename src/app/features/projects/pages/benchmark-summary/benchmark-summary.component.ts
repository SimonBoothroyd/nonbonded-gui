import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '@core/store';

import { BenchmarkState } from '@core/store/project/project.interfaces';
import { getCurrentBenchmarkState } from '@core/store/project/project.selectors';
import { Benchmark } from '@core/models/projects';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { DataSetCollectionState } from '@core/store/molecule-sets/molecule-sets.interfaces';
// import { getCurrentTestSets } from '@core/store/study-details/study-details.selectors';

@Component({
  selector: 'app-benchmark-summary',
  templateUrl: './benchmark-summary.component.html',
  styleUrls: ['./benchmark-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BenchmarkSummaryComponent implements OnInit {
  benchmark$: Observable<BenchmarkState>;

  // testSet$: Observable<DataSetCollectionState>;

  constructor(private store: Store<State>, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.benchmark$ = this.store.select(getCurrentBenchmarkState);
    // this.testSet$ = this.store.select(getCurrentTestSets);
  }

  forceFieldName(benchmark: Benchmark): string {
    if (benchmark.force_field.inner_content.toLowerCase().indexOf('xml') >= 0) {
      return 'force-field.offxml';
    } else {
      return 'force-field.json';
    }
  }

  forceFieldSrc(benchmark: Benchmark): SafeUrl {
    if (benchmark.force_field.inner_content.toLowerCase().indexOf('xml') >= 0) {
      return this.sanitizer.bypassSecurityTrustUrl(
        'data:text/xml;charset=utf-8,' +
          encodeURIComponent(benchmark.force_field.inner_content)
      );
    } else {
      return this.sanitizer.bypassSecurityTrustUrl(
        'data:text/json;charset=utf-8,' +
          encodeURIComponent(benchmark.force_field.inner_content)
      );
    }
  }
}
