import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Settings, LogOut, Building2, CreditCard, Bell, Shield, CircleHelp as HelpCircle } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const MENU_ITEMS = [
  {
    icon: Building2,
    title: 'Мои площадки',
    description: 'Управление рекламными местами',
    color: '#6E88F5',
  },
  {
    icon: CreditCard,
    title: 'Платежи',
    description: 'История операций и счета',
    color: '#4ECDC4',
  },
  {
    icon: Bell,
    title: 'Уведомления',
    description: 'Настройка оповещений',
    color: '#F5A623',
  },
  {
    icon: Shield,
    title: 'Безопасность',
    description: 'Пароль и доступ',
    color: '#FF6B6B',
  },
  {
    icon: HelpCircle,
    title: 'Поддержка',
    description: 'Помощь и FAQ',
    color: '#A0A0A0',
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Выход из аккаунта',
      'Вы уверены, что хотите выйти?',
      [
        {
          text: 'Отмена',
          style: 'cancel'
        },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: () => {
            // Здесь можно добавить очистку токена авторизации
            router.replace('/(auth)/login');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop' }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Александр Петров</Text>
            <Text style={styles.userRole}>Рекламодатель</Text>
          </View>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => router.push('/profile-settings')}
          >
            <Settings size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {MENU_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <Animated.View
              key={item.title}
              entering={FadeInDown.delay(index * 100)}
            >
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => {
                  if (item.title === 'Мои площадки') {
                    router.push('/my-venues');
                  }
                }}
              >
                <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                  <Icon size={24} color={item.color} />
                </View>
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemDescription}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={24} color="#FF6B6B" />
          <Text style={styles.logoutText}>Выйти из аккаунта</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFF',
  },
  header: {
    backgroundColor: '#FFF',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: '#333',
    marginBottom: 4,
  },
  userRole: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#666',
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 40,
  },
  logoutText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#FF6B6B',
    marginLeft: 8,
  },
});