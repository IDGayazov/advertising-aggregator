import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function VenueDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  // Временные данные для примера
  const VENUES = [
    {
      id: 1,
      title: 'Площадка 1',
      location: 'Москва',
      price: 50000,
      description: 'Описание площадки 1',
      category: 'Офис',
      image: 'https://media.istockphoto.com/id/994853998/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B4%D0%BE%D0%BC-%D0%BF%D0%B5%D0%B2%D0%B8%D1%86%D1%8B-%D0%BD%D0%B0-%D0%BD%D0%B5%D0%B2%D1%81%D0%BA%D0%BE%D0%BC-%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%D0%B5.jpg?s=612x612&w=0&k=20&c=r-yhxP8XqeToGao0tZeW7I9KLHOxzSxcw7hFj3XlRSA='
    },
    // Добавьте другие площадки по необходимости
  ];

  // Находим площадку по id
  const venue = VENUES.find((v: { id: number }) => v.id === Number(id));

  if (!venue) {
    return (
      <View style={styles.container}>
        <Text>Площадка не найдена</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <Image 
            source={{ uri: venue.image }}
            style={styles.headerImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{venue.title}</Text>
          <Text style={styles.location}>{venue.location}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Стоимость аренды</Text>
            <Text style={styles.price}>от {venue.price.toLocaleString()} ₽/мес</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Описание</Text>
            <Text style={styles.description}>{venue.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Характеристики</Text>
            <Text style={styles.specs}>Категория: {venue.category}</Text>
            {/* Добавьте дополнительные характеристики */}
          </View>

          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Забронировать</Text>
          </TouchableOpacity>
        </View>
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
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
  },
  headerImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
    paddingTop: 30,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: '#333',
    marginBottom: 8,
  },
  location: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  priceContainer: {
    backgroundColor: '#F0F4FF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 24,
  },
  priceLabel: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: '#6E88F5',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  specs: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: '#6E88F5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  bookButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#FFF',
  },
}); 