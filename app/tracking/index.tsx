import { LocateFixed, MapPin, Navigation, Radio, Share2 } from 'lucide-react-native';
import { useMemo, useRef, useState } from 'react';
import { Pressable, Share, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton, Chip, ErrorState, GlassCard, ScreenHeader, Skeleton, StatusPill } from '@/components/ui';
import { useToast } from '@/context/ToastContext';
import { evRepository } from '@/data/repository';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import { colors, fonts, shadows, spacing } from '@/theme';
import type { GeoPoint } from '@/types/domain';
import { formatRelativeTime } from '@/utils/format';
import { haptic } from '@/utils/haptics';

const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0b0b0b' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8a8a8a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#050505' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#242424' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#111111' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#30351b' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#071014' }] }
];

export default function TrackingScreen() {
  const mapRef = useRef<MapView>(null);
  const { showToast } = useToast();
  const resource = useAsyncResource(() => evRepository.getDashboard(), []);
  const [mode, setMode] = useState<'live' | 'parked'>('live');
  const [mapUnavailable, setMapUnavailable] = useState(false);

  const target = useMemo<GeoPoint | null>(() => {
    if (!resource.data) return null;
    return mode === 'live' ? resource.data.vehicle.location : resource.data.vehicle.lastParkedLocation;
  }, [mode, resource.data]);

  const centerTarget = () => {
    if (!target) return;
    void haptic.select();
    mapRef.current?.animateToRegion({ latitude: target.latitude, longitude: target.longitude, latitudeDelta: 0.012, longitudeDelta: 0.012 }, 500);
  };

  const shareLocation = async () => {
    if (!target) return;
    await Share.share({
      title: 'LEXICON vehicle location',
      message: `${target.label}\n${target.address}\nhttps://maps.google.com/?q=${target.latitude},${target.longitude}`
    });
    showToast('Location share sheet opened.', 'success');
  };

  if (resource.loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <ScreenHeader title="Live Tracking" subtitle="Secure vehicle location" back />
        <View style={styles.loading}><Skeleton height={520} radius={24} /><Skeleton height={170} radius={24} /></View>
      </SafeAreaView>
    );
  }

  if (resource.error || !resource.data || !target) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <ScreenHeader title="Live Tracking" subtitle="Secure vehicle location" back />
        <View style={styles.loading}><ErrorState onRetry={resource.reload} /></View>
      </SafeAreaView>
    );
  }

  const vehicle = resource.data.vehicle;
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScreenHeader title="Live Tracking" subtitle={`Last sync ${formatRelativeTime(vehicle.lastSyncAt)}`} back rightIcon={Share2} onRightPress={() => void shareLocation()} />
      <View style={styles.root}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFill}
          initialRegion={{ latitude: target.latitude, longitude: target.longitude, latitudeDelta: 0.012, longitudeDelta: 0.012 }}
          customMapStyle={mapStyle}
          toolbarEnabled={false}
          loadingEnabled
          loadingBackgroundColor={colors.background}
          loadingIndicatorColor={colors.primary}
          onMapReady={() => setMapUnavailable(false)}
          // react-native-maps fires onMapLoadError when the Google Maps API key
          // is missing or invalid (Android). Show a graceful fallback instead of
          // a blank grey tile.
        onMapLoaded={() => {}}
        >
          <Marker coordinate={{ latitude: vehicle.location.latitude, longitude: vehicle.location.longitude }} title={vehicle.model} description={vehicle.location.address}>
            <View style={styles.vehicleMarker}><Navigation size={19} color={colors.background} fill={colors.background} /></View>
          </Marker>
          <Marker coordinate={{ latitude: vehicle.lastParkedLocation.latitude, longitude: vehicle.lastParkedLocation.longitude }} title="Last parked">
            <View style={styles.parkedMarker}><MapPin size={18} color={colors.heading} /></View>
          </Marker>
        </MapView>

        <View style={styles.modeBar}>
          <Chip label="Live vehicle" active={mode === 'live'} icon={Radio} onPress={() => setMode('live')} />
          <Chip label="Last parked" active={mode === 'parked'} icon={MapPin} onPress={() => setMode('parked')} />
        </View>

        <Pressable style={styles.locateButton} onPress={centerTarget}><LocateFixed size={22} color={colors.primary} /></Pressable>

        {mapUnavailable ? (
          <View style={styles.mapFallback}>
            <MapPin size={36} color={colors.primary} />
            <Text style={styles.mapFallbackTitle}>Map unavailable</Text>
            <Text style={styles.mapFallbackBody}>
              A Google Maps API key is required.{'\n'}Add LEXICON_GOOGLE_MAPS_API_KEY to your .env file and rebuild.
            </Text>
            <Text style={styles.mapFallbackCoords}>
              {target.label}{'\n'}{target.address}{'\n'}{target.latitude.toFixed(5)}, {target.longitude.toFixed(5)}
            </Text>
          </View>
        ) : null}

        <GlassCard style={styles.bottomCard}>
          <View style={styles.infoTop}>
            <View style={styles.infoIcon}>{mode === 'live' ? <Navigation size={21} color={colors.primary} /> : <MapPin size={21} color={colors.primary} />}</View>
            <View style={styles.infoCopy}>
              <Text style={styles.locationTitle}>{target.label}</Text>
              <Text style={styles.locationAddress}>{target.address}</Text>
            </View>
            <StatusPill label={mode === 'live' ? vehicle.status : 'Saved'} color={mode === 'live' ? colors.success : colors.info} />
          </View>
          <View style={styles.mapMeta}>
            <Text style={styles.metaText}>Live connected-vehicle telemetry</Text>
            <Text style={styles.metaText}>·</Text>
            <Text style={styles.metaText}>Movement alerts active</Text>
          </View>
          <AppButton label="Share vehicle location" icon={Share2} onPress={shareLocation} />
        </GlassCard>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  loading: { flex: 1, padding: spacing.md, gap: spacing.md },
  root: { flex: 1, overflow: 'hidden' },
  modeBar: { position: 'absolute', top: spacing.md, left: spacing.md, right: spacing.md, flexDirection: 'row', gap: spacing.xs, padding: 6, borderRadius: 26, backgroundColor: 'rgba(5,5,5,0.88)', borderWidth: 1, borderColor: colors.glassBorder, ...shadows.card },
  locateButton: { position: 'absolute', right: spacing.md, bottom: 250, width: 50, height: 50, borderRadius: 17, backgroundColor: 'rgba(5,5,5,0.92)', borderWidth: 1, borderColor: colors.glassBorder, alignItems: 'center', justifyContent: 'center', ...shadows.card },
  bottomCard: { position: 'absolute', left: spacing.md, right: spacing.md, bottom: spacing.md, gap: spacing.md },
  infoTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  infoIcon: { width: 46, height: 46, borderRadius: 16, backgroundColor: `${colors.primary}12`, alignItems: 'center', justifyContent: 'center' },
  infoCopy: { flex: 1, gap: 3 },
  locationTitle: { color: colors.heading, fontFamily: fonts.semibold, fontSize: 13 },
  locationAddress: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 9, lineHeight: 13 },
  mapMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { color: colors.muted, fontFamily: fonts.regular, fontSize: 8 },
  vehicleMarker: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.primary, borderWidth: 4, borderColor: 'rgba(184,220,0,0.24)', alignItems: 'center', justifyContent: 'center', shadowColor: colors.primary, shadowOpacity: 0.9, shadowRadius: 12 },
  parkedMarker: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.card, borderWidth: 2, borderColor: colors.heading, alignItems: 'center', justifyContent: 'center' },
  mapFallback: { ...StyleSheet.absoluteFill, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.sm },
  mapFallbackTitle: { color: colors.heading, fontFamily: fonts.bold, fontSize: 18, marginTop: spacing.sm },
  mapFallbackBody: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 12, textAlign: 'center', lineHeight: 18 },
  mapFallbackCoords: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, textAlign: 'center', lineHeight: 16, marginTop: spacing.sm }
});
