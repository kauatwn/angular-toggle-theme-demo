import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClockService } from '../../services/clock.service';

@Component({
  selector: 'app-clock-date',
  imports: [],
  templateUrl: './clock-date.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockDateComponent {
  private readonly clockService = inject(ClockService);

  protected readonly date = this.clockService.date;
}
