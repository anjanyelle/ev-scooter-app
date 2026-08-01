import {
  BatteryLow,
  BellRing,
  CarFront,
  CheckCheck,
  CloudDownload,
  PlugZap,
  ShieldAlert,
  Siren,
  Wrench
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Chip, ErrorState, GlassCard, Screen, ScreenHeader, Skeleton } from '@/components/ui';
import { evRepository } from '@/data/repository';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import { colors, fonts, spacing } from '@/theme';
import type { AppNotification, NotificationType } from '@/types/domain';
import { formatRelativeTime } from '@/utils/format';
import { haptic } from '@/utils/haptics';

const typeIcons: Record<NotificationType, LucideIcon> = {
  battery: BatteryLow,
  charging: PlugZap,
  theft: ShieldAlert,
  tow: CarFront,
  crash: Siren,
  ota: CloudDownload,
  service: Wrench
};

const severityColors: Record<AppNotification['severity'], string> = {
  info: colors.info,
  success: colors.success,
  warning: colors.warning,
  critical: colors.error
};

type Filter = 'all' | 'security' | 'charging' | 'service';

export default function NotificationsScreen() {
  const resource = useAsyncResource(() => evRepository.getNotifications(), []);
  const [filter, setFilter] = useState<Filter>('all');
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const notifications = useMemo(() => {
    const all = resource.data ?? [];
    if (filter === 'security') return all.filter((item) => ['theft', 'tow', 'crash'].includes(item.type));
    if (filter === 'charging') return all.filter((item) => ['battery', 'charging'].includes(item.type));
    if (filter === 'service') return all.filter((item) => ['service', 'ota'].includes(item.type));
    return all;
  }, [filter, resource.data]);

  const markAllRead = () => {
    setReadIds(new Set((resource.data ?? []).map((item) => item.id)));
    void haptic.success();
  };

  if (resource.loading) {
    return (
      <Screen>
        <ScreenHeader title="Notifications" subtitle="Vehicle and account alerts" back />
        <View style={styles.filterRow}><Skeleton width={74} height={36} radius={24} /><Skeleton width={95} height={36} radius={24} /><Skeleton width={96} height={36} radius={24} /></View>
        {Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} height={120} radius={24} />)}
      </Screen>
    );
  }

  if (resource.error || !resource.data) {
    return <Screen><ScreenHeader title="Notifications" subtitle="Vehicle and account alerts" back /><ErrorState onRetry={resource.reload} /></Screen>;
  }

  return (
    <Screen refreshing={resource.refreshing} onRefresh={() => void resource.reload()} bottomInset={32}>
      <ScreenHeader title="Notifications" subtitle={`${resource.data.filter((item) => !item.isRead && !readIds.has(item.id)).length} unread alerts`} back rightIcon={CheckCheck} onRightPress={markAllRead} />
      <View style={styles.filterRow}>
        <Chip label="All" active={filter === 'all'} onPress={() => setFilter('all')} />
        <Chip label="Security" active={filter === 'security'} onPress={() => setFilter('security')} />
        <Chip label="Charging" active={filter === 'charging'} onPress={() => setFilter('charging')} />
        <Chip label="Service" active={filter === 'service'} onPress={() => setFilter('service')} />
      </View>

      {notifications.length === 0 ? (
        <GlassCard style={styles.empty}>
          <BellRing size={30} color={colors.primary} />
          <Text style={styles.emptyTitle}>No alerts in this category</Text>
          <Text style={styles.emptySubtitle}>Your vehicle activity will appear here.</Text>
        </GlassCard>
      ) : notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          read={notification.isRead || readIds.has(notification.id)}
          onPress={() => {
            setReadIds((current) => new Set(current).add(notification.id));
            void haptic.select();
          }}
        />
      ))}
    </Screen>
  );
}

function NotificationCard({ notification, read, onPress }: { notification: AppNotification; read: boolean; onPress: () => void }) {
  const Icon = typeIcons[notification.type];
  const color = severityColors[notification.severity];
  return (
    <Pressable onPress={onPress}>
      <GlassCard style={[styles.notification, !read ? { borderColor: `${color}66` } : null]}>
        <View style={[styles.icon, { backgroundColor: `${color}14` }]}><Icon size={21} color={color} /></View>
        <View style={styles.copy}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{notification.title}</Text>
            {!read ? <View style={[styles.unread, { backgroundColor: color }]} /> : null}
          </View>
          <Text style={styles.message}>{notification.message}</Text>
          <Text style={styles.time}>{formatRelativeTime(notification.createdAt)}</Text>
        </View>
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  notification: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  icon: { width: 46, height: 46, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, gap: 6 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  title: { color: colors.heading, fontFamily: fonts.semibold, fontSize: 12, flex: 1 },
  unread: { width: 8, height: 8, borderRadius: 4, shadowOpacity: 0.8, shadowRadius: 7 },
  message: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 10, lineHeight: 16 },
  time: { color: colors.muted, fontFamily: fonts.regular, fontSize: 8 },
  empty: { minHeight: 210, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  emptyTitle: { color: colors.heading, fontFamily: fonts.semibold, fontSize: 14 },
  emptySubtitle: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 10 }
});
