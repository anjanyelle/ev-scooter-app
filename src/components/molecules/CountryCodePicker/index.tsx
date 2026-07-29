/**
 * CountryCodePicker Component
 * Dropdown for country codes
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../../theme';
import { AppText } from '../../atoms/AppText';
import { AppIcon } from '../../atoms/AppIcon';

export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

export interface CountryCodePickerProps {
  visible: boolean;
  selectedCountry: Country;
  countries: Country[];
  onSelect: (country: Country) => void;
  onClose: () => void;
}

export const CountryCodePicker: React.FC<CountryCodePickerProps> = ({
  visible,
  selectedCountry,
  countries,
  onSelect,
  onClose,
}) => {
  const theme = useTheme();

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1}>
        <View style={[styles.container, { backgroundColor: theme.colors.background.surface }]}>
          <View style={styles.header}>
            <AppText variant="h4" color="primary" style={styles.title}>
              Select Country
            </AppText>
            <TouchableOpacity onPress={onClose}>
              <AppIcon name="close" size={24} color="secondary" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.list}>
            {countries.map((country) => (
              <TouchableOpacity
                key={country.code}
                style={[
                  styles.countryItem,
                  selectedCountry.code === country.code && styles.selectedItem,
                ]}
                onPress={() => onSelect(country)}
              >
                <AppText variant="bodyMedium" color="primary">
                  {country.flag} {country.name}
                </AppText>
                <AppText variant="bodyMedium" color="secondary">
                  {country.dialCode}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  container: {
    maxHeight: '70%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontWeight: '600',
  },
  list: {
    maxHeight: 400,
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedItem: {
    backgroundColor: 'rgba(184, 220, 0, 0.1)',
  },
});