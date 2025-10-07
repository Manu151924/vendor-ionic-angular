import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-progress-slider',
  templateUrl: './progress-slider.component.html',
  styleUrls: ['./progress-slider.component.scss'],
  imports: [CommonModule,DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressSliderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  @Input() value = 0; // 0-1
  @Output() valueChange = new EventEmitter<number>();

  private dragging = false;

  get face(): string {
    if (this.value < 0.3) return '😞';
    if (this.value < 0.7) return '🙂';
    return '😄';
  }

  startDrag(event: MouseEvent) {
    this.dragging = true;
    this.updateValueFromEvent(event);
  }

  onDrag(event: MouseEvent) {
    if (!this.dragging) return;
    this.updateValueFromEvent(event);
  }

  endDrag() {
    this.dragging = false;
  }

  private updateValueFromEvent(event: MouseEvent) {
    const el = (event.currentTarget as HTMLElement);
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
    const newVal = +(x / rect.width).toFixed(3);
    this.value = newVal;
    this.valueChange.emit(this.value);
  }


}
