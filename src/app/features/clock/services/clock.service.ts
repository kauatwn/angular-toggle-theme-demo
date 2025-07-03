import { computed, effect, Injectable, signal } from '@angular/core';
import { ClockDate, ClockTime } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ClockService {
  private readonly currentTime = signal(new Date());

  // Effect como propriedade - abordagem moderna e declarativa
  private readonly clockTicker = effect((onCleanup) => {
    // Reagir ao signal currentTime para garantir execução
    this.currentTime();

    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      this.currentTime.set(new Date());
    }, 1000);

    // Cleanup function seguindo a documentação oficial do Angular
    onCleanup(() => {
      clearInterval(intervalId);
    });
  });

  readonly time = computed<ClockTime>(() => {
    const date = this.currentTime();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return {
      hours: String(hours % 12 || 12).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      dayPeriod: hours >= 12 ? 'PM' : 'AM',
      isoString: date.toISOString(),
    } as const satisfies ClockTime;
  });

  readonly date = computed<ClockDate>(() => {
    const currentDate = this.currentTime();

    const dayName = currentDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
    });

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = currentDate.toLocaleDateString('pt-BR', { month: 'long' });
    const year = String(currentDate.getFullYear());

    const fullDate = currentDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return {
      dayName,
      day,
      month,
      year,
      fullDate,
      isoString: currentDate.toISOString().split('T')[0],
    } as const satisfies ClockDate;
  });
}
