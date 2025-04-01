import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

// Используем те же данные площадок, что и раньше
const MY_VENUES = [
  {
    id: 1,
    title: 'Билборд на Невском',
    location: 'Невский проспект, 1',
    status: 'active', // active, pending, inactive
    image: 'https://media.istockphoto.com/id/994853998/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B4%D0%BE%D0%BC-%D0%BF%D0%B5%D0%B2%D0%B8%D1%86%D1%8B-%D0%BD%D0%B0-%D0%BD%D0%B5%D0%B2%D1%81%D0%BA%D0%BE%D0%BC-%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%D0%B5.jpg?s=612x612&w=0&k=20&c=r-yhxP8XqeToGao0tZeW7I9KLHOxzSxcw7hFj3XlRSA='
  },
  // Добавьте другие площадки...
];

export default function MyVenuesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Мои площадки</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#6E88F5" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {MY_VENUES.map((venue, index) => (
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
                  { backgroundColor: venue.status === 'active' ? '#4ECDC4' : '#F5A623' }
                ]}>
                  <Text style={styles.statusText}>
                    {venue.status === 'active' ? 'Активно' : 'На модерации'}
                  </Text>
                </View>
              </View>
              <Text style={styles.venueLocation}>{venue.location}</Text>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => router.push(`/venue-details?id=${venue.id}`)}
              >
                <Text style={styles.editButtonText}>Редактировать</Text>
              </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: '#333',
  },
  addButton: {
    padding: 8,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  venueImage: {
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  venueTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: '#FFF',
  },
  venueLocation: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: '#F0F4FF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#6E88F5',
  },
}); 