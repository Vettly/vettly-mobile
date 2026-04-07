import { PixelRatio } from 'react-native';

const sp = (n: number) => PixelRatio.roundToNearestPixel(n);

export const scale = {
  sc10: sp(10),
  sc12: sp(12),
  sc13: sp(13),
  sc14: sp(14),
  sc15: sp(15),
  sc16: sp(16),
  sc18: sp(18),
  sc20: sp(20),
  sc22: sp(22),
  sc24: sp(24),
  sc28: sp(28),
  sc32: sp(32),
  sc36: sp(36),
  sc48: sp(48),
} as const;
