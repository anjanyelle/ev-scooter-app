import { ExternalLink, Globe2, Play, ShieldCheck, Sparkles } from 'lucide-react-native';
import LinearGradient from '@/components/system/LinearGradient';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { AppButton, GlassCard, Screen, ScreenHeader, SectionHeader } from '@/components/ui';
import { LexiconLogo } from '@/components/vehicle';
import { runtimeConfig } from '@/config/runtime';
import { colors, fonts, spacing } from '@/theme';

export default function AboutScreen() {
  const hasWebsite = runtimeConfig.companyWebsite.startsWith('https://');
  const hasPlayStore = runtimeConfig.playStoreUrl.startsWith('https://');

  return (
    <Screen bottomInset={32}>
      <ScreenHeader title="About LEXICON" subtitle="Electric mobility, made personal" back />

      <GlassCard padding={0} style={styles.hero}>
        <LinearGradient colors={[colors.background, '#111807', colors.background]} style={StyleSheet.absoluteFill} />
        <View style={styles.glow} />
        <LexiconLogo centered />
        <Text style={styles.tagline}>Move beyond ordinary.</Text>
        <Text style={styles.heroCopy}>LEXICON pairs intelligent electric performance with a calm, premium digital ownership experience.</Text>
        <View style={styles.badges}>
          <View style={styles.badge}><Sparkles size={14} color={colors.primary} /><Text style={styles.badgeText}>Connected EV</Text></View>
          <View style={styles.badge}><ShieldCheck size={14} color={colors.primary} /><Text style={styles.badgeText}>Android-first</Text></View>
        </View>
      </GlassCard>

      <SectionHeader title="Company website" subtitle={hasWebsite ? 'Official LEXICON web experience' : 'Configure the production website in .env'} />
      <GlassCard padding={0} style={styles.webCard}>
        <View style={styles.webToolbar}>
          <Globe2 size={16} color={colors.primary} />
          <Text style={styles.webAddress} numberOfLines={1}>{hasWebsite ? runtimeConfig.companyWebsite : 'Website not configured'}</Text>
          <ExternalLink size={15} color={colors.secondary} />
        </View>
        {hasWebsite ? (
          <WebView
            source={{ uri: runtimeConfig.companyWebsite }}
            style={styles.webview}
            containerStyle={styles.webContainer}
            originWhitelist={['https://*']}
            setSupportMultipleWindows={false}
            startInLoadingState
          />
        ) : (
          <View style={styles.unconfigured}>
            <Globe2 size={30} color={colors.primary} />
            <Text style={styles.unconfiguredTitle}>Production URL required</Text>
            <Text style={styles.unconfiguredText}>Set LEXICON_COMPANY_WEBSITE before creating the release build.</Text>
          </View>
        )}
      </GlassCard>

      <View style={styles.buttonStack}>
        <AppButton
          label="Open official website"
          icon={ExternalLink}
          variant="secondary"
          disabled={!hasWebsite}
          onPress={() => Linking.openURL(runtimeConfig.companyWebsite)}
        />
        <AppButton
          label="Open Google Play listing"
          icon={Play}
          disabled={!hasPlayStore}
          onPress={() => Linking.openURL(runtimeConfig.playStoreUrl)}
        />
      </View>

      <Text style={styles.legal}>Operational URLs are environment-configured so release builds do not open unconfigured destinations.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { minHeight: 290, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, overflow: 'hidden', gap: spacing.sm },
  glow: { position: 'absolute', width: 230, height: 230, borderRadius: 115, backgroundColor: 'rgba(184,220,0,0.08)', shadowColor: colors.primary, shadowOpacity: 0.45, shadowRadius: 60 },
  tagline: { color: colors.heading, fontFamily: fonts.bold, fontSize: 22, marginTop: spacing.sm },
  heroCopy: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 11, lineHeight: 18, textAlign: 'center', maxWidth: 300 },
  badges: { flexDirection: 'row', gap: spacing.xs, marginTop: spacing.sm },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 20, paddingHorizontal: spacing.sm, paddingVertical: 7, backgroundColor: `${colors.primary}0D`, borderWidth: 1, borderColor: `${colors.primary}35` },
  badgeText: { color: colors.primaryLight, fontFamily: fonts.medium, fontSize: 8 },
  webCard: { height: 390, overflow: 'hidden' },
  webToolbar: { height: 48, flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingHorizontal: spacing.md, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  webAddress: { flex: 1, color: colors.secondary, fontFamily: fonts.regular, fontSize: 9 },
  webview: { flex: 1, backgroundColor: colors.heading },
  webContainer: { flex: 1 },
  unconfigured: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm, padding: spacing.xl },
  unconfiguredTitle: { color: colors.heading, fontFamily: fonts.semibold, fontSize: 15 },
  unconfiguredText: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 10, lineHeight: 16, textAlign: 'center' },
  buttonStack: { gap: spacing.sm },
  legal: { color: colors.muted, fontFamily: fonts.regular, fontSize: 8, textAlign: 'center', lineHeight: 13, paddingHorizontal: spacing.lg }
});
