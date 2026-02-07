import { AssetRow, ConfigFormState, KpiMetric } from './models';

const locations = ['Bucharest', 'Berlin', 'Munich', 'Frankfurt', 'Cluj', 'Timisoara'];
const assetNames = ['Gateway', 'Edge Node', 'Core Service', 'Telemetry Hub', 'Cache Cluster', 'AI Worker'];

export const mockKpis = (): KpiMetric[] => [
  { id: 'kpi-uptime', label: 'Uptime', value: 99.97, delta: 0.05, unit: '%' },
  { id: 'kpi-incidents', label: 'Open Incidents', value: 14, delta: -3 },
  { id: 'kpi-latency', label: 'Avg Latency', value: 182, delta: -12, unit: 'ms' },
  { id: 'kpi-util', label: 'Capacity Used', value: 76, delta: 4, unit: '%' },
  { id: 'kpi-automation', label: 'Automation Jobs', value: 48, delta: 6 },
  { id: 'kpi-sla', label: 'SLA Risk', value: 'Low', delta: 0 }
];

const statusForIndex = (index: number): AssetRow['status'] => {
  const mod = index % 12;
  if (mod === 0) return 'ERROR';
  if (mod <= 3) return 'WARN';
  return 'OK';
};

export const mockAssets = (count: number): AssetRow[] => {
  const total = Math.max(0, Math.min(count, 200));
  const base = new Date('2026-01-15T08:00:00Z').getTime();

  return Array.from({ length: total }, (_, index) => {
    const name = `${assetNames[index % assetNames.length]} ${index + 1}`;
    const location = locations[index % locations.length];
    const status = statusForIndex(index);
    const updatedAt = new Date(base + index * 6 * 60 * 1000).toISOString();
    const score = 98 - (index % 29);

    return {
      id: `asset-${String(index + 1).padStart(3, '0')}`,
      name,
      status,
      location,
      updatedAt,
      score
    };
  });
};

export const defaultConfigState: ConfigFormState = {
  siteName: 'Enterprise Ops HQ',
  language: 'en',
  refreshInterval: 30,
  enableAlerts: true,
  threshold: 82
};
