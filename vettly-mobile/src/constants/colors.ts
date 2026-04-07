export const Colors = {
  light: {
    // Surfaces
    surface:                '#f7f9fb',
    background:             '#f7f9fb',
    surfaceContainer:       '#eceef0',
    surfaceContainerHigh:   '#e6e8ea',
    surfaceVariant:         '#e0e3e5',

    // Text
    onSurface:              '#191c1e',
    onSurfaceVariant:       '#45464d',
    onBackground:           '#191c1e',

    // Primary (monochrome — matches web design system)
    primary:                '#000000',
    onPrimary:              '#ffffff',
    primaryContainer:       '#111c2d',
    onPrimaryContainer:     '#79849a',

    // Action blue (mobile buttons — not yet in web system)
    actionPrimary:          '#1a56db',
    onActionPrimary:        '#ffffff',

    // Secondary (Smart Teal)
    secondary:              '#006a61',
    onSecondary:            '#ffffff',

    // Error
    error:                  '#ba1a1a',
    onError:                '#ffffff',

    // Borders
    outline:                '#76777d',
    outlineVariant:         '#c6c6cd',
  },
  dark: {
    // Surfaces
    surface:                '#0e1117',
    background:             '#0e1117',
    surfaceContainer:       '#1a1f26',
    surfaceContainerHigh:   '#242a31',
    surfaceVariant:         '#3c4249',

    // Text
    onSurface:              '#dfe3e8',
    onSurfaceVariant:       '#a0aab3',
    onBackground:           '#dfe3e8',

    // Primary (monochrome — matches web design system)
    primary:                '#ffffff',
    onPrimary:              '#0e1117',
    primaryContainer:       '#1e2c42',
    onPrimaryContainer:     '#bcc7de',

    // Action blue (mobile buttons)
    actionPrimary:          '#bcc7de',
    onActionPrimary:        '#0e1117',

    // Secondary (Smart Teal)
    secondary:              '#4ec7bc',
    onSecondary:            '#00201d',

    // Error
    error:                  '#ffb4ab',
    onError:                '#690005',

    // Borders
    outline:                '#5a6470',
    outlineVariant:         '#3a4149',
  },
} as const;

export type AppColors = typeof Colors.light;
export type ColorToken = keyof AppColors;
