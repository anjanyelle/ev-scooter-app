export const formatNumber = (value: number, maximumFractionDigits = 1) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits }).format(value);

export const formatCurrency = (value: number, maximumFractionDigits = 2) =>
  `₹ ${new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: maximumFractionDigits,
    maximumFractionDigits
  }).format(value)}`;

export const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (hours <= 0) return `${remainder}m`;
  return `${hours}h ${remainder}m`;
};

export const formatRideDate = (iso: string) =>
  new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(iso));

export const formatRelativeTime = (iso: string) => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.max(0, Math.round(diffMs / 60000));
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
};

export const shortDate = (iso: string) =>
  new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(
    new Date(iso)
  );
