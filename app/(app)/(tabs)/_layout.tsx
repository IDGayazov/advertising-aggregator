import { Tabs } from 'expo-router';
import { LayoutGrid, User, FileText, Bell, Package, ShoppingBag } from 'lucide-react-native';
import { COLORS } from '../../../utils/theme';
import { Text, View } from 'react-native';
import { usePackage } from '../../../context/PackageContext';

export default function TabLayout() {
  const { userPackage } = usePackage();
  const packageCount = userPackage.length;
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          height: 60,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Каталог',
          tabBarIcon: ({ color, size }) => <LayoutGrid size={size} color={color} />,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: color, fontSize: 12, fontFamily: focused ? 'Manrope-Bold' : 'Manrope-Regular' }}>
              Каталог
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="user-package"
        options={{
          title: 'Мой пакет',
          tabBarIcon: ({ color, size }) => (
            <View>
              <ShoppingBag size={size} color={color} />
              {packageCount > 0 && (
                <View style={{
                  position: 'absolute',
                  top: -6,
                  right: -8,
                  backgroundColor: COLORS.primary,
                  borderRadius: 10,
                  width: 16,
                  height: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{
                    color: COLORS.white,
                    fontSize: 10,
                    fontWeight: 'bold',
                  }}>
                    {packageCount}
                  </Text>
                </View>
              )}
            </View>
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: color, fontSize: 12, fontFamily: focused ? 'Manrope-Bold' : 'Manrope-Regular' }}>
              Мой пакет
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="ad-packages"
        options={{
          title: 'Пакеты',
          tabBarIcon: ({ color, size }) => <Package size={size} color={color} />,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: color, fontSize: 12, fontFamily: focused ? 'Manrope-Bold' : 'Manrope-Regular' }}>
              Пакеты
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Заказы',
          tabBarIcon: ({ color, size }) => <FileText size={size} color={color} />,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: color, fontSize: 12, fontFamily: focused ? 'Manrope-Bold' : 'Manrope-Regular' }}>
              Заказы
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Уведомления',
          tabBarIcon: ({ color, size }) => <Bell size={size} color={color} />,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: color, fontSize: 12, fontFamily: focused ? 'Manrope-Bold' : 'Manrope-Regular' }}>
              Уведомления
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: color, fontSize: 12, fontFamily: focused ? 'Manrope-Bold' : 'Manrope-Regular' }}>
              Профиль
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}