import { Stack } from 'expo-router';

export default function CreateLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Создать площадку',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#FFF',
          },
          headerTitleStyle: {
            fontFamily: 'Manrope-Bold',
            fontSize: 18,
          },
        }}
      />
    </Stack>
  );
}