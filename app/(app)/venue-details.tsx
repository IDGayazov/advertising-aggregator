import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Animated, StatusBar, Modal, ToastAndroid, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Search, X, Calendar, Plus, Minus } from 'lucide-react-native';
import { COLORS, SPACING, LAYOUT, SHADOWS } from '../../utils/theme';
import Button from '../../components/Button';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { usePackage } from '../../context/PackageContext';

const { width, height } = Dimensions.get('window');
const MIN_SHEET_HEIGHT = height * 0.4; // Минимальная высота (закрытое состояние)
const MAX_SHEET_HEIGHT = height * 0.8; // Максимальная высота (открытое состояние)

type VenueParams = {
  id: string;
  title: string;
  location: string;
  description: string;
  price: string;
  category: string;
  image: string;
  startDate: string;
  endDate: string;
}

export default function VenueDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams() as VenueParams;
  const [sheetHeight] = useState(new Animated.Value(MIN_SHEET_HEIGHT));
  const [currentHeight, setCurrentHeight] = useState(MIN_SHEET_HEIGHT);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const { addToPackage, removeFromPackage, isInPackage } = usePackage();
  const venueId = parseInt(params.id, 10);
  const inPackage = isInPackage(venueId);
  const buttonScale = useRef(new Animated.Value(1)).current;

  // Форматируем даты
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Обработчик жеста перетаскивания
  const onGestureEvent = (event: any) => {
    const { translationY } = event.nativeEvent;
    let newHeight = currentHeight - translationY;
    
    // Ограничиваем высоту между MIN и MAX
    if (newHeight < MIN_SHEET_HEIGHT) newHeight = MIN_SHEET_HEIGHT;
    if (newHeight > MAX_SHEET_HEIGHT) newHeight = MAX_SHEET_HEIGHT;
    
    sheetHeight.setValue(newHeight);
  };

  // Обработчик окончания жеста
  const onGestureEnd = (event: any) => {
    const { translationY } = event.nativeEvent;
    const newHeight = currentHeight - translationY;
    
    // Анимированно переходим к ближайшей точке
    let targetHeight;
    if (newHeight > (MIN_SHEET_HEIGHT + MAX_SHEET_HEIGHT) / 2) {
      targetHeight = MAX_SHEET_HEIGHT;
    } else {
      targetHeight = MIN_SHEET_HEIGHT;
    }
    
    Animated.spring(sheetHeight, {
      toValue: targetHeight,
      useNativeDriver: false,
      bounciness: 4,
    }).start();
    
    setCurrentHeight(targetHeight);
  };

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

  // Создаем функцию для добавления в пакет
  const handleAddToPackage = () => {
    // Анимируем кнопку
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true
      }),
      Animated.timing(buttonScale, {
        toValue: 1, 
        duration: 150,
        useNativeDriver: true
      })
    ]).start(() => {
      // После анимации выполняем действие с пакетом
      if (inPackage) {
        removeFromPackage(venueId);
        
        // Показываем уведомление
        if (Platform.OS === 'android') {
          ToastAndroid.show('Удалено из пакета', ToastAndroid.SHORT);
        }
      } else {
        addToPackage({
          id: venueId,
          title: params.title,
          location: params.location,
          description: params.description,
          price: parseInt(params.price, 10),
          category: params.category,
          image: params.image,
          startDate: params.startDate,
          endDate: params.endDate
        });
        
        // Показываем уведомление
        if (Platform.OS === 'android') {
          ToastAndroid.show('Добавлено в пакет', ToastAndroid.SHORT);
        }
      }
    });
  };

  if (!params.image) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
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
        
        <View style={styles.rightButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, inPackage && styles.actionButtonActive]}
            onPress={handleAddToPackage}
          >
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              {inPackage ? (
                <Minus size={20} color={COLORS.white} />
              ) : (
                <Plus size={20} color={COLORS.white} />
              )}
            </Animated.View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setImageModalVisible(true)}
          >
            <Search size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.titleHeader}>
        <Text style={styles.titleWhite}>{params.title}</Text>
        <View style={styles.locationContainerWhite}>
          <MapPin size={16} color={COLORS.white} />
          <Text style={styles.locationWhite}>{params.location}</Text>
        </View>
        {params.startDate && params.endDate && (
          <View style={styles.dateContainerWhite}>
            <Calendar size={16} color={COLORS.white} />
            <Text style={styles.dateWhite}>
              {formatDate(params.startDate)} - {formatDate(params.endDate)}
            </Text>
          </View>
        )}
      </View>

      {/* Modal для полноэкранного просмотра фото */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          <StatusBar hidden />
          <Image 
            source={{ uri: params.image }} 
            style={styles.fullImage} 
            resizeMode="contain"
          />
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setImageModalVisible(false)}
          >
            <X size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </Modal>

      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEnd}
      >
        <Animated.View style={[styles.bottomSheet, { height: sheetHeight }]}>
          <View style={styles.handleBar} />
          
          <ScrollView style={styles.scrollContent}>
            <View style={styles.infoContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.sectionTitle}>Подробно</Text>
                <View style={styles.priceTag}>
                  <Text style={styles.priceText}>{price.toLocaleString()} ₽</Text>
                </View>
              </View>
              
              {params.startDate && params.endDate && (
                <View style={styles.availabilityContainer}>
                  <Text style={styles.availabilityTitle}>Доступно для бронирования</Text>
                  <View style={styles.dateRangeContainer}>
                    <View style={styles.dateBox}>
                      <Text style={styles.dateLabel}>С</Text>
                      <Text style={styles.dateValue}>{formatDate(params.startDate)}</Text>
                    </View>
                    <View style={styles.dateDivider} />
                    <View style={styles.dateBox}>
                      <Text style={styles.dateLabel}>По</Text>
                      <Text style={styles.dateValue}>{formatDate(params.endDate)}</Text>
                    </View>
                  </View>
                </View>
              )}
              
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
        </Animated.View>
      </PanGestureHandler>
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
    height: '75%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '75%',
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
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm,
  },
  actionButtonActive: {
    backgroundColor: 'rgba(180, 140, 47, 0.8)',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...SHADOWS.medium,
  },
  handleBar: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.border,
    marginTop: 10,
    marginBottom: 10,
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fullImage: {
    width: width,
    height: height,
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  dateContainerWhite: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  dateWhite: {
    fontSize: 14,
    color: COLORS.white,
    marginLeft: SPACING.xs,
    fontWeight: '500',
  },
  availabilityContainer: {
    backgroundColor: 'rgba(180, 140, 47, 0.1)',
    borderRadius: LAYOUT.borderRadius.medium,
    padding: SPACING.md,
    marginVertical: SPACING.md,
  },
  availabilityTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateBox: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  dateDivider: {
    width: 10,
    height: 1,
    backgroundColor: COLORS.textLight,
    marginHorizontal: SPACING.sm,
  },
}); 