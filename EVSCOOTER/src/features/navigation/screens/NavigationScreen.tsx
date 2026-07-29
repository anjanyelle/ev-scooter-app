/**
 * NavigationScreen — Map + destination search
 * Matches the provided reference design exactly
 */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path, Circle, Polyline, Defs, RadialGradient, Stop} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Spacing, BorderRadius} from '../../../theme';
import {AppText} from '../../../components/atoms/AppText';
import {AppIcon} from '../../../components/atoms/AppIcon';
import {SearchBar} from '../../../components/molecules/SearchBar';
import {SectionHeader} from '../../../components/molecules/SectionHeader';
import {AppButton} from '../../../components/atoms/AppButton';
import {GlassCard} from '../../../components/molecules/GlassCard';
import {
  MOCK_RECENT_DESTINATIONS,
  MOCK_FAVOURITE_PLACES,
} from '../../../constants/mockData';

const {width, height} = Dimensions.get('window');
const MAP_HEIGHT = height * 0.38;

// ─── Mock dark map rendered with SVG ─────────────────────────────────────────
const MockMap: React.FC = () => (
  <View style={mapStyles.container}>
    <Svg width={width} height={MAP_HEIGHT}>
      <Defs>
        <RadialGradient id="glow" cx="50%" cy="60%" rx="40%" ry="40%">
          <Stop offset="0%" stopColor={Colors.primary} stopOpacity="0.15" />
          <Stop offset="100%" stopColor={Colors.background} stopOpacity="0" />
        </RadialGradient>
      </Defs>
      {/* Background */}
      <Path d={`M0,0 H${width} V${MAP_HEIGHT} H0Z`} fill="#0A0A0A" />
      {/* Grid roads */}
      {[...Array(8)].map((_, i) => (
        <Path
          key={`h${i}`}
          d={`M0,${(MAP_HEIGHT / 8) * i} H${width}`}
          stroke="#1A1A1A"
          strokeWidth={1}
        />
      ))}
      {[...Array(10)].map((_, i) => (
        <Path
          key={`v${i}`}
          d={`M${(width / 10) * i},0 V${MAP_HEIGHT}`}
          stroke="#1A1A1A"
          strokeWidth={1}
        />
      ))}
      {/* Main roads */}
      <Path d={`M0,${MAP_HEIGHT * 0.4} H${width}`} stroke="#2A2A2A" strokeWidth={8} />
      <Path d={`M${width * 0.35},0 V${MAP_HEIGHT}`} stroke="#2A2A2A" strokeWidth={6} />
      <Path d={`M${width * 0.7},0 V${MAP_HEIGHT}`} stroke="#2A2A2A" strokeWidth={5} />
      <Path
        d={`M0,${MAP_HEIGHT * 0.65} Q${width * 0.5},${MAP_HEIGHT * 0.3} ${width},${MAP_HEIGHT * 0.55}`}
        stroke="#252525"
        strokeWidth={10}
        fill="none"
      />
      {/* Neon route */}
      <Polyline
        points={`${width * 0.4},${MAP_HEIGHT * 0.8} ${width * 0.4},${MAP_HEIGHT * 0.4} ${width * 0.65},${MAP_HEIGHT * 0.2}`}
        stroke={Colors.primary}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.9}
      />
      {/* Glow overlay */}
      <Path d={`M0,0 H${width} V${MAP_HEIGHT} H0Z`} fill="url(#glow)" />
      {/* Vehicle marker */}
      <Circle cx={width * 0.4} cy={MAP_HEIGHT * 0.78} r={10} fill={Colors.primary} opacity={0.9} />
      <Circle cx={width * 0.4} cy={MAP_HEIGHT * 0.78} r={18} fill={Colors.primary} opacity={0.15} />
      {/* Destination marker */}
      <Circle cx={width * 0.65} cy={MAP_HEIGHT * 0.2} r={8} fill={Colors.primary} />
      <Circle cx={width * 0.65} cy={MAP_HEIGHT * 0.2} r={16} fill={Colors.primary} opacity={0.2} />
    </Svg>

    {/* Temp badge */}
    <View style={mapStyles.tempBadge}>
      <AppIcon name="partly-sunny-outline" library="ionicons" size={14} color={Colors.primary} />
      <AppText variant="caption" color={Colors.textHeading} weight="semiBold">
        34°C
      </AppText>
    </View>

    {/* Map controls */}
    <View style={mapStyles.controls}>
      <MapControl icon="locate-outline" />
      <MapControl icon="diamond-outline" />
      <MapControl icon="navigate-outline" />
    </View>

    {/* Bottom status pill */}
    <View style={mapStyles.statusPill}>
      <View style={mapStyles.greenDot} />
      <AppText variant="caption" color={Colors.textHeading} weight="semiBold">
        Unlocked
      </AppText>
    </View>
  </View>
);

const MapControl: React.FC<{icon: string}> = ({icon}) => (
  <TouchableOpacity style={mapStyles.control} activeOpacity={0.8}>
    <AppIcon name={icon} library="ionicons" size={18} color={Colors.textHeading} />
  </TouchableOpacity>
);

