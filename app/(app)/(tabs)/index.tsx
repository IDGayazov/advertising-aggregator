import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Search, FileSliders as Sliders } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

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
    image: 'https://media.istockphoto.com/id/994853998/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B4%D0%BE%D0%BC-%D0%BF%D0%B5%D0%B2%D0%B8%D1%86%D1%8B-%D0%BD%D0%B0-%D0%BD%D0%B5%D0%B2%D1%81%D0%BA%D0%BE%D0%BC-%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%D0%B5.jpg?s=612x612&w=0&k=20&c=r-yhxP8XqeToGao0tZeW7I9KLHOxzSxcw7hFj3XlRSA='
  },
  {
    id: 2,
    title: 'Лифт',
    location: 'Невский проспект, 1',
    description: 'плакат',
    price: 45000,
    category: 'Лифты',
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/0c/7f/e4/1a/caption.jpg'
  },
  {
    id: 3,
    title: 'Автобус',
    location: 'Автобус №47',
    description: 'вывеска',
    price: 45000,
    category: 'Автобусы',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C%2C_%D0%B0%D0%B2%D1%82%D0%BE%D0%B1%D1%83%D1%81_47-%D0%B3%D0%BE_%D0%BC%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D0%B0_%D0%BD%D0%B0_%D1%83%D0%BB%D0%B8%D1%86%D0%B5_%D0%90%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D0%B8%D0%BA%D0%B0_%D0%9F%D0%B0%D1%80%D0%B8%D0%BD%D0%B0.jpg'
  },
];

export default function CatalogScreen() {
  const [selectedCategory, setSelectedCategory] = React.useState('Все');
  const [searchQuery, setSearchQuery] = React.useState('');

  // Фильтрация площадок по категории и поисковому запросу
  const filteredVenues = VENUES.filter(venue => {
    const matchesCategory = selectedCategory === 'Все' || venue.category === selectedCategory;
    const matchesSearch = venue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Каталог площадок</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск площадок..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Sliders size={20} color="#6E88F5" />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {CATEGORIES.map((category, index) => (
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

      <ScrollView style={styles.content}>
        {filteredVenues.map((venue, index) => (
          <Animated.View
            key={venue.id}
            entering={FadeInRight.delay(index * 100)}
            style={styles.card}
          >
            <Image 
              source={{ uri: venue.image }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{venue.title}</Text>
              <Text style={styles.cardLocation}>{venue.location}</Text>
              <Text style={styles.cardDescription}>{venue.description}</Text>
              <Text style={styles.cardPrice}>от {venue.price.toLocaleString()} ₽/мес</Text>
            </View>
          </Animated.View>
        ))}
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
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 28,
    color: '#333',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    padding: 5,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#F9FAFF',
  },
  categoryButtonActive: {
    backgroundColor: '#6E88F5',
  },
  categoryText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#666',
  },
  categoryTextActive: {
    color: '#FFF',
    fontFamily: 'Manrope-Bold',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardImage: {
    height: 180,
    backgroundColor: '#F0F0F0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  cardLocation: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cardDescription: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardPrice: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#6E88F5',
  },
});