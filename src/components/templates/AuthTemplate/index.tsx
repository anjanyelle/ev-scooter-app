/**
 * AuthTemplate Component
 * Reusable auth screen layout (scrollable, safe area, keyboard avoiding)
 */

import React from 'react';
import { View, StyleSheet, ScrollView, ViewStyle, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme';
import { AuthHeader } from '../../organisms/AuthHeader';
import { HeroVehicleSection } from '../../organisms/HeroVehicleSection';

export interface AuthTemplateProps {
  children: React.ReactNode;
  showHero?: boolean;
  showHeader?: boolean;
  title?: string;
  subtitle?: string;
  onBackPress?: () => void;
  style?: ViewStyle;
}

export const AuthTemplate: React.FC<AuthTemplateProps> = ({
  children,
  showHero = true,
  showHeader = true,
  title,
  subtitle,
  onBackPress,
  style,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background.primary} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 20 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          {showHeader && (
            <AuthHeader onBackPress={onBackPress} showBackButton={!!onBackPress} style={styles.header} />
          )}

          {/* Hero Section (now includes branding, title, subtitle) */}
          {showHero && (
            <HeroVehicleSection 
              brandName="LEXICON"
              title={title}
              subtitle={subtitle}
            />
          )}

          {/* Form Content */}
          <View style={styles.formContainer}>
            {children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    marginBottom: 4,
  },
  formContainer: {
    flex: 1,
    marginTop: -28,
    zIndex: 5,
  },
});