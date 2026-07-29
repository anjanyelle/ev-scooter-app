/**
 * ScreenWrapper — Base layout organism
 * Wraps every screen with safe area, scroll, and background gradient
 */
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ViewStyle,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Spacing} from '../../theme';

interface ScreenWrapperProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  noPadding?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  gradientColors?: string[];
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scrollable = true,
  style,
  contentStyle,
  noPadding = false,
  refreshing = false,
  onRefresh,
  gradientColors = Colors.gradientHero,
}) => {
  const insets = useSafeAreaInsets();

  const content = (
    <View
      style={[
        styles.content,
        !noPadding && styles.padding,
        {paddingBottom: insets.bottom + Spacing.xl},
        contentStyle,
      ]}>
      {children}
    </View>
  );

  return (
    <LinearGradient colors={gradientColors} style={[styles.gradient, style]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      {scrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.primary}
                colors={[Colors.primary]}
              />
            ) : undefined
          }>
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
  },
});
