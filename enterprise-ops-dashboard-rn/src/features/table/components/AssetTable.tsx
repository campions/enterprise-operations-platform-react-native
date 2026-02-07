import React from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, DataTable, Text } from 'react-native-paper';
import { AssetRecord } from '../../../data/mock/assets';
import { formatStatus } from '../../../utils/formatters';

interface AssetTableProps {
  assets: AssetRecord[];
  isLoading?: boolean;
}

const AssetTable = ({ assets, isLoading }: AssetTableProps) => {
  if (isLoading) {
    return <ActivityIndicator style={styles.centered} />;
  }

  if (!assets.length) {
    return (
      <Text style={styles.centered} variant="bodyLarge">
        No assets available.
      </Text>
    );
  }

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Asset</DataTable.Title>
        <DataTable.Title>Owner</DataTable.Title>
        <DataTable.Title>Status</DataTable.Title>
        <DataTable.Title>Last Synced</DataTable.Title>
      </DataTable.Header>
      {assets.map((asset) => {
        const status = formatStatus(asset.status);
        return (
          <DataTable.Row key={asset.id}>
            <DataTable.Cell>{asset.name}</DataTable.Cell>
            <DataTable.Cell>{asset.owner}</DataTable.Cell>
            <DataTable.Cell>
              <Text style={{ color: status.color }}>{status.label}</Text>
            </DataTable.Cell>
            <DataTable.Cell>{asset.lastSynced}</DataTable.Cell>
          </DataTable.Row>
        );
      })}
    </DataTable>
  );
};

const styles = StyleSheet.create({
  centered: {
    paddingVertical: 32,
    textAlign: 'center'
  }
});

export default AssetTable;
