import React, { createContext, useContext, useState } from 'react';
import { Venue } from '../types/venue';

// Интерфейс для контекста
interface PackageContextType {
  userPackage: Venue[];
  addToPackage: (venue: Venue) => void;
  removeFromPackage: (venueId: number) => void;
  isInPackage: (venueId: number) => boolean;
  packageTotalPrice: number;
}

// Создаем контекст
const PackageContext = createContext<PackageContextType | undefined>(undefined);

// Провайдер контекста
export function PackageProvider({ children }: { children: React.ReactNode }) {
  const [userPackage, setUserPackage] = useState<Venue[]>([]);

  // Добавить площадку в пакет
  const addToPackage = (venue: Venue) => {
    setUserPackage(prev => [...prev, venue]);
  };

  // Удалить площадку из пакета
  const removeFromPackage = (venueId: number) => {
    setUserPackage(prev => prev.filter(v => v.id !== venueId));
  };

  // Проверить, находится ли площадка в пакете
  const isInPackage = (venueId: number) => {
    return userPackage.some(v => v.id === venueId);
  };

  // Расчет общей стоимости пакета
  const packageTotalPrice = userPackage.reduce((sum, venue) => sum + venue.price, 0);

  return (
    <PackageContext.Provider 
      value={{ 
        userPackage, 
        addToPackage, 
        removeFromPackage, 
        isInPackage,
        packageTotalPrice,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
}

// Хук для использования контекста
export function usePackage() {
  const context = useContext(PackageContext);
  if (context === undefined) {
    throw new Error('usePackage must be used within a PackageProvider');
  }
  return context;
} 