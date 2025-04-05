import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { validateEmail } from '../../utils/validation';
import { COLORS, SPACING, LAYOUT, SHADOWS, TYPOGRAPHY } from '../../utils/theme';

interface ValidationErrors {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const validateForm = () => {
    const newErrors: ValidationErrors = {
      email: '',
      password: '',
    };

    if (!validateEmail(email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!password) {
      newErrors.password = 'Введите пароль';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleLogin = () => {
    const allTouched = {
      email: true,
      password: true,
    };
    setTouched(allTouched);

    if (validateForm()) {
      router.replace('/(app)/(tabs)');
    }
  };

  return (
    <>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Добро пожаловать</Text>
          <Text style={styles.subtitle}>Войдите в свой аккаунт, чтобы продолжить</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <View style={[
              styles.inputContainer,
              touched.email && errors.email && styles.inputError
            ]}>
              <Mail size={20} color={COLORS.textLight} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                placeholderTextColor={COLORS.textLight}
              />
            </View>
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <View style={[
              styles.inputContainer,
              touched.password && errors.password && styles.inputError
            ]}>
              <Lock size={20} color={COLORS.textLight} />
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                placeholderTextColor={COLORS.textLight}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? (
                  <EyeOff size={20} color={COLORS.textLight} />
                ) : (
                  <Eye size={20} color={COLORS.textLight} />
                )}
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Забыли пароль?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Войти</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Еще нет аккаунта? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text style={styles.registerLink}>Зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 28,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.medium,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.md,
    marginLeft: SPACING.sm,
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: COLORS.text,
  },
  eyeButton: {
    padding: SPACING.sm,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.lg,
  },
  forgotPasswordText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: COLORS.primary,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: LAYOUT.borderRadius.medium,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  loginButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: COLORS.white,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  registerText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: COLORS.textLight,
  },
  registerLink: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: COLORS.primary,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    color: COLORS.error,
    marginTop: 4,
    marginLeft: SPACING.md,
  },
});