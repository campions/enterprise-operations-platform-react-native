import { useMemo } from 'react';
import { dashboardMetrics, escalatedTasks, latestAlerts } from '../data/mock/dashboard';

const useDashboardMetrics = () => {
  const data = useMemo(() => ({
    metrics: dashboardMetrics,
    tasks: escalatedTasks,
    alerts: latestAlerts
  }), []);

  return data;
};

export default useDashboardMetrics;
