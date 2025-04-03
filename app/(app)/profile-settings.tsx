import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, Mail, Phone, User } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

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
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Редактировать профиль</Text>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Сохранить</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: userData.avatar }}
            style={styles.avatar}
          />
          <TouchableOpacity 
            style={styles.changeAvatarButton}
            onPress={showImagePickerOptions}
          >
            <Camera size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Имя</Text>
          <View style={styles.inputContainer}>
            <User size={20} color="#666" />
            <TextInput
              style={styles.input}
              value={userData.name}
              onChangeText={(text) => setUserData({...userData, name: text})}
              placeholder="Введите ваше имя"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <Mail size={20} color="#666" />
            <TextInput
              style={styles.input}
              value={userData.email}
              onChangeText={(text) => setUserData({...userData, email: text})}
              placeholder="Введите ваш email"
              keyboardType="email-address"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Телефон</Text>
          <View style={styles.inputContainer}>
            <Phone size={20} color="#666" />
            <TextInput
              style={styles.input}
              value={userData.phone}
              onChangeText={(text) => setUserData({...userData, phone: text})}
              placeholder="Введите ваш телефон"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: '#333',
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#6E88F5',
  },
  content: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    position: 'absolute',
    right: '35%',
    bottom: 0,
    backgroundColor: '#6E88F5',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#333',
  },
}); 