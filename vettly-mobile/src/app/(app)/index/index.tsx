import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/stores/authStore';
import { UserRole } from '@/types/auth';
import { useStyles } from './styles';

export default function DashboardScreen() {
  const user = useAuthStore((s) => s.user);
  const { styles } = useStyles();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.inner}>
        <ThemedText type="title" style={styles.heading}>
          {user?.role === UserRole.Recruiter
            ? 'Recruiter Dashboard'
            : 'Candidate Dashboard'}
        </ThemedText>
        <ThemedText themeColor="onSurfaceVariant">
          Welcome, {user?.firstName} {user?.lastName}
        </ThemedText>
        <View style={styles.badge}>
          <ThemedText type="small">
            {user?.role === UserRole.Recruiter ? 'Recruiter' : 'Candidate'}
          </ThemedText>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
