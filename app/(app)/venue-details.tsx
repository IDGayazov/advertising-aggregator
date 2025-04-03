import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Heart } from 'lucide-react-native';
import { COLORS, SPACING, LAYOUT, SHADOWS } from '../../utils/theme';
import Button from '../../components/Button';

const { width, height } = Dimensions.get('window');

type VenueParams = {
  id: string;
  title: string;
  location: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

export default function VenueDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams() as VenueParams;

  // Преобразуем цену из строки в число
  const price = parseInt(params.price || '0', 10);

  // Характеристики на основе категории
  const getSpecs = (category: string) => {
    switch (category) {
      case 'Билборды':
        return [
          { label: 'Размер', value: '6x3 м' },
          { label: 'Тип', value: 'Светодиодный' },
          { label: 'Стороны', value: '2' },
          { label: 'Трафик', value: '50k/день' },
        ];
      case 'Лифты':
        return [
          { label: 'Размер', value: 'A2' },
          { label: 'Тип', value: 'Плакат' },
          { label: 'Этажность', value: '25' },
          { label: 'Трафик', value: '1k/день' },
        ];
      case 'Автобусы':
        return [
          { label: 'Размер', value: '2x0.5 м' },
          { label: 'Тип', value: 'Наклейка' },
          { label: 'Маршрут', value: params.location || 'Н/Д' },
          { label: 'Трафик', value: '10k/день' },
        ];
      default:
        return [
          { label: 'Размер', value: 'Н/Д' },
          { label: 'Тип', value: 'Н/Д' },
          { label: 'Место', value: params.location || 'Н/Д' },
          { label: 'Трафик', value: 'Н/Д' },
        ];
    }
  };

  if (!params.image) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: params.image }} 
        style={styles.backgroundImage} 
        resizeMode="cover"
      />
      
      <View style={styles.overlay} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={COLORS.white} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.favoriteButton}>
          <Heart size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.titleHeader}>
        <Text style={styles.titleWhite}>{params.title}</Text>
        <View style={styles.locationContainerWhite}>
          <MapPin size={16} color={COLORS.white} />
          <Text style={styles.locationWhite}>{params.location}</Text>
        </View>
      </View>

      <View style={styles.bottomSheet}>
        <ScrollView style={styles.scrollContent}>
          <View style={styles.infoContainer}>
            <View style={styles.priceRow}>
              <Text style={styles.sectionTitle}>Подробно</Text>
              <View style={styles.priceTag}>
                <Text style={styles.priceText}>{price.toLocaleString()} ₽</Text>
              </View>
            </View>
            
            <Text style={styles.description}>{params.description}</Text>
            
            <Text style={styles.sectionTitle}>Характеристики</Text>
            <View style={styles.specsGrid}>
              {getSpecs(params.category || '').map((spec, index) => (
                <View key={index} style={styles.specItem}>
                  <Text style={styles.specLabel}>{spec.label}</Text>
                  <Text style={styles.specValue}>{spec.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          <Button 
            title="Забронировать" 
            onPress={() => {}} 
            style={styles.bookButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    zIndex: 1,
  },
  titleHeader: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    paddingHorizontal: SPACING.lg,
    zIndex: 1,
  },
  titleWhite: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  locationContainerWhite: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationWhite: {
    fontSize: 16,
    color: COLORS.white,
    marginLeft: SPACING.xs,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: height * 0.4,
    ...SHADOWS.medium,
  },
  scrollContent: {
    flex: 1,
    marginBottom: 80,
  },
  infoContainer: {
    padding: SPACING.lg,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  priceTag: {
    backgroundColor: 'rgba(180, 140, 47, 0.1)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: LAYOUT.borderRadius.small,
  },
  priceText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
    marginBottom: SPACING.lg,
  },
  specItem: {
    width: '50%',
    paddingHorizontal: SPACING.xs,
    marginBottom: SPACING.md,
  },
  specLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  specValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  bookButton: {
    height: 56,
  },
}); 