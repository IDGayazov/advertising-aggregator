import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Clock, CircleCheck as CheckCircle2, XCircle, ChevronRight } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { COLORS, SHADOWS, SPACING, LAYOUT } from '../../../utils/theme';
import Button from '../../../components/Button';

// Начальные данные заказов
const INITIAL_ORDERS = [
  {
    id: 1,
    venueId: 1,
    title: 'Билборд на Чистопольской',
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
      return <Clock size={20} color={COLORS.primary} />;
    case 'approved':
      return <CheckCircle2 size={20} color={COLORS.success} />;
    case 'rejected':
      return <XCircle size={20} color={COLORS.error} />;
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
        {/* <Text style={styles.screenTitle}>Заказы</Text> */}
        <Text style={styles.title}>Мои рекламные кампании</Text>
        {/* {orders.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClearAll}
          >
            <Text style={styles.clearButtonText}>Очистить все</Text>
          </TouchableOpacity>
        )} */}
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {orders.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>У вас пока нет заказов</Text>
            <Button 
              title="Перейти в каталог" 
              onPress={() => router.push('/')}
              style={styles.emptyStateButton}
            />
          </View>
        ) : (
          orders.map((order, index) => (
            <Animated.View
              key={order.id}
              entering={FadeInUp.delay(index * 100)}
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <View style={styles.statusContainer}>
                  <StatusIcon status={order.status} />
                  <Text style={[
                    styles.statusText,
                    order.status === 'approved' && styles.statusApproved,
                    order.status === 'rejected' && styles.statusRejected,
                    order.status === 'pending' && styles.statusPending,
                  ]}>
                    {StatusText({ status: order.status })}
                  </Text>
                </View>
                <Text style={styles.cardTitle}>{order.title}</Text>
              </View>
              
              <View style={styles.cardContent}>
                <Text style={styles.cardDate}>{order.date}</Text>
                <Text style={styles.cardPrice}>{order.price}</Text>
              </View>
              
              {/* <TouchableOpacity 
                style={styles.detailsButton}
                onPress={() => router.push(`/venue-details?id=${order.venueId}`)}
              >
                <Text style={styles.detailsButtonText}>Подробнее</Text>
                <ChevronRight size={16} color={COLORS.primary} />
              </TouchableOpacity> */}
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
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
    ...SHADOWS.small,
  },
  cardHeader: {
    marginBottom: SPACING.md,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  cardContent: {
    marginBottom: SPACING.md,
  },
  cardDate: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  statusApproved: {
    color: COLORS.success,
  },
  statusRejected: {
    color: COLORS.error,
  },
  statusPending: {
    color: COLORS.primary,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    padding: SPACING.sm,
    borderRadius: LAYOUT.borderRadius.medium,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
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
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  emptyStateButton: {
    maxWidth: 200,
  }
});