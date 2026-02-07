export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  trendLabel?: string;
  trendValue?: number;
  variant?: 'neutral' | 'success' | 'warning';
}

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: 'active-incidents',
    label: 'Active Incidents',
    value: '12',
    trendLabel: '5 resolved in last 24h',
    trendValue: 0.82,
    variant: 'warning'
  },
  {
    id: 'uptime',
    label: 'Platform Uptime',
    value: '99.96%',
    trendLabel: '+0.02% vs last week',
    trendValue: 0.96,
    variant: 'success'
  },
  {
    id: 'automation',
    label: 'Automations Running',
    value: '48',
    trendLabel: '3 scheduled maintenance jobs today',
    trendValue: 0.55,
    variant: 'neutral'
  }
];

export interface TaskItem {
  id: string;
  title: string;
  owner: string;
  due: string;
  status: 'Scheduled' | 'In Progress' | 'Blocked';
}

export const escalatedTasks: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Database failover rehearsal',
    owner: 'SRE Team',
    due: 'Today, 14:00',
    status: 'Scheduled'
  },
  {
    id: 'task-2',
    title: 'API rate limit tuning',
    owner: 'Platform',
    due: 'Tomorrow, 10:00',
    status: 'In Progress'
  }
];

export interface AlertItem {
  id: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
}

export const latestAlerts: AlertItem[] = [
  {
    id: 'alert-1',
    severity: 'high',
    message: 'North America data sync latency is above the 500ms threshold.'
  },
  {
    id: 'alert-2',
    severity: 'medium',
    message: 'Payment gateway maintenance scheduled tonight at 23:00 UTC.'
  },
  {
    id: 'alert-3',
    severity: 'low',
    message: 'Two inactive assets ready for archival review.'
  }
];
