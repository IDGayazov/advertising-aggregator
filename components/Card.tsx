import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ViewStyle, Animated as RNAnimated, ToastAndroid, Platform } from 'react-native';
import { COLORS, SHADOWS, LAYOUT, SPACING, TYPOGRAPHY } from '../utils/theme';
import { Star, Calendar, Plus, Check, Minus } from 'lucide-react-native';
import { usePackage } from '../context/PackageContext';

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
  venue?: any; // Добавляем объект площадки
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
  venue,
}: CardProps) {
  const { addToPackage, removeFromPackage, isInPackage } = usePackage();
  const inPackage = venue ? isInPackage(venue.id) : false;

  // Преобразуем цену в строку с правильным форматированием
  const formattedPrice = typeof price === 'number' ? `${price.toLocaleString()} ₽` : price;

  // Форматируем даты
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  const handleAddToPackage = (e: any) => {
    e.stopPropagation();
    
    if (!venue) return;
    
    // Анимация при действии с пакетом
    const animation = RNAnimated.sequence([
      RNAnimated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      RNAnimated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]);
    
    animation.start(() => {
      // Если уже в пакете - удаляем, иначе - добавляем
      if (inPackage) {
        removeFromPackage(venue.id);
        
        // Показать уведомление
        if (Platform.OS === 'android') {
          ToastAndroid.show('Удалено из пакета', ToastAndroid.SHORT);
        }
      } else {
        addToPackage(venue);
        
        // Показать уведомление
        if (Platform.OS === 'android') {
          ToastAndroid.show('Добавлено в пакет', ToastAndroid.SHORT);
        }
      }
    });
  };

  // Анимация для кнопки
  const scaleAnim = useRef(new RNAnimated.Value(1)).current;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        
        {/* Кнопка добавления/удаления из пакета в правом верхнем углу */}
        {venue && (
          <TouchableOpacity 
            style={[styles.cornerAddButton, inPackage && styles.cornerAddButtonActive]} 
            onPress={handleAddToPackage}
          >
            <RNAnimated.View style={{ transform: [{ scale: scaleAnim }] }}>
              {inPackage ? (
                <Minus size={18} color={COLORS.white} />
              ) : (
                <Plus size={18} color={COLORS.white} />
              )}
            </RNAnimated.View>
          </TouchableOpacity>
        )}
      </View>
      
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
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: COLORS.border,
  },
  cornerAddButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  cornerAddButtonActive: {
    backgroundColor: 'rgba(180, 140, 47, 0.8)',
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
  }
}); 