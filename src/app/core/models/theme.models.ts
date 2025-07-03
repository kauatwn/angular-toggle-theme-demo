export const THEMES = ['light', 'dark', 'system'] as const;

export type UserTheme = (typeof THEMES)[number];
export type SystemTheme = Exclude<UserTheme, 'system'>;
