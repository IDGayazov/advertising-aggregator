import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Clock } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'success',
    title: 'Заявка подтверждена',
    message: 'Ваша заявка на размещение рекламы на Невском проспекте одобрена',
    time: '2 часа назад',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Требуется действие',
    message: 'Необходимо обновить данные для размещения рекламы в ТЦ "Галерея"',
    time: '5 часов назад',
  },
  {
    id: 3,
    type: 'info',
    title: 'Новое предложение',
    message: 'Доступны новые рекламные места в категории "Лифты"',
    time: '1 день назад',
  },
];

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'success':
      return <CheckCircle2 size={24} color="#4ECDC4" />;
    case 'warning':
      return <AlertCircle size={24} color="#F5A623" />;
    case 'info':
      return <Clock size={24} color="#6E88F5" />;
    default:
      return <Bell size={24} color="#666" />;
  }
};

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Уведомления</Text>
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Очистить все</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {NOTIFICATIONS.map((notification, index) => (
          <Animated.View
            key={notification.id}
            entering={FadeInUp.delay(index * 100)}
            style={[
              styles.notificationCard,
              styles[`notification${notification.type}`],
            ]}
          >
            <View style={styles.notificationIcon}>
              <NotificationIcon type={notification.type} />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
          </Animated.View>
        ))}
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
    padding: 8,
  },
  clearButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#6E88F5',
  },
  content: {
    padding: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  notificationTime: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    color: '#999',
  },
  notificationsuccess: {
    borderLeftWidth: 4,
    borderLeftColor: '#4ECDC4',
  },
  notificationwarning: {
    borderLeftWidth: 4,
    borderLeftColor: '#F5A623',
  },
  notificationinfo: {
    borderLeftWidth: 4,
    borderLeftColor: '#6E88F5',
  },
});