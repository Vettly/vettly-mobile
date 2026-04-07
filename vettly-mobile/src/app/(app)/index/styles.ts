import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    inner: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center' as const,
      gap: Spacing.two,
      padding: Spacing.four,
    },
    heading: {
      textAlign: 'center' as const,
    },
    badge: {
      marginTop: Spacing.one,
      paddingHorizontal: Spacing.three,
      paddingVertical: Spacing.one,
      borderRadius: Spacing.three,
      backgroundColor: theme.primaryContainer,
    },
  });

  return { styles, theme };
}
