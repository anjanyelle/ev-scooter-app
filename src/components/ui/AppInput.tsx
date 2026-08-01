import type { LucideIcon } from 'lucide-react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import type { TextInputProps } from 'react-native';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, fonts, radii, spacing } from '@/theme';

interface AppInputProps extends TextInputProps {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

export function AppInput({ label, icon: Icon, error, secureTextEntry, style, ...props }: AppInputProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(Boolean(secureTextEntry));
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrap, focused ? styles.focused : null, error ? styles.errorBorder : null]}>
        {Icon ? <Icon size={19} color={focused ? colors.primary : colors.muted} /> : null}
        <TextInput
          {...props}
          secureTextEntry={secureTextEntry ? hidden : false}
          onFocus={(event) => { setFocused(true); props.onFocus?.(event); }}
          onBlur={(event) => { setFocused(false); props.onBlur?.(event); }}
          placeholderTextColor={colors.muted}
          selectionColor={colors.primary}
          style={[styles.input, style]}
        />
        {secureTextEntry ? (
          <Pressable onPress={() => setHidden((value) => !value)} hitSlop={10}>
            {hidden ? <Eye size={19} color={colors.muted} /> : <EyeOff size={19} color={colors.muted} />}
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: spacing.xs },
  label: { color: colors.secondary, fontFamily: fonts.medium, fontSize: 13 },
  inputWrap: {
    minHeight: 54,
    borderRadius: radii.input,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  focused: { borderColor: colors.primary, backgroundColor: colors.cardHover },
  errorBorder: { borderColor: colors.error },
  input: { flex: 1, color: colors.heading, fontFamily: fonts.regular, fontSize: 15, paddingVertical: 0 },
  error: { color: colors.error, fontFamily: fonts.regular, fontSize: 12 }
});
