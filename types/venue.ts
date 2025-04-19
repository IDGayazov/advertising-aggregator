export interface Venue {
  id: number;
  title: string;
  location: string;
  description: string;
  price: number;
  category: string;
  image: string;
  startDate: string;
  endDate: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
} 