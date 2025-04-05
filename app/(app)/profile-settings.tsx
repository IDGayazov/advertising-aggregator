import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, Mail, Phone, User } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SPACING, LAYOUT, SHADOWS, TYPOGRAPHY } from '../../utils/theme';

export default function ProfileSettingsScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: 'Александр Петров',
    email: 'alex@example.com',
    phone: '+7 (999) 123-45-67',
    role: 'Рекламодатель',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop'
  });

  const pickImage = async () => {
    try {
      // Запрашиваем разрешение на доступ к галерее
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Необходимо разрешение',
          'Пожалуйста, разрешите доступ к галерее в настройках устройства'
        );
        return;
      }

      // Открываем галерею для выбора изображения
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        // Обновляем аватар новым изображением
        setUserData(prev => ({
          ...prev,
          avatar: result.assets[0].uri
        }));
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить изображение');
    }
  };

  const takePhoto = async () => {
    try {
      // Запрашиваем разрешение на доступ к камере
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Необходимо разрешение',
          'Пожалуйста, разрешите доступ к камере в настройках устройства'
        );
        return;
      }

      // Открываем камеру
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setUserData(prev => ({
          ...prev,
          avatar: result.assets[0].uri
        }));
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сделать фото');
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Изменить фото профиля',
      'Выберите источник фото',
      [
        {
          text: 'Сделать фото',
          onPress: takePhoto
        },
        {
          text: 'Выбрать из галереи',
          onPress: pickImage
        },
        {
          text: 'Отмена',
          style: 'cancel'
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Редактировать профиль</Text>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Сохранить</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: userData.avatar }}
            style={styles.avatar}
          />
          <TouchableOpacity 
            style={styles.changeAvatarButton}
            onPress={showImagePickerOptions}
          >
            <Camera size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Имя</Text>
          <View style={styles.inputContainer}>
            <User size={20} color={COLORS.textLight} />
            <TextInput
              style={styles.input}
              value={userData.name}
              onChangeText={(text) => setUserData({...userData, name: text})}
              placeholder="Введите ваше имя"
              placeholderTextColor={COLORS.textLight}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <Mail size={20} color={COLORS.textLight} />
            <TextInput
              style={styles.input}
              value={userData.email}
              onChangeText={(text) => setUserData({...userData, email: text})}
              placeholder="Введите ваш email"
              keyboardType="email-address"
              placeholderTextColor={COLORS.textLight}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Телефон</Text>
          <View style={styles.inputContainer}>
            <Phone size={20} color={COLORS.textLight} />
            <TextInput
              style={styles.input}
              value={userData.phone}
              onChangeText={(text) => setUserData({...userData, phone: text})}
              placeholder="Введите ваш телефон"
              keyboardType="phone-pad"
              placeholderTextColor={COLORS.textLight}
            />
          </View>
        </View>
        
        <TouchableOpacity style={styles.saveButtonLarge}>
          <Text style={styles.saveButtonLargeText}>Сохранить изменения</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.small,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: COLORS.text,
  },
  saveButton: {
    padding: SPACING.sm,
  },
  saveButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: COLORS.primary,
  },
  content: {
    padding: SPACING.lg,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  changeAvatarButton: {
    position: 'absolute',
    right: '35%',
    bottom: 0,
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  formGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.medium,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  input: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: COLORS.text,
  },
  saveButtonLarge: {
    backgroundColor: COLORS.primary,
    borderRadius: LAYOUT.borderRadius.medium,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.small,
  },
  saveButtonLargeText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: COLORS.white,
  },
}); 