import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Clock, CircleCheck as CheckCircle2, Circle as XCircle } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

// Начальные данные заказов
const INITIAL_ORDERS = [
  {
    id: 1,
    venueId: 1,
    title: 'Билборд на Невском',
    status: 'pending',
    date: '15.02.2024 - 15.03.2024',
    price: '45 000 ₽',
  },
  {
    id: 2,
    venueId: 2,
    title: 'Реклама в лифтах ЖК "Солнечный"',
    status: 'approved',
    date: '01.03.2024 - 31.03.2024',
    price: '28 000 ₽',
  },
  {
    id: 3,
    venueId: 3,
    title: 'Реклама на автобусах',
    status: 'rejected',
    date: '10.03.2024 - 10.04.2024',
    price: '65 000 ₽',
  },
];

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending':
      return <Clock size={24} color="#F5A623" />;
    case 'approved':
      return <CheckCircle2 size={24} color="#4ECDC4" />;
    case 'rejected':
      return <XCircle size={24} color="#FF6B6B" />;
    default:
      return null;
  }
};

const StatusText = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending':
      return 'На согласовании';
    case 'approved':
      return 'Подтверждено';
    case 'rejected':
      return 'Отклонено';
    default:
      return '';
  }
};

export default function OrdersScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  const handleClearAll = () => {
    Alert.alert(
      'Очистить историю',
      'Вы уверены, что хотите очистить всю историю заказов?',
      [
        {
          text: 'Отмена',
          style: 'cancel'
        },
        {
          text: 'Очистить',
          style: 'destructive',
          onPress: () => setOrders([])
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Мои заказы</Text>
        {orders.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClearAll}
          >
            <Text style={styles.clearButtonText}>Очистить все</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content}>
        {orders.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>У вас пока нет заказов</Text>
          </View>
        ) : (
          orders.map((order, index) => (
            <Animated.View
              key={order.id}
              entering={FadeInUp.delay(index * 100)}
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{order.title}</Text>
                <StatusIcon status={order.status} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardDate}>{order.date}</Text>
                <Text style={styles.cardPrice}>{order.price}</Text>
                <Text style={[
                  styles.statusText,
                  order.status === 'approved' && styles.statusApproved,
                  order.status === 'rejected' && styles.statusRejected,
                  order.status === 'pending' && styles.statusPending,
                ]}>
                  {StatusText({ status: order.status })}
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.detailsButton}
                onPress={() => router.push(`/venue-details?id=${order.venueId}`)}
              >
                <Text style={styles.detailsButtonText}>Подробнее</Text>
              </TouchableOpacity>
            </Animated.View>
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
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  cardContent: {
    marginBottom: 15,
  },
  cardDate: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cardPrice: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#6E88F5',
    marginBottom: 10,
  },
  statusText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
  },
  statusApproved: {
    color: '#4ECDC4',
  },
  statusRejected: {
    color: '#FF6B6B',
  },
  statusPending: {
    color: '#F5A623',
  },
  detailsButton: {
    backgroundColor: '#F9FAFF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  detailsButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#6E88F5',
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