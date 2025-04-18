import React, { createContext, useState, useContext, ReactNode } from 'react';

// Интерфейс для рекламной площадки
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
}

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
export const PackageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userPackage, setUserPackage] = useState<Venue[]>([]);

  // Добавить площадку в пакет
  const addToPackage = (venue: Venue) => {
    if (!isInPackage(venue.id)) {
      setUserPackage([...userPackage, venue]);
    }
  };

  // Удалить площадку из пакета
  const removeFromPackage = (venueId: number) => {
    setUserPackage(userPackage.filter(item => item.id !== venueId));
  };

  // Проверить, находится ли площадка в пакете
  const isInPackage = (venueId: number): boolean => {
    return userPackage.some(item => item.id === venueId);
  };

  // Расчет общей стоимости пакета
  const packageTotalPrice = userPackage.reduce((total, venue) => total + venue.price, 0);

  const value = {
    userPackage,
    addToPackage,
    removeFromPackage,
    isInPackage,
    packageTotalPrice
  };

  return (
    <PackageContext.Provider value={value}>
      {children}
    </PackageContext.Provider>
  );
};

// Хук для использования контекста
export const usePackage = (): PackageContextType => {
  const context = useContext(PackageContext);
  if (context === undefined) {
    throw new Error('usePackage must be used within a PackageProvider');
  }
  return context;
}; 