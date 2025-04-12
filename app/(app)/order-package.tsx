import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '@/utils/theme';
import { router } from 'expo-router';

export default function OrderPackageScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Оформление заказа</Text>
      <TouchableOpacity 
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelButtonText}>Отменить</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: COLORS.error,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 