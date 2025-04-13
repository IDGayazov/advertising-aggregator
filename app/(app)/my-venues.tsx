import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus, Calendar } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { COLORS, SPACING, LAYOUT, SHADOWS } from '../../utils/theme';

// Используем те же данные площадок, что и раньше
const MY_VENUES = [
  {
    id: 1,
    title: 'Билборд на Чистопольской',
    location: 'ул. Чистопольская',
    status: 'active', // active, pending, inactive
    image: 'https://img-fotki.yandex.ru/get/6/30348152.12e/0_64171_3eaba633_orig',
    startDate: '2023-05-01',
    endDate: '2023-07-31'
  },
  // Добавьте другие площадки...
];

export default function MyVenuesScreen() {
  const router = useRouter();

  // Форматируем даты
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Мои площадки</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/create')}
        >
          <Plus size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {MY_VENUES.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>У вас пока нет площадок</Text>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={() => router.push('/create')}
            >
              <Text style={styles.createButtonText}>Создать площадку</Text>
            </TouchableOpacity>
          </View>
        ) : (
          MY_VENUES.map((venue, index) => (
            <Animated.View
              key={venue.id}
              entering={FadeInRight.delay(index * 100)}
              style={styles.card}
            >
              <Image 
                source={{ uri: venue.image }}
                style={styles.venueImage}
                resizeMode="cover"
              />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.venueTitle}>{venue.title}</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: venue.status === 'active' ? COLORS.success : COLORS.primaryLight }
                  ]}>
                    <Text style={styles.statusText}>
                      {venue.status === 'active' ? 'Активно' : 'На модерации'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.venueLocation}>{venue.location}</Text>
                
                {venue.startDate && venue.endDate && (
                  <View style={styles.dateContainer}>
                    <Calendar size={16} color={COLORS.textLight} />
                    <Text style={styles.dateText}>
                      {formatDate(venue.startDate)} - {formatDate(venue.endDate)}
                    </Text>
                  </View>
                )}
                
                {/* <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => router.push(`/venue-details?id=${venue.id}`)}
                >
                  <Text style={styles.editButtonText}>Редактировать</Text>
                </TouchableOpacity> */}
              </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.small,
  },
  backButton: {
    padding: SPACING.sm,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: COLORS.text,
  },
  addButton: {
    padding: SPACING.sm,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    ...SHADOWS.small,
  },
  content: {
    padding: SPACING.lg,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xxl,
  },
  emptyStateText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: SPACING.lg,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: LAYOUT.borderRadius.medium,
    ...SHADOWS.small,
  },
  createButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: COLORS.white,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.large,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  venueImage: {
    height: 160,
    borderTopLeftRadius: LAYOUT.borderRadius.large,
    borderTopRightRadius: LAYOUT.borderRadius.large,
    width: '100%',
  },
  cardContent: {
    padding: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  venueTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: COLORS.text,
    flex: 1,
    marginRight: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: LAYOUT.borderRadius.circle,
  },
  statusText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: COLORS.white,
  },
  venueLocation: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  dateText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: SPACING.sm,
  },
  editButton: {
    backgroundColor: COLORS.background,
    padding: SPACING.sm,
    borderRadius: LAYOUT.borderRadius.medium,
    alignItems: 'center',
    marginTop: SPACING.xs,
    ...SHADOWS.small,
  },
  editButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: COLORS.primary,
  },
}); 