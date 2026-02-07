import { useQuery } from '@tanstack/react-query';
import { mockKpis } from '../data/mockData';
import { useSimulateError } from './useSimulateError';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useKpisQuery = () => {
  const simulateError = useSimulateError();

  const query = useQuery({
    queryKey: ['kpis', simulateError],
    queryFn: async () => {
      await delay(400);
      if (simulateError) {
        throw new Error('Simulated KPI query failure');
      }
      return mockKpis();
    }
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch
  };
};
