import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  imports:[NgxChartsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  @Input() data: { name: string; value: number }[] = [];
  @Input() arcWidth = 0.5;
  @Input() view: [number, number] = [120, 120];

  colorScheme: Color = {
    name: 'pieScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#06B4A2', '#FF8A0D']
  };

}
