import { Component, Input, OnInit } from '@angular/core';
import { RechargeTarget } from '@core/models/projects';

@Component({
  selector: 'app-recharge-target',
  templateUrl: './recharge-target.component.html',
  styleUrls: ['./recharge-target.component.scss'],
})
export class RechargeTargetComponent implements OnInit {
  @Input() target: RechargeTarget;

  constructor() {}

  ngOnInit(): void {}
}
