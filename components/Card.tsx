import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS, SHADOWS, LAYOUT, SPACING, TYPOGRAPHY } from '../utils/theme';
import { Star, Calendar } from 'lucide-react-native';

interface CardProps {
  title: string;
  image: string;
  price: number | string;
  location?: string;
  rating?: number;
  reviews?: number;
  startDate?: string;
  endDate?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export default function Card({
  title,
  image,
  price,
  location,
  rating,
  reviews,
  startDate,
  endDate,
  style,
  onPress,
}: CardProps) {
  // Преобразуем цену в строку с правильным форматированием
  const formattedPrice = typeof price === 'number' ? `₽${price.toLocaleString()}` : price;

  // Форматируем даты
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={!onPress}
    >
      <Image source={{ uri: image }} style={styles.image} />
      
      <View style={styles.content}>
        {rating && (
          <View style={styles.ratingContainer}>
            <Star size={16} color={COLORS.primary} fill={COLORS.primary} />
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
            {reviews && (
              <Text style={styles.reviews}>({reviews} reviews)</Text>
            )}
          </View>
        )}
        
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        
        {location && (
          <Text style={styles.location} numberOfLines={1}>{location}</Text>
        )}
        
        {startDate && endDate && (
          <View style={styles.dateContainer}>
            <Calendar size={14} color={COLORS.textLight} />
            <Text style={styles.dateText}>
              {formatDate(startDate)} - {formatDate(endDate)}
            </Text>
          </View>
        )}
        
        <Text style={styles.price}>{formattedPrice}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.medium,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: COLORS.border,
  },
  content: {
    padding: SPACING.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: SPACING.xs,
  },
  reviews: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: SPACING.xs,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  location: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: SPACING.xs,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },
}); 