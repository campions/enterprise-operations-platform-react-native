import { useQuery } from '@tanstack/react-query';
import { defaultConfigState } from '../data/mockData';
import { useSimulateError } from './useSimulateError';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useConfigQuery = () => {
  const simulateError = useSimulateError();

  const query = useQuery({
    queryKey: ['config', simulateError],
    queryFn: async () => {
      await delay(300);
      if (simulateError) {
        throw new Error('Simulated config query failure');
      }
      return defaultConfigState;
    }
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch
  };
};
