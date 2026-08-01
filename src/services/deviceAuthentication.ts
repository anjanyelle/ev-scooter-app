import * as Keychain from 'react-native-keychain';

export interface DeviceAuthenticationResult {
  success: boolean;
  message?: string;
}

const COMMAND_AUTH_SERVICE = 'lexicon.vehicle.command.auth.v1';
const authenticationPrompt = {
  title: 'Authorize LEXICON vehicle command',
  subtitle: 'Confirm your identity before changing the vehicle lock state.',
  cancel: 'Cancel'
} as const;

export async function authenticateVehicleCommand(): Promise<DeviceAuthenticationResult> {
  try {
    const [biometryType, passcodeAvailable] = await Promise.all([
      Keychain.getSupportedBiometryType(),
      Keychain.isPasscodeAuthAvailable()
    ]);

    if (!biometryType && !passcodeAvailable) {
      return { success: false, message: 'Add a fingerprint or screen lock in Android settings first.' };
    }

    const exists = await Keychain.hasGenericPassword({ service: COMMAND_AUTH_SERVICE });
    if (!exists) {
      const created = await Keychain.setGenericPassword('lexicon', 'vehicle-command', {
        service: COMMAND_AUTH_SERVICE,
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
        storage: Keychain.STORAGE_TYPE.AES_GCM,
        securityLevel: Keychain.SECURITY_LEVEL.SECURE_SOFTWARE,
        authenticationPrompt
      });
      if (!created) {
        return { success: false, message: 'Device authentication could not be prepared.' };
      }
    }

    const result = await Keychain.getGenericPassword({
      service: COMMAND_AUTH_SERVICE,
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
      authenticationPrompt
    });

    return result
      ? { success: true }
      : { success: false, message: 'Authentication was not successful.' };
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : '';
    return {
      success: false,
      message: message.includes('cancel')
        ? 'Authentication cancelled.'
        : 'Authentication was not successful.'
    };
  }
}
