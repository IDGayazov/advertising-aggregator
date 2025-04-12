import { Stack } from "expo-router";
import { COLORS } from '../../utils/theme';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.white,
        },
        presentation: 'card',
        animation: 'slide_from_right',
        animationDuration: 200,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="venue-details"
        options={{
          presentation: 'card',
          animation: 'slide_from_right',
          animationDuration: 200,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        name="my-venues"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="profile-settings"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
} 