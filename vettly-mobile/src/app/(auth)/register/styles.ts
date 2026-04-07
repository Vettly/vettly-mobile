import { StyleSheet } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 24,
      backgroundColor: theme.background,
    },
    title: {
      marginBottom: 24,
    },
    input: {
      borderWidth: 1,
      borderRadius: 12,
      padding: 14,
      marginBottom: 12,
      fontSize: 15,
      borderColor: theme.outlineVariant,
      color: theme.onSurface,
    },
    roleRow: {
      flexDirection: 'row' as const,
      gap: 10,
      marginBottom: 12,
    },
    roleChip: {
      flex: 1,
      padding: 12,
      borderRadius: 10,
      borderWidth: 1,
      alignItems: 'center' as const,
      borderColor: theme.outlineVariant,
    },
    roleChipActive: {
      backgroundColor: theme.actionPrimary,
      borderColor: theme.actionPrimary,
    },
    errorMargin: {
      marginBottom: 8,
    },
    button: {
      borderRadius: 12,
      padding: 16,
      alignItems: 'center' as const,
      marginTop: 8,
      backgroundColor: theme.actionPrimary,
    },
    divider: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      marginVertical: 16,
      gap: 8,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.outlineVariant,
    },
    link: {
      textAlign: 'center' as const,
      marginTop: 16,
    },
  });

  return { styles, theme };
}
