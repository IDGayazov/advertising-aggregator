import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Bell, MessageCircle, CreditCard, Building2 } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { COLORS, SHADOWS, SPACING, LAYOUT } from '../../../utils/theme';

// Начальные данные уведомлений
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Новый заказ подтвержден',
    message: 'Ваш заказ на размещение рекламы на Невском проспекте подтвержден',
    type: 'order', // order, message, payment, venue
    date: '2 часа назад',
    read: false,
  },
  {
    id: 2,
    title: 'Поступил новый платеж',
    message: 'Получен платеж на сумму 45 000 ₽',
    type: 'payment',
    date: '5 часов назад',
    read: true,
  },
  {
    id: 3,
    title: 'Новое сообщение',
    message: 'У вас новое сообщение от службы поддержки',
    type: 'message',
    date: '1 день назад',
    read: false,
  },
  {
    id: 4,
    title: 'Модерация площадки',
    message: 'Ваша рекламная площадка прошла модерацию',
    type: 'venue',
    date: '2 дня назад',
    read: true,
  },
];

const NotificationIcon = ({ type, read }: { type: string; read: boolean }) => {
  const color = read ? COLORS.textLight : COLORS.primary;
  switch (type) {
    case 'order':
      return <Bell size={22} color={color} />;
    case 'message':
      return <MessageCircle size={22} color={color} />;
    case 'payment':
      return <CreditCard size={22} color={color} />;
    case 'venue':
      return <Building2 size={22} color={color} />;
    default:
      return <Bell size={22} color={color} />;
  }
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const handleClearAll = () => {
    Alert.alert(
      'Очистить уведомления',
      'Вы уверены, что хотите очистить все уведомления?',
      [
        {
          text: 'Отмена',
          style: 'cancel'
        },
        {
          text: 'Очистить',
          style: 'destructive',
          onPress: () => setNotifications([])
        }
      ]
    );
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Уведомления</Text>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Обновления</Text>
          {unreadCount > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        {notifications.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClearAll}
          >
            <Text style={styles.clearButtonText}>Очистить все</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>У вас нет уведомлений</Text>
          </View>
        ) : (
          notifications.map((notification, index) => (
            <TouchableOpacity
              key={notification.id}
              onPress={() => markAsRead(notification.id)}
              activeOpacity={0.7}
            >
              <Animated.View
                entering={FadeInUp.delay(index * 100)}
                style={[
                  styles.card,
                  notification.read && styles.cardRead
                ]}
              >
                <View style={styles.cardIconContainer}>
                  <NotificationIcon type={notification.type} read={notification.read} />
                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <Text style={[
                      styles.cardTitle,
                      notification.read && styles.cardTitleRead
                    ]}>
                      {notification.title}
                    </Text>
                    <Text style={styles.cardDate}>{notification.date}</Text>
                  </View>
                  <Text style={[
                    styles.cardMessage,
                    notification.read && styles.cardMessageRead
                  ]}>
                    {notification.message}
                  </Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          ))
        )}
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
    marginBottom: SPACING.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginRight: SPACING.sm,
  },
  badgeContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  clearButton: {
    position: 'absolute',
    top: 60,
    right: SPACING.lg,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  clearButtonText: {
    fontSize: 14,
    color: COLORS.error,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.medium,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    ...SHADOWS.small,
  },
  cardRead: {
    backgroundColor: COLORS.background,
  },
  cardIconContainer: {
    marginRight: SPACING.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    marginBottom: SPACING.xs,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  cardTitleRead: {
    fontWeight: '600',
    color: COLORS.textLight,
  },
  cardDate: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  cardMessage: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  cardMessageRead: {
    color: COLORS.textLight,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});