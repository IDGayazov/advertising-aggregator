import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Bell, MessageCircle, CreditCard, Building2 } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

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
  const color = read ? '#A0A0A0' : '#6E88F5';
  switch (type) {
    case 'order':
      return <Bell size={24} color={color} />;
    case 'message':
      return <MessageCircle size={24} color={color} />;
    case 'payment':
      return <CreditCard size={24} color={color} />;
    case 'venue':
      return <Building2 size={24} color={color} />;
    default:
      return <Bell size={24} color={color} />;
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Уведомления</Text>
        {notifications.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClearAll}
          >
            <Text style={styles.clearButtonText}>Очистить все</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>У вас нет уведомлений</Text>
          </View>
        ) : (
          notifications.map((notification, index) => (
            <TouchableOpacity
              key={notification.id}
              onPress={() => markAsRead(notification.id)}
            >
              <Animated.View
                entering={FadeInUp.delay(index * 100)}
                style={[
                  styles.card,
                  notification.read && styles.cardRead
                ]}
              >
                <View style={styles.cardHeader}>
                  <NotificationIcon type={notification.type} read={notification.read} />
                  <View style={styles.cardHeaderText}>
                    <Text style={[
                      styles.cardTitle,
                      notification.read && styles.cardTitleRead
                    ]}>
                      {notification.title}
                    </Text>
                    <Text style={styles.cardDate}>{notification.date}</Text>
                  </View>
                </View>
                <Text style={[
                  styles.cardMessage,
                  notification.read && styles.cardMessageRead
                ]}>
                  {notification.message}
                </Text>
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
    backgroundColor: '#F9FAFF',
  },
  header: {
    backgroundColor: '#FFF',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 28,
    color: '#333',
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  clearButtonText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: '#FF6B6B',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#6E88F5',
  },
  cardRead: {
    borderLeftColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardHeaderText: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  cardTitleRead: {
    color: '#666',
  },
  cardDate: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    color: '#999',
  },
  cardMessage: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  cardMessageRead: {
    color: '#999',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyStateText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});