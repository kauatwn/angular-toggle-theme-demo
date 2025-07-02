import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClockService } from '../../services/clock.service';

@Component({
  selector: 'app-clock-time-unit',
  imports: [],
  templateUrl: './clock-time-unit.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockTimeUnitComponent {
  private readonly clockService = inject(ClockService);

  protected readonly time = this.clockService.time;
}
