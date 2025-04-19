import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS } from '../utils/theme';
import { Venue } from '../types/venue';
import { YANDEX_MAPS_API_KEY } from '../config/apiKeys';

interface YMapProps {
  venues?: Venue[];
  singleVenue?: Venue;
  style?: ViewStyle;
  onMarkerPress?: (venue: Venue) => void;
}

interface MarkerData {
  venue: Venue;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export default function YMap({ venues, singleVenue, style, onMarkerPress }: YMapProps) {
  const [markersData, setMarkersData] = useState<MarkerData[]>([]);

  useEffect(() => {
    const geocodeAddresses = async () => {
      const venuesToProcess = singleVenue ? [singleVenue] : venues || [];
      const geocodedVenues = await Promise.all(
        venuesToProcess.map(async (venue) => {
          if (venue.coordinates) {
            return { 
              venue, 
              coordinates: venue.coordinates 
            } as MarkerData;
          }

          try {
            const response = await fetch(
              `https://geocode-maps.yandex.ru/1.x/?apikey=${YANDEX_MAPS_API_KEY}&format=json&geocode=Казань,${venue.location}`
            );
            const data = await response.json();
            const point = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
            
            return {
              venue,
              coordinates: {
                latitude: parseFloat(point[1]),
                longitude: parseFloat(point[0])
              }
            } as MarkerData;
          } catch (error) {
            console.error('Ошибка геокодирования:', error);
            return null;
          }
        })
      );

      setMarkersData(geocodedVenues.filter((v): v is MarkerData => v !== null));
    };

    geocodeAddresses();
  }, [venues, singleVenue]);

  const generateMapHTML = () => {
    const center = singleVenue && markersData[0]?.coordinates
      ? [markersData[0].coordinates.latitude, markersData[0].coordinates.longitude]
      : [55.796127, 49.106414]; // Центр Казани

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_MAPS_API_KEY}&lang=ru_RU" type="text/javascript"></script>
          <style>
            html, body, #map {
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0;
            }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script type="text/javascript">
            ymaps.ready(init);
            function init() {
              var myMap = new ymaps.Map('map', {
                center: [${center[0]}, ${center[1]}],
                zoom: ${singleVenue ? 15 : 12},
                controls: ['zoomControl']
              });

              ${markersData.map(({ venue, coordinates }) => `
                var marker${venue.id} = new ymaps.Placemark(
                  [${coordinates.latitude}, ${coordinates.longitude}],
                  {
                    balloonContent: '<strong>${venue.title}</strong><br>${venue.location}<br>Цена: ${venue.price} ₽/мес'
                  },
                  {
                    preset: 'islands#redDotIcon'
                  }
                );
                myMap.geoObjects.add(marker${venue.id});
                ${!singleVenue ? `
                marker${venue.id}.events.add('click', function() {
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'markerClick',
                    venueId: ${venue.id}
                  }));
                });
                ` : ''}
              `).join('')}
            }
          </script>
        </body>
      </html>
    `;
  };

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'markerClick' && onMarkerPress) {
        const venue = venues?.find(v => v.id === data.venueId);
        if (venue) {
          onMarkerPress(venue);
        }
      }
    } catch (error) {
      console.error('Ошибка обработки сообщения:', error);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <WebView
        source={{ html: generateMapHTML() }}
        style={styles.webview}
        onMessage={handleMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    overflow: 'hidden',
    borderRadius: 12,
  },
  webview: {
    flex: 1,
  },
}); 