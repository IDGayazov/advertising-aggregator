import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Search, FileSliders as Sliders } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

const CATEGORIES = ['Все', 'Билборды', 'Лифты', 'Автобусы', 'Мероприятия'];

export default function CatalogScreen() {
  const [selectedCategory, setSelectedCategory] = React.useState('Все');

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
        {[1, 2, 3, 4].map((item) => (
          <Animated.View
            key={item}
            entering={FadeInRight.delay(item * 100)}
            style={styles.card}
          >
            <View style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Билборд на Невском</Text>
              <Text style={styles.cardDescription}>6x3 м, двусторонний, светодиодный</Text>
              <Text style={styles.cardPrice}>от 45 000 ₽/мес</Text>
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