const mapStyles = StyleSheet.create({
  container: {
    height: MAP_HEIGHT,
    position: 'relative',
    overflow: 'hidden',
  },
  tempBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.glassBg,
    borderRadius: BorderRadius.chip,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 5,
  },
  controls: {
    position: 'absolute',
    right: Spacing.md,
    bottom: Spacing.xxl,
    gap: Spacing.xs,
  },
  control: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPill: {
    position: 'absolute',
    bottom: Spacing.md,
    left: '50%',
    transform: [{translateX: -45}],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.chip,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
});

// ─── Main Screen ──────────────────────────────────────────────────────────────
export const NavigationScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  return (
    <LinearGradient colors={Colors.gradientHero} style={styles.container}>
      {/* Header */}
      <View style={[styles.header, {paddingTop: insets.top + Spacing.xs}]}>
        <View>
          <AppText variant="h3" weight="bold">
            Navigation
          </AppText>
          <AppText variant="small" style={styles.subtitle}>
            Navigate with HERE Maps
          </AppText>
        </View>
        <TouchableOpacity style={styles.vehicleSelector} activeOpacity={0.8}>
          <AppText variant="caption" color={Colors.primary} weight="semiBold">
            Lexicon
          </AppText>
          <AppIcon name="chevron-down" library="ionicons" size={14} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Map */}
      <MockMap />

      {/* ── Bottom Sheet ── */}
      <View style={styles.bottomSheet}>
        {/* Handle */}
        <View style={styles.handle} />

        <ScrollView showsVerticalScrollIndicator={false} style={styles.sheetScroll}>
          {/* Search */}
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search Destination"
            onMicPress={() => {}}
          />

          {/* Recent Destinations */}
          <View style={styles.section}>
            <SectionHeader
              title="Recent Destinations"
              onAction={() => {}}
              style={styles.sectionHeader}
            />
            {MOCK_RECENT_DESTINATIONS.map(dest => (
              <TouchableOpacity
                key={dest.id}
                style={styles.destRow}
                activeOpacity={0.7}>
                <View style={styles.destIconBox}>
                  <AppIcon
                    name="time-outline"
                    library="ionicons"
                    size={16}
                    color={Colors.iconMuted}
                  />
                </View>
                <View style={styles.destText}>
                  <AppText variant="body" numberOfLines={1}>
                    {dest.name}
                  </AppText>
                  <AppText variant="small" style={styles.destAddr} numberOfLines={1}>
                    {dest.address}
                  </AppText>
                </View>
                <AppIcon
                  name="arrow-redo-outline"
                  library="ionicons"
                  size={16}
                  color={Colors.iconMuted}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Favourites */}
          <View style={styles.section}>
            <SectionHeader
              title="Favourites"
              onAction={() => {}}
              style={styles.sectionHeader}
            />
            <View style={styles.favouritesGrid}>
              {MOCK_FAVOURITE_PLACES.map(place => (
                <TouchableOpacity
                  key={place.id}
                  style={styles.favCard}
                  activeOpacity={0.8}>
                  <View style={styles.favIconBox}>
                    <AppIcon
                      name={
                        place.icon === 'home'
                          ? 'home-outline'
                          : place.icon === 'briefcase'
                          ? 'briefcase-outline'
                          : place.icon === 'heart'
                          ? 'heart-outline'
                          : 'add-outline'
                      }
                      library="ionicons"
                      size={20}
                      color={Colors.primary}
                    />
                  </View>
                  <AppText variant="small" style={styles.favLabel} numberOfLines={1}>
                    {place.label}
                  </AppText>
                  {place.address && (
                    <AppText variant="small" style={styles.favAddress} numberOfLines={1}>
                      {place.address}
                    </AppText>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actionRow}>
            <AppButton
              label="Share Location"
              onPress={() => {}}
              variant="outline"
              icon="share-outline"
              iconLibrary="ionicons"
              iconPosition="left"
              size="md"
              style={styles.actionBtn}
            />
            <AppButton
              label="Send to Scooter"
              onPress={() => {}}
              variant="primary"
              icon="arrow-redo-outline"
              iconLibrary="ionicons"
              iconPosition="right"
              size="md"
              style={styles.actionBtn}
            />
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xs,
  },
  subtitle: {
    color: Colors.textMuted,
    marginTop: 2,
  },
  vehicleSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(184,220,0,0.08)',
    borderRadius: BorderRadius.chip,
    borderWidth: 1,
    borderColor: 'rgba(184,220,0,0.2)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs + 2,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius.bottomSheet,
    borderTopRightRadius: BorderRadius.bottomSheet,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderColor: Colors.border,
    marginTop: -BorderRadius.bottomSheet / 2,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  sheetScroll: {flex: 1},
  section: {
    marginTop: Spacing.lg,
    gap: Spacing.xs,
  },
  sectionHeader: {
    marginBottom: Spacing.xxs,
  },
  destRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs + 2,
    gap: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  destIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  destText: {
    flex: 1,
    gap: 2,
  },
  destAddr: {
    color: Colors.textMuted,
  },
  favouritesGrid: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  favCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xs,
    alignItems: 'center',
    gap: 4,
  },
  favIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(184,220,0,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favLabel: {
    color: Colors.textBody,
    fontWeight: '600',
    textAlign: 'center',
  },
  favAddress: {
    color: Colors.textMuted,
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  actionBtn: {
    flex: 1,
  },
});
