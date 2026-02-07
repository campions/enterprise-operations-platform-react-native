export interface AssetRecord {
  id: string;
  name: string;
  owner: string;
  status: 'Healthy' | 'Warning' | 'Offline';
  lastSynced: string;
}

export const assetRecords: AssetRecord[] = [
  { id: 'as-001', name: 'OMS Core Cluster', owner: 'Core Services', status: 'Healthy', lastSynced: '2m ago' },
  { id: 'as-002', name: 'Analytics Pipeline', owner: 'Data Platform', status: 'Warning', lastSynced: '12m ago' },
  { id: 'as-003', name: 'Inventory Cache Layer', owner: 'Edge', status: 'Healthy', lastSynced: 'Just now' },
  { id: 'as-004', name: 'Billing Adapter', owner: 'Finance IT', status: 'Offline', lastSynced: '58m ago' }
];
