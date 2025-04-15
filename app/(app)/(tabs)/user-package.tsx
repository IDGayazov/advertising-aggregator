import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Trash2, CalendarDays, MapPin, ShoppingBag, DollarSign } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { COLORS, SHADOWS, SPACING, LAYOUT } from '../../../utils/theme';
import { usePackage } from '../../../context/PackageContext';
import Button from '../../../components/Button';

export default function UserPackageScreen() {
  const router = useRouter();
  const { userPackage, removeFromPackage, packageTotalPrice } = usePackage();

  const handleRemove = (venueId: number) => {
    Alert.alert(
      'Удаление',
      'Вы уверены, что хотите удалить эту площадку из пакета?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', onPress: () => removeFromPackage(venueId), style: 'destructive' }
      ]
    );
  };

  const handleViewDetails = (venue: any) => {
    router.push({
      pathname: '/venue-details',
      params: {
        id: venue.id,
        title: venue.title,
        location: venue.location,
        description: venue.description,
        price: venue.price,
        category: venue.category,
        image: venue.image,
        startDate: venue.startDate,
        endDate: venue.endDate
      }
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Мой пакет</Text>
        <Text style={styles.subtitle}>
          {userPackage.length > 0
            ? `${userPackage.length} ${userPackage.length === 1 ? 'площадка' : 
               userPackage.length < 5 ? 'площадки' : 'площадок'} в вашем пакете`
            : 'Ваш пакет пуст'}
        </Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={
          userPackage.length === 0 ? styles.emptyContentContainer : styles.contentContainer
        }
      >
        {userPackage.length === 0 ? (
          <View style={styles.emptyState}>
            <ShoppingBag size={60} color={COLORS.textLight} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>В вашем пакете ещё нет рекламных площадок</Text>
            <Text style={styles.emptySubtext}>
              Добавляйте площадки из каталога, нажимая кнопку "Добавить в пакет"
            </Text>
            <Button 
              title="Перейти в каталог" 
              onPress={() => router.navigate('/(app)/(tabs)')}
              style={styles.catalogButton}
            />
          </View>
        ) : (
          <>
            {userPackage.map((venue, index) => (
              <Animated.View
                key={venue.id}
                entering={FadeInUp.delay(index * 100)}
                style={styles.venueCard}
              >
                <TouchableOpacity 
                  style={styles.cardContent}
                  onPress={() => handleViewDetails(venue)}
                >
                  <Image 
                    source={{ uri: venue.image }} 
                    style={styles.venueImage} 
                  />
                  <View style={styles.venueDetails}>
                    <Text style={styles.venueTitle}>{venue.title}</Text>
                    <View style={styles.venueLocationRow}>
                      <MapPin size={14} color={COLORS.textLight} />
                      <Text style={styles.venueLocation}>{venue.location}</Text>
                    </View>
                    
                    {venue.startDate && venue.endDate && (
                      <View style={styles.venueLocationRow}>
                        <CalendarDays size={14} color={COLORS.textLight} />
                        <Text style={styles.venueLocation}>
                          {formatDate(venue.startDate)} - {formatDate(venue.endDate)}
                        </Text>
                      </View>
                    )}
                    
                    <View style={styles.pricePill}>
                      <DollarSign size={12} color={COLORS.primary} />
                      <Text style={styles.priceText}>
                        {venue.price.toLocaleString()} ₽/мес
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => handleRemove(venue.id)}
                >
                  <Trash2 size={20} color={COLORS.error} />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </>
        )}
      </ScrollView>

      {userPackage.length > 0 && (
        <View style={styles.bottomBar}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Итого</Text>
            <Text style={styles.totalPrice}>{packageTotalPrice.toLocaleString()} ₽/мес</Text>
          </View>
          <Button 
            title="Оформить заказ" 
            onPress={() => {}}
            style={styles.orderButton}
          />
        </View>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.lg,
    paddingBottom: 100,
  },
  emptyContentContainer: {
    padding: SPACING.lg,
    flex: 1,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyIcon: {
    marginBottom: SPACING.md,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  catalogButton: {
    minWidth: 200,
  },
  venueCard: {
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.medium,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
  },
  venueImage: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.border,
  },
  venueDetails: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: 'space-between',
  },
  venueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  venueLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  venueLocation: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: SPACING.xs,
  },
  removeButton: {
    padding: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pricePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(180, 140, 47, 0.1)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs/2,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  priceText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...SHADOWS.medium,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  orderButton: {
    width: '100%',
  },
}); 