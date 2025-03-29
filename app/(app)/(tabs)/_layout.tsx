import { Tabs } from 'expo-router';
import { LayoutGrid, User, FileText, Bell } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopColor: '#F0F0F0',
        },
        tabBarActiveTintColor: '#6E88F5',
        tabBarInactiveTintColor: '#999',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Каталог',
          tabBarIcon: ({ color, size }) => (
            <LayoutGrid size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Заказы',
          tabBarIcon: ({ color, size }) => (
            <FileText size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Уведомления',
          tabBarIcon: ({ color, size }) => (
            <Bell size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}