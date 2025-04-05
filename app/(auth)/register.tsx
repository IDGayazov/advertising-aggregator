import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft, Building2, MessageSquare } from 'lucide-react-native';
import { validateEmail, validatePassword } from '../../utils/validation';
import { COLORS, SPACING, LAYOUT, SHADOWS, TYPOGRAPHY } from '../../utils/theme';

type UserRole = 'advertiser' | 'owner' | null;

interface ValidationErrors {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [errors, setErrors] = useState<ValidationErrors>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
  });

  const validateForm = () => {
    const newErrors: ValidationErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    };

    if (!name.trim()) {
      newErrors.name = 'Введите имя';
    }

    if (!validateEmail(email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов, букву и цифру';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleRegister = () => {
    const allTouched = {
      email: true,
      password: true,
      confirmPassword: true,
      name: true,
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
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Создание аккаунта</Text>
          <Text style={styles.subtitle}>Заполните данные для регистрации</Text>
        </View>

        <View style={styles.form}>
          {/* Выбор роли */}
          <Text style={styles.roleTitle}>Выберите роль</Text>
          <View style={styles.roleContainer}>
            <TouchableOpacity 
              style={[
                styles.roleButton,
                selectedRole === 'advertiser' && styles.roleButtonActive
              ]}
              onPress={() => setSelectedRole('advertiser')}
            >
              <MessageSquare 
                size={24} 
                color={selectedRole === 'advertiser' ? COLORS.white : COLORS.primary} 
              />
              <Text style={[
                styles.roleText,
                selectedRole === 'advertiser' && styles.roleTextActive
              ]}>
                Рекламодатель
              </Text>
              <Text style={[
                styles.roleDescription,
                selectedRole === 'advertiser' && styles.roleDescriptionActive
              ]}>
                Размещайте рекламу
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.roleButton,
                selectedRole === 'owner' && styles.roleButtonActive
              ]}
              onPress={() => setSelectedRole('owner')}
            >
              <Building2 
                size={24} 
                color={selectedRole === 'owner' ? COLORS.white : COLORS.primary} 
              />
              <Text style={[
                styles.roleText,
                selectedRole === 'owner' && styles.roleTextActive
              ]}>
                Владелец площадки
              </Text>
              <Text style={[
                styles.roleDescription,
                selectedRole === 'owner' && styles.roleDescriptionActive
              ]}>
                Сдавайте площадки
              </Text>
            </TouchableOpacity>
          </View>

          {/* Поля формы */}
          <View style={styles.inputGroup}>
            <View style={[
              styles.inputContainer,
              touched.name && errors.name && styles.inputError
            ]}>
              <User size={20} color={COLORS.textLight} />
              <TextInput
                style={styles.input}
                placeholder="Имя"
                value={name}
                onChangeText={setName}
                onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                placeholderTextColor={COLORS.textLight}
              />
            </View>
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
          </View>

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

          <View style={styles.inputGroup}>
            <View style={[
              styles.inputContainer,
              touched.confirmPassword && errors.confirmPassword && styles.inputError
            ]}>
              <Lock size={20} color={COLORS.textLight} />
              <TextInput
                style={styles.input}
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                onBlur={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
                placeholderTextColor={COLORS.textLight}
              />
              <TouchableOpacity 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeButton}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color={COLORS.textLight} />
                ) : (
                  <Eye size={20} color={COLORS.textLight} />
                )}
              </TouchableOpacity>
            </View>
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          <TouchableOpacity 
            style={[
              styles.registerButton,
              (!selectedRole || !name || !email || !password || !confirmPassword) && styles.registerButtonDisabled
            ]}
            onPress={handleRegister}
            disabled={!selectedRole || !name || !email || !password || !confirmPassword}
          >
            <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Уже есть аккаунт? </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Text style={styles.loginLink}>Войти</Text>
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
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 28,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: COLORS.textLight,
  },
  form: {
    width: '100%',
  },
  roleTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  roleButton: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.medium,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  roleButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: COLORS.text,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  roleTextActive: {
    color: COLORS.white,
  },
  roleDescription: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  roleDescriptionActive: {
    color: COLORS.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.medium,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
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
  registerButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: LAYOUT.borderRadius.medium,
    alignItems: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  registerButtonDisabled: {
    backgroundColor: COLORS.primaryLight,
    opacity: 0.7,
  },
  registerButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: COLORS.white,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  loginText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: COLORS.textLight,
  },
  loginLink: {
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