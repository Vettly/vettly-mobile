import { Redirect } from 'expo-router';

import AppTabs from '@/components/app-tabs';
import { useAuthStore } from '@/stores/authStore';

export default function AppLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) return <Redirect href="/(auth)/login" />;

  return <AppTabs />;
}
