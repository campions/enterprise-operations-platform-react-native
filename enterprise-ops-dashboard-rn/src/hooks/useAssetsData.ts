import { useQuery } from '@tanstack/react-query';
import { assetRecords } from '../data/mock/assets';

const fetchAssets = async () => {
  // Simulate small delay for parity with remote fetches
  return assetRecords;
};

const useAssetsData = () => {
  const query = useQuery({
    queryKey: ['assets'],
    queryFn: fetchAssets,
    staleTime: 1000 * 60 * 5
  });

  return query;
};

export default useAssetsData;
