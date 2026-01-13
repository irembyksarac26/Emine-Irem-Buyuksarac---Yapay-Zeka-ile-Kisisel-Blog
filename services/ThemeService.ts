
/**
 * ThemeService follows SRP by being the single source of truth for the app's visual theme.
 */
export class ThemeService {
  private static STORAGE_KEY = 'blog_theme_mode';

  static getInitialMode(): 'light' | 'dark' {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  static saveMode(mode: 'light' | 'dark') {
    localStorage.setItem(this.STORAGE_KEY, mode);
  }

  static getColors(mode: 'light' | 'dark' = 'light') {
    const isDark = mode === 'dark';
    
    return {
      isDark,
      background: isDark ? '#1a1a2e' : '#ffffff', 
      cardBg: isDark ? '#16213e' : '#f8f9fa',
      text: isDark ? '#eaeaea' : '#333333',
      mutedText: isDark ? '#94a3b8' : '#666666',
      accent: '#8b5cf6', // Purple-500
      border: isDark ? '#2d2d44' : '#eeeeee',
      shadows: {
        header: isDark ? '0 2px 10px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.05)',
        card: isDark ? '0 10px 30px rgba(0,0,0,0.2)' : '0 10px 30px rgba(0,0,0,0.05)',
      },
      // Fix: Added missing gradients property to match usage in About.tsx and Contact.tsx
      gradients: {
        accent: isDark 
          ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' 
          : 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
      }
    };
  }

  static getDimensions() {
    return {
      profilePhotoSize: '200px',
      authorPhotoSize: '80px',
      blogMaxWidth: '680px',
      heroHeight: '400px'
    };
  }
}
