import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { logout } from '@/api/auth';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/stores/authStore';
import { useStyles } from './styles';

export default function ProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logoutStore = useAuthStore((s) => s.logout);
  const { styles } = useStyles();

  const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // ignore — server logout errors shouldn't block client logout
    } finally {
      logoutStore();
      router.replace('/(auth)/login');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.inner}>
        <ThemedView style={styles.avatar}>
          <ThemedText style={styles.initials}>{initials}</ThemedText>
        </ThemedView>

        <ThemedText type="subtitle" style={styles.name}>
          {user?.firstName} {user?.lastName}
        </ThemedText>
        <ThemedText themeColor="onSurfaceVariant">{user?.email}</ThemedText>

        <ThemedView style={styles.badge}>
          <ThemedText type="small">
            {user?.role === 'recruiter' ? 'Recruiter' : 'Candidate'}
          </ThemedText>
        </ThemedView>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <ThemedText style={styles.logoutText}>Log Out</ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    </ThemedView>
  );
}
