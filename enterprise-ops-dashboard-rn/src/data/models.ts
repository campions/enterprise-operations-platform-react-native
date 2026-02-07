export interface KpiMetric {
  id: string;
  label: string;
  value: number | string;
  delta?: number;
  unit?: string;
}

export interface AssetRow {
  id: string;
  name: string;
  status: 'OK' | 'WARN' | 'ERROR';
  location: string;
  updatedAt: string;
  score: number;
}

export interface ConfigFormState {
  siteName: string;
  language: 'en' | 'ro' | 'de';
  refreshInterval: number;
  enableAlerts: boolean;
  threshold: number;
}
