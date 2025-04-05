import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../../../utils/theme';

export default function CreateLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor={COLORS.background} />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Создать площадку',
            headerShown: true,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerTitleStyle: {
              fontFamily: 'Manrope-Bold',
              fontSize: 18,
              color: COLORS.text,
            },
            headerTintColor: COLORS.primary,
            headerShadowVisible: true,
          }}
        />
      </Stack>
    </>
  );
}