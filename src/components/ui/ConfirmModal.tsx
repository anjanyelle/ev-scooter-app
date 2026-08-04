import { LogOut, X } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppButton } from './AppButton';
import { colors, fonts, radii, shadows, spacing } from '@/theme';

interface ConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  subtitle: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  icon?: ReactNode;
}

export function ConfirmModal({
  visible,
  onClose,
  onConfirm,
  title,
  subtitle,
  confirmLabel = 'Yes, Log Out',
  cancelLabel = 'Cancel',
  loading = false,
  icon
}: ConfirmModalProps) {
  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.card}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <X size={18} color={colors.secondary} />
          </Pressable>

          <View style={styles.iconContainer}>
            {icon ?? <LogOut size={26} color={colors.error} />}
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <View style={styles.buttonRow}>
            <View style={styles.buttonFlex}>
              <AppButton
                label={cancelLabel}
                variant="outline"
                onPress={onClose}
                disabled={loading}
              />
            </View>
            <View style={styles.buttonFlex}>
              <AppButton
                label={loading ? 'Logging out…' : confirmLabel}
                variant="danger"
                icon={LogOut}
                onPress={onConfirm}
                disabled={loading}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.82)',
  },
  card: {
    width: '100%',
    maxWidth: 380,
    borderRadius: radii.card,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.card,
    zIndex: 10,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: `${colors.error}15`,
    borderWidth: 1,
    borderColor: `${colors.error}30`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.bold,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  subtitle: {
    color: colors.secondary,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
  },
  buttonFlex: {
    flex: 1,
  },
});
