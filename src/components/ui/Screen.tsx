import type { PropsWithChildren, ReactNode } from 'react';
import type { RefreshControlProps, StyleProp, ViewStyle } from 'react-native';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout, spacing } from '@/theme';

interface ScreenProps extends PropsWithChildren {
  scroll?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  header?: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  bottomInset?: number;
}

export function Screen({ children, scroll = true, refreshing = false, onRefresh, header, contentStyle, bottomInset = layout.bottomTabHeight + spacing.xxl + 20 }: ScreenProps) {
  const refreshProps: RefreshControlProps = { refreshing, tintColor: colors.primary, colors: [colors.primary] };
  if (onRefresh) refreshProps.onRefresh = onRefresh;
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {header}
      {scroll ? (
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: bottomInset }, contentStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          refreshControl={onRefresh ? <RefreshControl {...refreshProps} /> : undefined}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, styles.flex, { paddingBottom: bottomInset }, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: layout.screenPadding, gap: spacing.md },
  flex: { flex: 1 }
});
