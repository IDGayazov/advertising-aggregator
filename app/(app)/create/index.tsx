import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Image, MapPin, DollarSign, Calendar } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

const TYPES = ['Билборд', 'Лифт', 'Автобус', 'Мероприятие'];

export default function CreateAdSpaceScreen() {
  const [selectedType, setSelectedType] = useState('Билборд');
  const [currentStep, setCurrentStep] = useState(1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Тип площадки</Text>
            <View style={styles.typeContainer}>
              {TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    selectedType === type && styles.typeButtonActive,
                  ]}
                  onPress={() => setSelectedType(type)}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      selectedType === type && styles.typeButtonTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Информация</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Название</Text>
              <TextInput
                style={styles.input}
                placeholder="Например: Билборд на Невском"
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Описание</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Опишите вашу рекламную площадку"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Медиафайлы</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Image size={24} color="#6E88F5" />
              <Text style={styles.uploadButtonText}>Добавить фото</Text>
            </TouchableOpacity>
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Расположение и цена</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Адрес</Text>
              <View style={styles.inputWithIcon}>
                <MapPin size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.inputWithIconField}
                  placeholder="Введите адрес"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Стоимость в месяц</Text>
              <View style={styles.inputWithIcon}>
                <DollarSign size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.inputWithIconField}
                  placeholder="Введите стоимость"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.progressContainer}>
          {[1, 2, 3, 4].map((step) => (
            <View
              key={step}
              style={[
                styles.progressStep,
                currentStep >= step && styles.progressStepActive,
              ]}
            />
          ))}
        </View>

        <Animated.View
          entering={FadeInRight}
          style={styles.stepContent}
        >
          {renderStep()}
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        {currentStep > 1 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Text style={styles.backButtonText}>Назад</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.nextButton, currentStep === 4 && styles.submitButton]}
          onPress={() => {
            if (currentStep < 4) {
              setCurrentStep(currentStep + 1);
            } else {
              // Handle submission
            }
          }}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === 4 ? 'Опубликовать' : 'Далее'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  progressStep: {
    width: 70,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: '#6E88F5',
  },
  stepContent: {
    flex: 1,
  },
  stepContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  stepTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  typeButton: {
    backgroundColor: '#F9FAFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 5,
  },
  typeButtonActive: {
    backgroundColor: '#6E88F5',
  },
  typeButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#666',
  },
  typeButtonTextActive: {
    color: '#FFF',
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
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#F9FAFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#6E88F5',
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#6E88F5',
    marginLeft: 10,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFF',
    borderRadius: 12,
    padding: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputWithIconField: {
    flex: 1,
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  backButton: {
    flex: 1,
    backgroundColor: '#F9FAFF',
    borderRadius: 12,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
  },
  backButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#666',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#6E88F5',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#4ECDC4',
  },
  nextButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#FFF',
  },
});