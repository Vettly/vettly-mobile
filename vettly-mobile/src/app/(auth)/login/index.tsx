import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { login } from '@/api/auth';
import { OAuthButton } from '@/components/oauth-button';
import { Text } from '@/components/text';
import { useAuthStore } from '@/stores/authStore';
import type { UserRole } from '@/types/auth';
import { applyAuthResponse } from '@/utils/auth';
import { useStyles } from './styles';

export default function LoginScreen() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { styles, theme } = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOAuthSuccess = (_role: UserRole) => {
    router.replace('/(app)');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await login({ email, password });
      applyAuthResponse(data, setAuth);
      router.replace('/(app)');
    } catch (e: any) {
      setError(
        e.response?.status === 401
          ? 'Invalid email or password.'
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text type="Heading" style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={theme.onSurfaceVariant}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={theme.onSurfaceVariant}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {!!error && <Text type="BodySmall" color={theme.error} style={styles.errorMargin}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={theme.onActionPrimary} />
        ) : (
          <Text type="BodyBold" color={theme.onActionPrimary}>Sign In</Text>
        )}
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text type="Caption" color={theme.onSurfaceVariant}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <OAuthButton provider="google" mode="login" onSuccess={handleOAuthSuccess} />
      <OAuthButton provider="github" mode="login" onSuccess={handleOAuthSuccess} />

      <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
        <Text type="Link" color={theme.actionPrimary} style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}
