import { StyleSheet } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    button: {
      borderWidth: 1,
      borderRadius: 12,
      padding: 14,
      alignItems: 'center' as const,
      marginTop: 8,
      borderColor: theme.outlineVariant,
    },
    errorText: {
      marginTop: 4,
      textAlign: 'center' as const,
    },
  });

  return { styles, theme };
}
