import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Modal, Platform } from 'react-native';
import { Search, Sliders, MapPin, X, Calendar, DollarSign, Filter } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, LAYOUT, SHADOWS } from '../../../utils/theme';
import Card from '../../../components/Card';
import Map from '../../../components/Map';
import { Venue } from '../../../types/venue';

const CATEGORIES = ['Все', 'Билборды', 'Лифты', 'Автобусы', 'Мероприятия'];

// Примерные данные рекламных мест
const VENUES: Venue[] = [
  {
    id: 1,
    title: 'Билборд на Чистопольской',
    location: 'ул. Чистопольская',
    description: '6x3 м, двусторонний, светодиодный',
    price: 45000,
    category: 'Билборды',
    image: 'https://img-fotki.yandex.ru/get/6/30348152.12e/0_64171_3eaba633_orig',
    startDate: '2023-05-01',
    endDate: '2023-07-31'
  },
  {
    id: 2,
    title: 'Лифт',
    location: 'Меридианная, 41',
    description: 'плакат',
    price: 45000,
    category: 'Лифты',
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/0c/7f/e4/1a/caption.jpg',
    startDate: '2023-05-15',
    endDate: '2023-08-15'
  },
  {
    id: 3,
    title: 'Автобус',
    location: 'Автобус №47',
    description: 'вывеска',
    price: 45000,
    category: 'Автобусы',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C%2C_%D0%B0%D0%B2%D1%82%D0%BE%D0%B1%D1%83%D1%81_47-%D0%B3%D0%BE_%D0%BC%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D0%B0_%D0%BD%D0%B0_%D1%83%D0%BB%D0%B8%D1%86%D0%B5_%D0%90%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D0%B8%D0%BA%D0%B0_%D0%9F%D0%B0%D1%80%D0%B8%D0%BD%D0%B0.jpg',
    startDate: '2023-06-01',
    endDate: '2023-09-30'
  },
];

