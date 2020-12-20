import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MOLECULE_IMAGE_ENDPOINT } from '@core/endpoints';

@Component({
  selector: 'app-data-set-section',
  templateUrl: './data-set-section.component.html',
  styleUrls: ['./data-set-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSetSectionComponent implements OnInit {
  public nColumns: number = 10;

  @Input() public value: string[] = [];
  @Output() selected = new EventEmitter<string>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((state: BreakpointState) => this.updateColumns(state));
  }

  imageEndpoint(smiles: string): string {
    return `${MOLECULE_IMAGE_ENDPOINT}/${encodeURI(smiles)}`;
  }

  updateColumns(state: BreakpointState) {
    if (state.breakpoints[Breakpoints.XSmall]) this.nColumns = 2;
    else if (state.breakpoints[Breakpoints.Small]) this.nColumns = 4;
    else if (state.breakpoints[Breakpoints.Medium]) this.nColumns = 6;
    else if (state.breakpoints[Breakpoints.Large]) this.nColumns = 8;
    else if (state.breakpoints[Breakpoints.XLarge]) this.nColumns = 10;
    else this.nColumns = 1;

    this.ref.detectChanges();
  }
}
