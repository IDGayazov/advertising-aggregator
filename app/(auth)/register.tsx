import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft, Building2, MessageSquare } from 'lucide-react-native';

type UserRole = 'advertiser' | 'owner' | null;

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const handleRegister = () => {
    // Здесь будет логика регистрации
    if (name && email && password && password === confirmPassword && selectedRole) {
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
        <View style={styles.inputContainer}>
          <User size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Имя"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Mail size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Lock size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
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

        <View style={styles.inputContainer}>
          <Lock size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
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

        <TouchableOpacity 
          style={[
            styles.registerButton,
            (!name || !email || !password || !confirmPassword || !selectedRole) && styles.registerButtonDisabled
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
}); 