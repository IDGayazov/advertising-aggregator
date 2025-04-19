export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Venue {
  id: number;
  title: string;
  location: string;
  description?: string;
  price: number;
  category?: string;
  image: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  coverage?: string;
  coordinates: Coordinates;
}

export interface MapVenue {
  id: number;
  title: string;
  location: string;
  coordinates: Coordinates;
} 