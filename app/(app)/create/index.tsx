import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { Image, MapPin, DollarSign, Calendar } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { COLORS, SPACING, LAYOUT, SHADOWS, TYPOGRAPHY } from '../../../utils/theme';

const TYPES = ['Билборд', 'Лифт', 'Автобус', 'Мероприятие'];

export default function CreateAdSpaceScreen() {
  const [selectedType, setSelectedType] = useState('Билборд');
  const [currentStep, setCurrentStep] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
                placeholderTextColor={COLORS.textLight}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Описание</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Опишите вашу рекламную площадку"
                placeholderTextColor={COLORS.textLight}
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
              <Image size={24} color={COLORS.primary} />
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
                <MapPin size={20} color={COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.inputWithIconField}
                  placeholder="Введите адрес"
                  placeholderTextColor={COLORS.textLight}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Стоимость в месяц</Text>
              <View style={styles.inputWithIcon}>
                <DollarSign size={20} color={COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.inputWithIconField}
                  placeholder="Введите стоимость"
                  placeholderTextColor={COLORS.textLight}
                  keyboardType="numeric"
                />
              </View>
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Период доступности</Text>
              <View style={styles.dateRangeContainer}>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.dateLabel}>С</Text>
                  <View style={styles.inputWithIcon}>
                    <Calendar size={20} color={COLORS.textLight} style={styles.inputIcon} />
                    <TextInput
                      style={styles.inputWithIconField}
                      placeholder="дд.мм.гггг"
                      placeholderTextColor={COLORS.textLight}
                      value={startDate}
                      onChangeText={setStartDate}
                    />
                  </View>
                </View>
                
                <View style={styles.dateInputContainer}>
                  <Text style={styles.dateLabel}>По</Text>
                  <View style={styles.inputWithIcon}>
                    <Calendar size={20} color={COLORS.textLight} style={styles.inputIcon} />
                    <TextInput
                      style={styles.inputWithIconField}
                      placeholder="дд.мм.гггг"
                      placeholderTextColor={COLORS.textLight}
                      value={endDate}
                      onChangeText={setEndDate}
                    />
                  </View>
                </View>
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
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
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
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  progressStep: {
    width: 70,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: COLORS.primary,
  },
  stepContent: {
    flex: 1,
  },
  stepContainer: {
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.large,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  stepTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  typeButton: {
    backgroundColor: COLORS.background,
    borderRadius: LAYOUT.borderRadius.medium,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    margin: 5,
    ...SHADOWS.small,
  },
  typeButtonActive: {
    backgroundColor: COLORS.primary,
  },
  typeButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: COLORS.text,
  },
  typeButtonTextActive: {
    color: COLORS.white,
  },
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: LAYOUT.borderRadius.medium,
    padding: SPACING.md,
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: COLORS.background,
    borderRadius: LAYOUT.borderRadius.medium,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    ...SHADOWS.small,
  },
  uploadButtonText: {
    color: COLORS.primary,
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    marginLeft: SPACING.sm,
  },
  inputWithIcon: {
    backgroundColor: COLORS.background,
    borderRadius: LAYOUT.borderRadius.medium,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  inputWithIconField: {
    flex: 1,
    padding: SPACING.md,
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: COLORS.text,
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.small,
  },
  backButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: LAYOUT.borderRadius.medium,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  backButtonText: {
    color: COLORS.primary,
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    borderRadius: LAYOUT.borderRadius.medium,
    flex: 1,
    marginLeft: SPACING.sm,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  submitButton: {
    backgroundColor: COLORS.success,
  },
  nextButtonText: {
    color: COLORS.white,
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  dateLabel: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
  },
});