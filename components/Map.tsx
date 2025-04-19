import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import YaMap, { Marker, Point } from 'react-native-yamap';
import { COLORS } from '../utils/theme';
import { MapVenue, Venue } from '../types/venue';

interface MapProps {
  venues?: Venue[];
  singleVenue?: MapVenue;
  onMarkerPress?: (venue: Venue) => void;
  style?: ViewStyle;
}

YaMap.init('1cf844c0-78e5-47fb-883f-618df459154d');

const Map = ({ venues, singleVenue, onMarkerPress, style }: MapProps) => {
  const initialPoint: Point = singleVenue ? 
    { lat: singleVenue.coordinates.latitude, lon: singleVenue.coordinates.longitude } :
    { lat: 55.751244, lon: 37.618423 }; // Центр Москвы по умолчанию

  const mapVenueToMapVenue = (venue: Venue): MapVenue => ({
    id: venue.id,
    title: venue.title,
    location: venue.location,
    coordinates: venue.coordinates,
  });

  return (
    <View style={[styles.container, style]}>
      <YaMap
        style={styles.map}
        initialRegion={{
          lat: initialPoint.lat,
          lon: initialPoint.lon,
          zoom: singleVenue ? 15 : 11,
          azimuth: 0,
          tilt: 0,
        }}
        showUserPosition={false}
      >
        {venues && venues.map((venue) => (
          <Marker
            key={venue.id}
            point={{ lat: venue.coordinates.latitude, lon: venue.coordinates.longitude }}
            scale={1.5}
            onPress={() => onMarkerPress && onMarkerPress(venue)}
          />
        ))}
        
        {singleVenue && (
          <Marker
            point={{ 
              lat: singleVenue.coordinates.latitude, 
              lon: singleVenue.coordinates.longitude 
            }}
            scale={2}
          />
        )}
      </YaMap>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});

export default Map; 