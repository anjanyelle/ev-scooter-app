import {
  CalendarCheck,
  ChevronRight,
  Download,
  FileCheck2,
  FileText,
  Headphones,
  MapPin,
  PhoneCall,
  ReceiptText,
  ShieldCheck,
  Star,
  Wrench
} from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppButton, ErrorState, BottomSheet, Chip, GlassCard, Screen, ScreenHeader, SectionHeader, Skeleton } from '@/components/ui';
import { useToast } from '@/context/ToastContext';
import { evRepository } from '@/data/repository';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import { colors, fonts, radii, spacing } from '@/theme';
import { shortDate } from '@/utils/format';
import { haptic } from '@/utils/haptics';

const slots = ['09:30 AM', '11:00 AM', '02:00 PM', '04:30 PM'];

export default function ServiceScreen() {
  const { showToast } = useToast();
  const resource = useAsyncResource(() => evRepository.getService(), []);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [dealerId, setDealerId] = useState<string | null>(null);
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [date, setDate] = useState(today);
  const [slot, setSlot] = useState(slots[1] ?? '11:00 AM');
  const [booking, setBooking] = useState(false);

  const dateOptions = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return Array.from({ length: 5 }, (_, index) => {
      const next = new Date(start);
      next.setDate(start.getDate() + index);
      return next.toISOString().slice(0, 10);
    });
  }, []);

  const confirmBooking = async () => {
    const selectedDealer = dealerId ?? resource.data?.dealers[0]?.id;
    if (!selectedDealer) return;
    setBooking(true);
    try {
      const result = await evRepository.bookService({ dealerId: selectedDealer, date, slot });
      await haptic.success();
      showToast(`${result.message} · ${result.bookingId}`, 'success');
      setBookingOpen(false);
    } catch {
      showToast('Service booking could not be completed.', 'error');
    } finally {
      setBooking(false);
    }
  };

  if (resource.loading) {
    return (
      <Screen header={<ScreenHeader title="Service & Documents" subtitle="Keep your LEXICON in peak condition" />}>
        <Skeleton height={210} radius={24} />
        <Skeleton height={270} radius={24} />
        <Skeleton height={220} radius={24} />
      </Screen>
    );
  }

  if (resource.error || !resource.data) {
    return <Screen header={<ScreenHeader title="Service & Documents" subtitle="Keep your LEXICON in peak condition" />}><ErrorState onRetry={resource.reload} /></Screen>;
  }

  const data = resource.data;
  const docIcons = { insurance: ShieldCheck, warranty: FileCheck2, invoice: ReceiptText };

  return (
    <Screen
      header={<ScreenHeader title="Service & Documents" subtitle="Keep your LEXICON in peak condition" />}
      refreshing={resource.refreshing}
      onRefresh={() => void resource.reload()}
    >
      <GlassCard style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={styles.heroIcon}><Wrench size={27} color={colors.primary} /></View>
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>NEXT SERVICE</Text>
            <Text style={styles.heroTitle}>Due in {data.nextServiceKm} km</Text>
            <Text style={styles.heroSubtitle}>Recommended before {shortDate(data.nextServiceDue)}</Text>
          </View>
        </View>
        <View style={styles.progress}><View style={[styles.progressFill, { width: '62%' }]} /></View>
        <Text style={styles.progressCopy}>Your scooter is healthy. Booking early keeps preferred slots open.</Text>
        <AppButton label="Book service" icon={CalendarCheck} onPress={() => { setDealerId(data.dealers[0]?.id ?? null); setBookingOpen(true); }} />
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Dealer locator" action="View map" onAction={() => showToast('Dealer map requires live dealer coordinates from the backend.', 'info')} />
        <View style={styles.dealerList}>
          {data.dealers.map((dealer, index) => (
            <Pressable key={dealer.id} style={[styles.dealer, index > 0 ? styles.itemBorder : null]} onPress={() => { setDealerId(dealer.id); setBookingOpen(true); }}>
              <View style={styles.dealerIcon}><MapPin size={19} color={colors.primary} /></View>
              <View style={styles.dealerCopy}>
                <Text style={styles.dealerName}>{dealer.name}</Text>
                <Text style={styles.dealerAddress}>{dealer.address}</Text>
                <View style={styles.dealerMeta}><Text style={styles.meta}>{dealer.distanceKm} km</Text><Star size={10} fill={colors.warning} color={colors.warning} /><Text style={styles.meta}>{dealer.rating}</Text><Text style={styles.available}>{dealer.nextAvailable}</Text></View>
              </View>
              <ChevronRight size={18} color={colors.secondary} />
            </Pressable>
          ))}
        </View>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Documents" action="Manage" onAction={() => showToast('Document management is ready for a backend connection.', 'info')} />
        <View style={styles.documentGrid}>
          {data.documents.map((document) => {
            const Icon = docIcons[document.type];
            return (
              <Pressable key={document.id} style={styles.documentCard} onPress={() => showToast(`${document.title} opened.`, 'info')}>
                <View style={styles.documentIcon}><Icon size={20} color={colors.primary} /></View>
                <Text style={styles.documentTitle}>{document.title}</Text>
                <Text style={styles.documentSubtitle}>{document.subtitle}</Text>
                <View style={styles.documentBottom}>
                  <Text style={styles.documentStatus}>{document.status}</Text>
                  <Download size={16} color={colors.secondary} />
                </View>
              </Pressable>
            );
          })}
        </View>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Service history" action="View All" />
        {data.serviceHistory.map((item, index) => (
          <View key={item.id} style={[styles.history, index > 0 ? styles.itemBorder : null]}>
            <View style={styles.timeline}><View style={styles.timelineDot} />{index < data.serviceHistory.length - 1 ? <View style={styles.timelineLine} /> : null}</View>
            <View style={styles.historyCopy}>
              <Text style={styles.historyTitle}>{item.title}</Text>
              <Text style={styles.historySubtitle}>{shortDate(item.date)} · {item.odometerKm} km</Text>
              <Text style={styles.historyDealer}>{item.dealer}</Text>
            </View>
            <FileText size={17} color={colors.secondary} />
          </View>
        ))}
      </GlassCard>

      <GlassCard style={styles.supportCard}>
        <View style={styles.supportIcon}><Headphones size={24} color={colors.info} /></View>
        <View style={styles.supportCopy}><Text style={styles.supportTitle}>24/7 roadside assistance</Text><Text style={styles.supportSubtitle}>Breakdown, puncture, towing or emergency support.</Text></View>
        <Pressable style={styles.callButton} onPress={() => void Linking.openURL('tel:+911800000539')}><PhoneCall size={18} color={colors.background} /></Pressable>
      </GlassCard>

      <BottomSheet visible={bookingOpen} onClose={() => setBookingOpen(false)} title="Book service" subtitle="Choose a centre, date and convenient slot">
        <Text style={styles.sheetLabel}>Service centre</Text>
        <View style={styles.sheetChips}>
          {data.dealers.map((dealer) => <Chip key={dealer.id} label={dealer.name.replace('LEXICON ', '').split('—')[0]?.trim() ?? dealer.name} active={(dealerId ?? data.dealers[0]?.id) === dealer.id} onPress={() => setDealerId(dealer.id)} />)}
        </View>
        <Text style={styles.sheetLabel}>Date</Text>
        <View style={styles.sheetChips}>{dateOptions.map((item) => <Chip key={item} label={shortDate(item).replace('2026', '').trim()} active={date === item} onPress={() => setDate(item)} />)}</View>
        <Text style={styles.sheetLabel}>Time slot</Text>
        <View style={styles.sheetChips}>{slots.map((item) => <Chip key={item} label={item} active={slot === item} onPress={() => setSlot(item)} />)}</View>
        <AppButton label="Confirm booking" icon={CalendarCheck} loading={booking} onPress={confirmBooking} />
      </BottomSheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { gap: spacing.md },
  heroTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  heroIcon: { width: 58, height: 58, borderRadius: 20, backgroundColor: `${colors.primary}12`, borderWidth: 1, borderColor: `${colors.primary}44`, alignItems: 'center', justifyContent: 'center' },
  heroCopy: { flex: 1, gap: 2 },
  heroEyebrow: { color: colors.primary, fontFamily: fonts.semibold, fontSize: 9, letterSpacing: 1 },
  heroTitle: { color: colors.heading, fontFamily: fonts.bold, fontSize: 21 },
  heroSubtitle: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 10 },
  progress: { height: 8, borderRadius: 4, backgroundColor: colors.divider, overflow: 'hidden' },
  progressFill: { height: 8, borderRadius: 4, backgroundColor: colors.primary },
  progressCopy: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, lineHeight: 15 },
  dealerList: { marginTop: spacing.sm },
  dealer: { minHeight: 82, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm },
  itemBorder: { borderTopWidth: 1, borderTopColor: colors.divider },
  dealerIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: `${colors.primary}10`, alignItems: 'center', justifyContent: 'center' },
  dealerCopy: { flex: 1, gap: 3 },
  dealerName: { color: colors.heading, fontFamily: fonts.medium, fontSize: 11 },
  dealerAddress: { color: colors.muted, fontFamily: fonts.regular, fontSize: 8 },
  dealerMeta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  meta: { color: colors.secondary, fontFamily: fonts.medium, fontSize: 8 },
  available: { color: colors.primary, fontFamily: fonts.medium, fontSize: 7.5, marginLeft: 5 },
  documentGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  documentCard: { width: '47%', flexGrow: 1, minHeight: 150, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, padding: spacing.sm, gap: 5 },
  documentIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: `${colors.primary}12`, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xs },
  documentTitle: { color: colors.heading, fontFamily: fonts.semibold, fontSize: 11 },
  documentSubtitle: { color: colors.muted, fontFamily: fonts.regular, fontSize: 8, lineHeight: 12, flex: 1 },
  documentBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  documentStatus: { color: colors.success, fontFamily: fonts.medium, fontSize: 8 },
  history: { flexDirection: 'row', gap: spacing.sm, paddingVertical: spacing.sm },
  timeline: { width: 14, alignItems: 'center' },
  timelineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginTop: 5 },
  timelineLine: { width: 1, flex: 1, backgroundColor: colors.divider, marginTop: 4 },
  historyCopy: { flex: 1, gap: 3 },
  historyTitle: { color: colors.heading, fontFamily: fonts.medium, fontSize: 11 },
  historySubtitle: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 8 },
  historyDealer: { color: colors.muted, fontFamily: fonts.regular, fontSize: 8 },
  supportCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  supportIcon: { width: 46, height: 46, borderRadius: 16, backgroundColor: `${colors.info}12`, alignItems: 'center', justifyContent: 'center' },
  supportCopy: { flex: 1, gap: 3 },
  supportTitle: { color: colors.heading, fontFamily: fonts.semibold, fontSize: 12 },
  supportSubtitle: { color: colors.muted, fontFamily: fonts.regular, fontSize: 9, lineHeight: 13 },
  callButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  sheetLabel: { color: colors.secondary, fontFamily: fonts.medium, fontSize: 11 },
  sheetChips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }
});
