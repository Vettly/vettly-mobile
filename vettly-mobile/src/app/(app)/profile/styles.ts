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
    avatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
      justifyContent: 'center',
      alignItems: 'center' as const,
      marginBottom: Spacing.two,
      backgroundColor: theme.actionPrimary,
    },
    initials: {
      fontSize: 28,
      fontWeight: '700' as const,
      color: theme.onActionPrimary,
    },
    name: {
      marginTop: Spacing.one,
    },
    badge: {
      marginTop: Spacing.one,
      paddingHorizontal: Spacing.three,
      paddingVertical: Spacing.one,
      borderRadius: Spacing.three,
      backgroundColor: theme.primaryContainer,
    },
    logoutButton: {
      marginTop: Spacing.four,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: Spacing.five,
      alignItems: 'center' as const,
      backgroundColor: theme.error,
    },
    logoutText: {
      fontWeight: '700' as const,
      fontSize: 16,
      color: theme.onError,
    },
  });

  return { styles, theme };
}
