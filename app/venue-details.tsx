import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin, Calendar, DollarSign, ArrowLeft } from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING } from '../utils/theme';
import Button from '../components/Button';
import { usePackage } from '../context/PackageContext';
import Map from '../components/Map';

export default function VenueDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addToPackage, removeFromPackage, isInPackage } = usePackage();

  const venue = {
    id: Number(params.id),
    title: params.title,
    location: params.location,
    description: params.description,
    price: Number(params.price),
    category: params.category,
    image: params.image,
    startDate: params.startDate,
    endDate: params.endDate,
    coordinates: {
      latitude: Number(params.latitude) || 55.751244, // Дефолтные координаты если не переданы
      longitude: Number(params.longitude) || 37.618423,
    },
  };

  const inPackage = isInPackage(venue.id);

  const handlePackageAction = () => {
    if (inPackage) {
      removeFromPackage(venue.id);
    } else {
      addToPackage(venue);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: venue.image as string }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{venue.title}</Text>
        
        <View style={styles.infoRow}>
          <MapPin size={20} color={COLORS.textLight} />
          <Text style={styles.infoText}>{venue.location}</Text>
        </View>

        {venue.startDate && venue.endDate && (
          <View style={styles.infoRow}>
            <Calendar size={20} color={COLORS.textLight} />
            <Text style={styles.infoText}>
              {new Date(venue.startDate as string).toLocaleDateString()} - 
              {new Date(venue.endDate as string).toLocaleDateString()}
            </Text>
          </View>
        )}

        <View style={styles.infoRow}>
          <DollarSign size={20} color={COLORS.textLight} />
          <Text style={styles.infoText}>{Number(venue.price).toLocaleString()} ₽/мес</Text>
        </View>

        {venue.description && (
          <Text style={styles.description}>{venue.description}</Text>
        )}

        <Text style={styles.sectionTitle}>Расположение</Text>
        <Map 
          singleVenue={{
            id: venue.id,
            title: venue.title as string,
            location: venue.location as string,
            coordinates: venue.coordinates,
          }}
          style={styles.map}
        />

        <Button
          title={inPackage ? "Убрать из пакета" : "Добавить в пакет"}
          onPress={handlePackageAction}
          style={styles.button}
          variant={inPackage ? "secondary" : "primary"}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: COLORS.border,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
    marginTop: -20,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...SHADOWS.medium,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.textLight,
    marginLeft: SPACING.sm,
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
    marginVertical: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  map: {
    height: 200,
    marginBottom: SPACING.lg,
    borderRadius: 12,
  },
  button: {
    marginTop: SPACING.md,
  },
}); 