export default function CatalogScreen() {
  const [selectedCategory, setSelectedCategory] = React.useState('Все');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showFilters, setShowFilters] = React.useState(false);
  const [priceMin, setPriceMin] = React.useState('');
  const [priceMax, setPriceMax] = React.useState('');
  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo] = React.useState('');
  const [appliedFilters, setAppliedFilters] = React.useState({
    priceMin: 0,
    priceMax: Infinity,
    dateFrom: '',
    dateTo: ''
  });
  const router = useRouter();
  const [selectedVenue, setSelectedVenue] = useState<number | null>(null);

  // Форматируем дату в строку ISO для сравнения
  const formatDateForCompare = (dateString: string) => {
    if (!dateString) return '';
    // Предполагаем, что пользователь вводит в формате дд.мм.гггг
    const [day, month, year] = dateString.split('.');
    if (!day || !month || !year) return '';
    return `${year}-${month}-${day}`;
  };

  // Функция применения фильтров
  const applyFilters = () => {
    setAppliedFilters({
      priceMin: priceMin ? parseInt(priceMin) : 0,
      priceMax: priceMax ? parseInt(priceMax) : Infinity,
      dateFrom: formatDateForCompare(dateFrom),
      dateTo: formatDateForCompare(dateTo)
    });
    setShowFilters(false);
  };

  // Функция сброса фильтров
  const resetFilters = () => {
    setPriceMin('');
    setPriceMax('');
    setDateFrom('');
    setDateTo('');
    setAppliedFilters({
      priceMin: 0,
      priceMax: Infinity,
      dateFrom: '',
      dateTo: ''
    });
  };

  // Подсчет активных фильтров
  const getActiveFiltersCount = () => {
    let count = 0;
    if (appliedFilters.priceMin > 0) count++;
    if (appliedFilters.priceMax < Infinity && appliedFilters.priceMax !== 0) count++;
    if (appliedFilters.dateFrom) count++;
    if (appliedFilters.dateTo) count++;
    return count;
  };

  // Получаем количество активных фильтров
  const activeFiltersCount = getActiveFiltersCount();

  // Фильтрация площадок по категории, поисковому запросу, цене и датам
  const filteredVenues = VENUES.filter(venue => {
    // Фильтр по категории
    const matchesCategory = selectedCategory === 'Все' || venue.category === selectedCategory;
    
    // Фильтр по поисковому запросу (название, адрес и категория)
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      venue.title.toLowerCase().includes(searchLower) ||
      venue.location.toLowerCase().includes(searchLower) ||
      venue.category.toLowerCase().includes(searchLower);
    
    // Фильтр по цене
    const matchesPrice = venue.price >= appliedFilters.priceMin && 
                        venue.price <= appliedFilters.priceMax;
    
    // Фильтр по датам
    let matchesDates = true;
    if (appliedFilters.dateFrom) {
      matchesDates = matchesDates && venue.endDate >= appliedFilters.dateFrom;
    }
    if (appliedFilters.dateTo) {
      matchesDates = matchesDates && venue.startDate <= appliedFilters.dateTo;
    }
    
    return matchesCategory && matchesSearch && matchesPrice && matchesDates;
  });

  const handleVenuePress = (venue: Venue) => {
    router.push({
      pathname: '/venue-details',
      params: {
        id: venue.id,
        title: venue.title,
        location: venue.location,
        price: venue.price,
        image: venue.image,
        duration: venue.duration,
        coverage: venue.coverage,
        latitude: venue.coordinates.latitude,
        longitude: venue.coordinates.longitude,
      }
    });
  };

  const handleMarkerPress = (venue: Venue) => {
    setSelectedVenue(venue.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Привет, Александр</Text>
        <Text style={styles.title}>Каталог рекламных мест</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск по адресу, категории..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilters(true)}
          >
            {activeFiltersCount > 0 && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
              </View>
            )}
            <Filter size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {searchQuery.length > 0 && filteredVenues.length === 0 && (
          <Text style={styles.noResultsText}>
            По вашему запросу ничего не найдено
          </Text>
        )}
      </View>

      {/* Модальное окно фильтров */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Фильтры</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowFilters(false)}
              >
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            {/* Фильтр по цене */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Цена (₽/месяц)</Text>
              <View style={styles.priceInputsContainer}>
                <View style={styles.priceInputWrapper}>
                  <DollarSign size={18} color={COLORS.textLight} style={styles.inputIcon} />
                  <TextInput
                    style={styles.priceInput}
                    placeholder="от"
                    keyboardType="number-pad"
                    value={priceMin}
                    onChangeText={setPriceMin}
                    placeholderTextColor={COLORS.textLight}
                  />
                </View>
                <View style={styles.priceDivider} />
                <View style={styles.priceInputWrapper}>
                  <DollarSign size={18} color={COLORS.textLight} style={styles.inputIcon} />
                  <TextInput
                    style={styles.priceInput}
                    placeholder="до"
                    keyboardType="number-pad"
                    value={priceMax}
                    onChangeText={setPriceMax}
                    placeholderTextColor={COLORS.textLight}
                  />
                </View>
              </View>
            </View>

            {/* Фильтр по датам */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Период размещения</Text>
              <View style={styles.dateInputsContainer}>
                <View style={styles.dateInputWrapper}>
                  <Calendar size={18} color={COLORS.textLight} style={styles.inputIcon} />
                  <TextInput
                    style={styles.dateInput}
                    placeholder="С (дд.мм.гггг)"
                    value={dateFrom}
                    onChangeText={setDateFrom}
                    placeholderTextColor={COLORS.textLight}
                  />
                </View>
                <View style={styles.dateDivider} />
                <View style={styles.dateInputWrapper}>
                  <Calendar size={18} color={COLORS.textLight} style={styles.inputIcon} />
                  <TextInput
                    style={styles.dateInput}
                    placeholder="По (дд.мм.гггг)"
                    value={dateTo}
                    onChangeText={setDateTo}
                    placeholderTextColor={COLORS.textLight}
                  />
                </View>
              </View>
            </View>

            <View style={styles.filterActions}>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={resetFilters}
              >
                <Text style={styles.resetButtonText}>Сбросить</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={applyFilters}
              >
                <Text style={styles.applyButtonText}>Применить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Map 
        venues={filteredVenues}
        onMarkerPress={handleMarkerPress}
        style={styles.map}
      />

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>
          {filteredVenues.length > 0 
            ? 'Рекомендуемые площадки' 
            : 'Площадки не найдены'}
        </Text>
        
        {filteredVenues.map((venue, index) => (
          <Animated.View
            key={venue.id}
            entering={FadeInRight.delay(index * 100)}
            style={styles.cardContainer}
          >
            <Card
              title={venue.title}
              image={venue.image}
              price={`${venue.price.toLocaleString()} ₽/мес`}
              location={venue.location}
              startDate={venue.startDate}
              endDate={venue.endDate}
              onPress={() => handleVenuePress(venue)}
              venue={venue}
              style={[
                styles.card,
                selectedVenue === venue.id && styles.selectedCard
              ]}
            />
          </Animated.View>
        ))}
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
  welcomeText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 245, 230, 0.7)',
    borderRadius: LAYOUT.borderRadius.medium,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    fontFamily: 'Manrope-Regular',
    paddingVertical: 8,
  },
  filterButton: {
    padding: SPACING.xs,
    position: 'relative',
  },
  filterBadge: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    top: 0,
    right: 0,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  categoriesWrapper: {
    marginVertical: SPACING.md,
    paddingBottom: SPACING.xs,
  },
  categoriesContainer: {
    maxHeight: 56,
  },
  categoriesContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  categoryButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 14,
    color: COLORS.text,
  },
  categoryTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.lg,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  cardContainer: {
    marginBottom: SPACING.md,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: SPACING.lg,
    paddingTop: SPACING.md,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  filterSection: {
    marginBottom: SPACING.lg,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  priceInputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 245, 230, 0.7)',
    borderRadius: LAYOUT.borderRadius.medium,
    paddingHorizontal: SPACING.sm,
  },
  priceDivider: {
    width: 10,
    height: 1,
    backgroundColor: COLORS.textLight,
    marginHorizontal: SPACING.sm,
  },
  priceInput: {
    flex: 1,
    padding: SPACING.sm,
    fontSize: 16,
    color: COLORS.text,
  },
  inputIcon: {
    marginRight: SPACING.xs,
  },
  dateInputsContainer: {
    flexDirection: 'column',
    gap: SPACING.sm,
  },
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 245, 230, 0.7)',
    borderRadius: LAYOUT.borderRadius.medium,
    paddingHorizontal: SPACING.sm,
  },
  dateDivider: {
    height: 8,
  },
  dateInput: {
    flex: 1,
    padding: SPACING.sm,
    fontSize: 16,
    color: COLORS.text,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
    paddingBottom: Platform.OS === 'ios' ? 30 : 0,
  },
  resetButton: {
    padding: SPACING.md,
    borderRadius: LAYOUT.borderRadius.medium,
    borderWidth: 1,
    borderColor: COLORS.primary,
    minWidth: 120,
    alignItems: 'center',
  },
  resetButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  applyButton: {
    padding: SPACING.md,
    borderRadius: LAYOUT.borderRadius.medium,
    backgroundColor: COLORS.primary,
    minWidth: 120,
    alignItems: 'center',
  },
  applyButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
  noResultsText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  map: {
    height: 300,
    margin: SPACING.lg,
  },
  selectedCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
});