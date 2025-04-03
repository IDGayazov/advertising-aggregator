import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft, Building2, MessageSquare } from 'lucide-react-native';
import { validateEmail, validatePassword } from '../../utils/validation';

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
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color="#333" />
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
              color={selectedRole === 'advertiser' ? '#FFF' : '#6E88F5'} 
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
              color={selectedRole === 'owner' ? '#FFF' : '#6E88F5'} 
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

        {/* Существующие поля формы */}
        <View style={styles.inputGroup}>
          <View style={[
            styles.inputContainer,
            touched.name && errors.name && styles.inputError
          ]}>
            <User size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Имя"
              value={name}
              onChangeText={setName}
              onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
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
            <Mail size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
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
            <Lock size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Пароль"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? (
                <EyeOff size={20} color="#666" />
              ) : (
                <Eye size={20} color="#666" />
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
            <Lock size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Подтвердите пароль"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              onBlur={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
            />
            <TouchableOpacity 
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeButton}
            >
              {showConfirmPassword ? (
                <EyeOff size={20} color="#666" />
              ) : (
                <Eye size={20} color="#666" />
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
            (!name || !email || !password || !confirmPassword || !selectedRole) && 
            styles.registerButtonDisabled
          ]}
          onPress={handleRegister}
          disabled={!name || !email || !password || !confirmPassword || !selectedRole}
        >
          <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Уже есть аккаунт? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.loginLink}>Войти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9FAFF',
    padding: 20,
  },
  backButton: {
    marginTop: 60,
    marginBottom: 20,
    padding: 8,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 32,
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#666',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    marginLeft: 12,
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#333',
  },
  eyeButton: {
    padding: 8,
  },
  registerButton: {
    backgroundColor: '#6E88F5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  registerButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#FFF',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#6E88F5',
  },
  roleTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  roleButton: {
    flex: 1,
    backgroundColor: '#F0F4FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  roleButtonActive: {
    backgroundColor: '#6E88F5',
    borderColor: '#6E88F5',
  },
  roleText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#6E88F5',
    marginTop: 8,
    marginBottom: 4,
  },
  roleTextActive: {
    color: '#FFF',
  },
  roleDescription: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  roleDescriptionActive: {
    color: '#FFF',
  },
  registerButtonDisabled: {
    backgroundColor: '#A0A0A0',
    opacity: 0.5,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  errorText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    color: '#FF6B6B',
    marginTop: 4,
    marginLeft: 16,
  },
}); 