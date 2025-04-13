import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Settings, LogOut, Building2, CreditCard, Bell, Shield, CircleHelp as HelpCircle, ChevronRight } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, SHADOWS, LAYOUT } from '../../../utils/theme';

const MENU_ITEMS = [
  {
    icon: Building2,
    title: 'Мои площадки',
    description: 'Управление рекламными местами',
    color: COLORS.primary,
  },
  // {
  //   icon: CreditCard,
  //   title: 'Платежи',
  //   description: 'История операций и счета',
  //   color: COLORS.primary,
  // },
  {
    icon: Bell,
    title: 'Уведомления',
    description: 'Настройка оповещений',
    color: COLORS.primary,
  },
  {
    icon: Shield,
    title: 'Безопасность',
    description: 'Пароль и доступ',
    color: COLORS.primary,
  },
  {
    icon: HelpCircle,
    title: 'Поддержка',
    description: 'Помощь и FAQ',
    color: COLORS.primary,
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
        {/* <Text style={styles.screenTitle}>Профиль</Text> */}
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop' }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Александр Петров</Text>
            <Text style={styles.userRole}>Рекламодатель</Text>
          </View>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => router.push('/profile-settings')}
          >
            <Settings size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Мой аккаунт</Text>
        
        {MENU_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <Animated.View
              key={item.title}
              entering={FadeInDown.delay(index * 70)}
            >
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => {
                  if (item.title === 'Мои площадки') {
                    router.push('/my-venues');
                  }
                }}
              >
                <View style={styles.iconContainer}>
                  <Icon size={22} color={COLORS.primary} />
                </View>
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemDescription}>{item.description}</Text>
                </View>
                <ChevronRight size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </Animated.View>
          );
        })}

        <View style={styles.divider} />

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={22} color={COLORS.error} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Выйти из аккаунта</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Версия 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...SHADOWS.small,
  },
  screenTitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 35,
    padding: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
    fontFamily: 'Manrope-Bold',
  },
  userRole: {
    fontSize: 14,
    color: COLORS.textLight,
    fontFamily: 'Manrope-Regular',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  content: {
    padding: SPACING.lg,
    marginTop: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
    fontFamily: 'Manrope-Bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: LAYOUT.borderRadius.medium,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    marginRight: SPACING.md,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
    fontFamily: 'Manrope-SemiBold',
  },
  menuItemDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    fontFamily: 'Manrope-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.lg,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: LAYOUT.borderRadius.medium,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  logoutIcon: {
    marginRight: SPACING.sm,
  },
  logoutText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: COLORS.error,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: SPACING.lg,
    fontFamily: 'Manrope-Regular',
  },
});