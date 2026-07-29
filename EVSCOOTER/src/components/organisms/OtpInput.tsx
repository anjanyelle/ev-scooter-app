/**
 * OtpInput — 6-digit OTP entry organism
 * Each box highlights with neon lime on focus
 */
import React, {useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, BorderRadius, FontSize, FontWeight, Spacing} from '../../theme';

interface OtpInputProps {
  value: string;
  onChange: (val: string) => void;
  length?: number;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  length = 6,
}) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const digits = value.split('').concat(Array(length).fill('')).slice(0, length);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => inputRef.current?.focus()}
      style={styles.container}>
      {/* Hidden real input */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={text => {
          const cleaned = text.replace(/[^0-9]/g, '').slice(0, length);
          onChange(cleaned);
        }}
        keyboardType="number-pad"
        maxLength={length}
        style={styles.hiddenInput}
        caretHidden
      />
      {/* Visible digit boxes */}
      {digits.map((digit, index) => {
        const isFilled = index < value.length;
        const isCurrent = index === value.length;
        return (
          <View
            key={index}
            style={[
              styles.box,
              isFilled && styles.filledBox,
              isCurrent && styles.activeBox,
            ]}>
            <TextInput
              value={digit}
              editable={false}
              style={styles.digitText}
              pointerEvents="none"
            />
          </View>
        );
      })}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.xs,
    alignItems: 'center',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  box: {
    flex: 1,
    height: 56,
    borderRadius: BorderRadius.input,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledBox: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(184,220,0,0.06)',
  },
  activeBox: {
    borderColor: Colors.primary,
    shadowColor: Colors.shadowPrimaryGlow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 4,
  },
  digitText: {
    fontSize: FontSize.h2,
    fontWeight: FontWeight.bold,
    color: Colors.textHeading,
    textAlign: 'center',
    height: '100%',
    width: '100%',
    paddingVertical: 0,
  },
});
