import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { COLORS, BUTTON_STYLES } from '../utils/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  type = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyle = type === 'primary' ? BUTTON_STYLES.primary : BUTTON_STYLES.secondary;
  const buttonTextColor = type === 'primary' ? COLORS.white : COLORS.primary;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyle,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={buttonTextColor} />
      ) : (
        <Text
          style={[
            styles.text,
            { color: buttonTextColor },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: '600' as const,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
}); 