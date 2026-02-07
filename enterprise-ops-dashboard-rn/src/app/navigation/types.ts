import { AssetRow } from '../../data/models';

export type RootTabParamList = {
  Dashboard: undefined;
  Assets: undefined;
  Configuration: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  AssetDetails: {
    asset: AssetRow;
  };
};
