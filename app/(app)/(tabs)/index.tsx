import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Search, Sliders, MapPin } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, LAYOUT, SHADOWS } from '../../../utils/theme';
import Card from '../../../components/Card';

const CATEGORIES = ['Все', 'Билборды', 'Лифты', 'Автобусы', 'Мероприятия'];

// Определяем интерфейс для площадки
interface Venue {
  id: number;
  title: string;
  location: string;
  description: string;
  price: number;
  category: string;
  image: string;
  startDate: string;
  endDate: string;
}

// Пример данных (в реальном приложении это может приходить с API)
const VENUES: Venue[] = [
  {
    id: 1,
    title: 'Билборд на Невском',
    location: 'Невский проспект, 1',
    description: '6x3 м, двусторонний, светодиодный',
    price: 45000,
    category: 'Билборды',
    image: 'https://media.istockphoto.com/id/994853998/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B4%D0%BE%D0%BC-%D0%BF%D0%B5%D0%B2%D0%B8%D1%86%D1%8B-%D0%BD%D0%B0-%D0%BD%D0%B5%D0%B2%D1%81%D0%BA%D0%BE%D0%BC-%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%D0%B5.jpg?s=612x612&w=0&k=20&c=r-yhxP8XqeToGao0tZeW7I9KLHOxzSxcw7hFj3XlRSA=',
    startDate: '2023-05-01',
    endDate: '2023-07-31'
  },
  {
    id: 2,
    title: 'Лифт',
    location: 'Невский проспект, 1',
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
  const router = useRouter();

  // Фильтрация площадок по категории и поисковому запросу
  const filteredVenues = VENUES.filter(venue => {
    const matchesCategory = selectedCategory === 'Все' || venue.category === selectedCategory;
    const matchesSearch = venue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const navigateToDetails = (venue: Venue) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Привет, Александр</Text>
        <Text style={styles.title}>Где разместить рекламу?</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск площадок..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Sliders size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

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

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Рекомендуемые площадки</Text>
        
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
              onPress={() => navigateToDetails(venue)}
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
  },
  filterButton: {
    padding: SPACING.xs,
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
  }
});