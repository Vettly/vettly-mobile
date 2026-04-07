import { Text as RNText, type TextProps } from 'react-native';

import { typography, type TextVariant } from '@/constants/typography';
import { useTheme } from '@/hooks/use-theme';

type Props = TextProps & {
  type?: TextVariant;
  color?: string;
};

export function Text({ type = 'Body', color, style, ...rest }: Props) {
  const theme = useTheme();
  const variant = typography[type];

  return (
    <RNText
      style={[variant, { color: color ?? theme.onSurface }, style]}
      {...rest}
    />
  );
}
