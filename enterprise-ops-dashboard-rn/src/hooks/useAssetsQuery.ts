import { useQuery } from '@tanstack/react-query';
import { mockAssets } from '../data/mockData';
import { useSimulateError } from './useSimulateError';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useAssetsQuery = () => {
  const simulateError = useSimulateError();

  const query = useQuery({
    queryKey: ['assets', simulateError],
    queryFn: async () => {
      await delay(500);
      if (simulateError) {
        throw new Error('Simulated assets query failure');
      }
      return mockAssets(200);
    }
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch
  };
};
