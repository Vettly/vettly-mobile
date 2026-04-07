import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { register } from '@/api/auth';
import { OAuthButton } from '@/components/oauth-button';
import { Text } from '@/components/text';
import { useAuthStore } from '@/stores/authStore';
import { UserRole } from '@/types/auth';
import { applyAuthResponse } from '@/utils/auth';
import { useStyles } from './styles';

export default function RegisterScreen() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { styles, theme } = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.Candidate);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOAuthSuccess = (_role: UserRole) => {
    router.replace('/(app)');
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await register({ firstName, lastName, email, password, role });
      applyAuthResponse(data, setAuth);
      router.replace('/(app)');
    } catch (e: any) {
      setError(
        e.response?.status === 409
          ? 'An account with this email already exists.'
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text type="Heading" style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor={theme.onSurfaceVariant}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor={theme.onSurfaceVariant}
        value={lastName}
        onChangeText={setLastName}
      />
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

      <View style={styles.roleRow}>
        {([UserRole.Candidate, UserRole.Recruiter] as UserRole[]).map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.roleChip, role === r && styles.roleChipActive]}
            onPress={() => setRole(r)}>
            <Text
              type="Label"
              color={role === r ? theme.onActionPrimary : theme.onSurfaceVariant}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {!!error && <Text type="BodySmall" color={theme.error} style={styles.errorMargin}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={theme.onActionPrimary} />
        ) : (
          <Text type="BodyBold" color={theme.onActionPrimary}>Create Account</Text>
        )}
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text type="Caption" color={theme.onSurfaceVariant}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <OAuthButton provider="google" mode="register" role={role} onSuccess={handleOAuthSuccess} />
      <OAuthButton provider="github" mode="register" role={role} onSuccess={handleOAuthSuccess} />

      <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
        <Text type="Link" color={theme.actionPrimary} style={styles.link}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
