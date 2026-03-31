export type TemporalTheme = 'dawn' | 'day' | 'dusk' | 'midnight';

export class ThemeEngine {
  static getTemporalTheme(): TemporalTheme {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 10) return 'dawn';
    if (hour >= 10 && hour < 17) return 'day';
    if (hour >= 17 && hour < 20) return 'dusk';
    return 'midnight';
  }

  static getThemeVariables(theme: TemporalTheme) {
    const themes = {
      dawn: {
        '--temporal-accent': '#fdf2f8', // Soft pearl pink
        '--temporal-glow': 'rgba(251, 207, 232, 0.4)',
        '--temporal-bg-tint': 'rgba(253, 242, 248, 0.05)',
      },
      day: {
        '--temporal-accent': '#f0f9ff', // Clear sky blue
        '--temporal-glow': 'rgba(186, 230, 253, 0.4)',
        '--temporal-bg-tint': 'rgba(240, 249, 255, 0.05)',
      },
      dusk: {
        '--temporal-accent': '#fff7ed', // Soft sunset orange
        '--temporal-glow': 'rgba(254, 215, 170, 0.4)',
        '--temporal-bg-tint': 'rgba(255, 247, 237, 0.05)',
      },
      midnight: {
        '--temporal-accent': '#f5f3ff', // Obsidian violet
        '--temporal-glow': 'rgba(221, 214, 254, 0.3)',
        '--temporal-bg-tint': 'rgba(245, 243, 255, 0.05)',
      }
    };
    return themes[theme];
  }
}
