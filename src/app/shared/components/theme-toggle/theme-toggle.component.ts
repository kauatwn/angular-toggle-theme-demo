import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  LucideAngularModule,
  LucideIconData,
  Monitor,
  Moon,
  SunMedium,
} from 'lucide-angular';
import { ThemeService, UserTheme } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [LucideAngularModule],
  templateUrl: './theme-toggle.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);
  protected readonly currentTheme = this.themeService.theme;
  protected readonly effectiveTheme = this.themeService.effectiveTheme;

  private readonly iconMap = {
    light: { icon: SunMedium, hover: 'rotate-12' },
    dark: { icon: Moon, hover: '-rotate-12' },
    system: { icon: Monitor, hover: 'scale-110' },
  } as const satisfies Record<
    UserTheme,
    { icon: LucideIconData; hover: string }
  >;

  private readonly themeCycle = {
    light: 'dark',
    dark: 'system',
    system: 'light',
  } as const satisfies Record<UserTheme, UserTheme>;

  protected readonly currentIcon = computed(() => {
    const theme = this.currentTheme();
    return this.iconMap[theme];
  });

  protected toggleTheme(): void {
    this.themeService.setTheme(this.themeCycle[this.currentTheme()]);
  }

  protected setTheme(theme: UserTheme): void {
    this.themeService.setTheme(theme);
  }
}
