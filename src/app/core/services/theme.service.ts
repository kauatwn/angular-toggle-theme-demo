import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

const THEMES = ['light', 'dark', 'system'] as const;
export type Theme = (typeof THEMES)[number];
type SystemTheme = Exclude<Theme, 'system'>;

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private static readonly THEME_STORAGE_KEY = 'theme' as const;

  private readonly document = inject(DOCUMENT);
  private readonly userTheme = signal<Theme>(this.getInitialTheme());
  private readonly systemTheme = signal<SystemTheme>('light');

  readonly effectiveTheme = computed(() => {
    const theme = this.userTheme();
    return theme === 'system' ? this.systemTheme() : theme;
  });

  readonly isDarkMode = computed(() => this.effectiveTheme() === 'dark');
  readonly theme = this.userTheme.asReadonly();

  constructor() {
    this.initSystemThemeDetection();
    this.initThemeEffect();
  }

  setTheme(theme: Theme): void {
    this.userTheme.set(theme);
    this.saveThemeToStorage(theme);
  }

  toggleTheme(): void {
    const current = this.userTheme();
    if (current === 'system') {
      this.setTheme(this.systemTheme() === 'dark' ? 'light' : 'dark');
    } else {
      this.setTheme(current === 'dark' ? 'light' : 'dark');
    }
  }

  private getInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'system';

    const saved = localStorage.getItem(ThemeService.THEME_STORAGE_KEY);
    if (saved && this.isValidTheme(saved)) {
      return saved as Theme;
    }

    return 'system';
  }

  private isValidTheme(theme: string): theme is Theme {
    return THEMES.includes(theme as Theme);
  }

  private saveThemeToStorage(theme: Theme): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ThemeService.THEME_STORAGE_KEY, theme);
    }
  }

  private initSystemThemeDetection(): void {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.systemTheme.set(mediaQuery.matches ? 'dark' : 'light');

    mediaQuery.addEventListener('change', (event) => {
      this.systemTheme.set(event.matches ? 'dark' : 'light');
    });
  }

  private initThemeEffect(): void {
    effect(() => {
      const isDark = this.isDarkMode();
      const htmlElement = this.document.documentElement;

      htmlElement.classList.toggle('dark', isDark);
    });
  }
}
