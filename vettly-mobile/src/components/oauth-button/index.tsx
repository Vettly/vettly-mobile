import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Text } from '@/components/text';
import { useAuthStore } from '@/stores/authStore';
import type { UserRole } from '@/types/auth';
import { applyOAuthToken } from '@/utils/auth';
import { useStyles } from './styles';

WebBrowser.maybeCompleteAuthSession();

const BASE_URL = process.env.EXPO_PUBLIC_AUTH_API_URL;

interface OAuthButtonProps {
  readonly provider: 'google' | 'github';
  readonly mode: 'login' | 'register';
  readonly role?: UserRole;
  readonly onSuccess: (role: UserRole) => void;
}

export function OAuthButton({ provider, mode, role, onSuccess }: OAuthButtonProps) {
  const { setAuth } = useAuthStore();
  const { styles, theme } = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePress = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ redirect: 'mobile', mode });
      if (role) params.set('role', role);

      const redirectUri = Linking.createURL('auth/callback');
      const result = await WebBrowser.openAuthSessionAsync(
        `${BASE_URL}/api/auth/${provider}?${params}`,
        redirectUri
      );

      if (result.type !== 'success') return;

      const parsed = Linking.parse(result.url);
      const token = parsed.queryParams?.token as string | undefined;

      if (!token) {
        setError('Authentication failed. Please try again.');
        return;
      }

      applyOAuthToken(token, setAuth);
      const payload = JSON.parse(atob(token.split('.')[1]));
      onSuccess(payload.role as UserRole);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const label = provider === 'google' ? 'Continue with Google' : 'Continue with GitHub';

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handlePress} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={theme.actionPrimary} />
        ) : (
          <Text type="BodyBold" color={theme.onSurface}>{label}</Text>
        )}
      </TouchableOpacity>
      {!!error && (
        <Text type="Caption" color={theme.error} style={styles.errorText}>{error}</Text>
      )}
    </>
  );
}
