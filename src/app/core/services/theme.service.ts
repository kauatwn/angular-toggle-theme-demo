import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { SystemTheme, THEMES, UserTheme } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private static readonly THEME_STORAGE_KEY = 'theme' as const;

  private readonly document = inject(DOCUMENT);
  private readonly userTheme = signal<UserTheme>(this.getInitialTheme());
  private readonly systemTheme = signal<SystemTheme>('light');

  readonly effectiveTheme = computed(() => {
    const theme = this.userTheme();
    return theme === 'system' ? this.systemTheme() : theme;
  });

  readonly isDarkMode = computed(() => this.effectiveTheme() === 'dark');
  readonly theme = this.userTheme.asReadonly();

  private readonly setupSystemThemeDetection = effect((onCleanup) => {
    this.systemTheme();

    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.systemTheme.set(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (event: MediaQueryListEvent) => {
      this.systemTheme.set(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);

    onCleanup(() => {
      if (mediaQuery) {
        mediaQuery.removeEventListener('change', handleChange);
      }
    });
  });

  private readonly setupThemeEffect = effect(() => {
    const isDark = this.isDarkMode();
    const htmlElement = this.document.documentElement;

    htmlElement.classList.toggle('dark', isDark);
  });

  setTheme(theme: UserTheme) {
    this.userTheme.set(theme);
    this.saveThemeToStorage(theme);
  }

  toggleTheme() {
    const current = this.userTheme();
    if (current === 'system') {
      this.setTheme(this.systemTheme() === 'dark' ? 'light' : 'dark');
    } else {
      this.setTheme(current === 'dark' ? 'light' : 'dark');
    }
  }

  private getInitialTheme(): UserTheme {
    if (typeof window === 'undefined') return 'system';

    const saved = localStorage.getItem(ThemeService.THEME_STORAGE_KEY);
    if (saved && this.isValidTheme(saved)) {
      return saved as UserTheme;
    }

    return 'system';
  }

  private isValidTheme(theme: string): boolean {
    return THEMES.includes(theme as UserTheme);
  }

  private saveThemeToStorage(theme: UserTheme): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ThemeService.THEME_STORAGE_KEY, theme);
    }
  }
}
