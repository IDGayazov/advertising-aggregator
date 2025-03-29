import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue,
  withSequence 
} from 'react-native-reanimated';

export default function Login() {
  const router = useRouter();
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const handleLogin = () => {
    rotation.value = withSequence(
      withSpring(90),
      withSpring(0)
    );
    router.replace('/(app)/(tabs)');
  };

  return (
    <LinearGradient
      colors={['#6E88F5', '#8A6FF5']}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>AdHub</Text>
        <Text style={styles.subtitle}>Платформа для размещения рекламы</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите ваш email"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Пароль</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите пароль"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Войти</Text>
          <Animated.View style={animatedStyles}>
            <ArrowRight color="#FFF" size={24} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 32,
    color: '#6E88F5',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFF',
    borderRadius: 12,
    padding: 15,
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: '#FFF',
    marginRight: 10,
  },
});