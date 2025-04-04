export const COLORS = {
  primary: '#b48c2f', // золотисто-коричневый цвет с картинки
  primaryLight: '#e2d2a8',
  secondary: '#323232',
  text: '#323232',
  textLight: '#666666',
  white: '#FFFFFF',
  background: '#f8f5e6', // светло-кремовый, тусклый желтоватый
  card: '#FFFFFF',
  border: '#EEEEEE',
  error: '#FF5252',
  success: '#4CAF50',
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.text,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textLight,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.textLight,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  }
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  }
};

export const LAYOUT = {
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
    circle: 9999,
  },
  padding: {
    screen: SPACING.lg,
    card: SPACING.md,
  }
};

export const BUTTON_STYLES = {
  primary: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: LAYOUT.borderRadius.medium,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: LAYOUT.borderRadius.medium,
  }
}; 