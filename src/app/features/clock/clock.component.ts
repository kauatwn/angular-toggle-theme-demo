import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClockDateComponent } from './components/clock-date/clock-date.component';
import { ClockTimeUnitComponent } from './components/clock-time-unit/clock-time-unit.component';

@Component({
  selector: 'app-clock',
  imports: [ClockDateComponent, ClockTimeUnitComponent],
  templateUrl: './clock.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockComponent {}
