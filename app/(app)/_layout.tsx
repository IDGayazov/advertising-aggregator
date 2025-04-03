import { Stack } from "expo-router";

<Stack>
  <Stack.Screen
    name="(tabs)"
    options={{
      headerShown: false,
    }}
  />
  <Stack.Screen
    name="venue-details"
    options={{
      headerShown: false,
      presentation: 'modal',
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