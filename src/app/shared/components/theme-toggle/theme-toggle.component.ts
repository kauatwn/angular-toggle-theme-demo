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
import { UserTheme } from '../../../core/models';
import { ThemeService } from '../../../core/services/theme/theme.service';

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
    light: { icon: SunMedium, hoverClass: 'group-hover:rotate-12' },
    dark: { icon: Moon, hoverClass: 'group-hover:-rotate-12' },
    system: { icon: Monitor, hoverClass: 'group-hover:scale-110' },
  } as const satisfies Record<
    UserTheme,
    { icon: LucideIconData; hoverClass: string }
  >;

  protected readonly currentIcon = computed(() => {
    const theme = this.currentTheme();
    return this.iconMap[theme];
  });

  protected readonly iconClasses = computed(() => {
    const baseClasses = 'h-5 w-5 transition-transform duration-200';
    const hoverClass = this.currentIcon().hoverClass;
    return `${baseClasses} ${hoverClass}`;
  });

  protected readonly ariaLabel = computed(() => {
    const theme = this.currentTheme();
    return `Alternar tema. Tema atual: ${theme}`;
  });

  protected toggleTheme(): void {
    this.themeService.cycleTheme();
  }
}
