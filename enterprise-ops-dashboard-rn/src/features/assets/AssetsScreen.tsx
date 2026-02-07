import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Card, Chip, Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/layout/ScreenContainer';
import SectionHeader from '../../components/layout/SectionHeader';
import EmptyState from '../../components/states/EmptyState';
import ErrorState from '../../components/states/ErrorState';
import LoadingState from '../../components/states/LoadingState';
import UiButton from '../../components/ui/UiButton';
import UiInput from '../../components/ui/UiInput';
import UiModal from '../../components/ui/UiModal';
import UiSelect from '../../components/ui/UiSelect';
import { AssetRow } from '../../data/models';
import { useAssetsQuery } from '../../hooks/useAssetsQuery';
import { applyFilter, applyPagination, applySort, useListState } from '../../utils/list';
import { RootStackParamList } from '../../app/navigation/types';

const formatUpdatedAt = (timestamp: string) =>
  new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

type SortKey = 'name' | 'status' | 'updatedAt' | 'score';

const sortOptions: Array<{ key: SortKey; label: string }> = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
  { key: 'updatedAt', label: 'Updated' },
  { key: 'score', label: 'Score' }
];

const statusOptions: Array<{ label: string; value: AssetRow['status'] }> = [
  { label: 'OK', value: 'OK' },
  { label: 'Warn', value: 'WARN' },
  { label: 'Error', value: 'ERROR' }
];

const pageSizeOptions = [20, 50] as const;

const statusVisuals: Record<AssetRow['status'], { label: string; backgroundColor: string; textColor: string }> = {
  OK: { label: 'OK', backgroundColor: '#E6F4EA', textColor: '#0A7E07' },
  WARN: { label: 'WARN', backgroundColor: '#FFF4E5', textColor: '#B35C00' },
  ERROR: { label: 'ERROR', backgroundColor: '#FDEAEA', textColor: '#B00020' }
};

const AssetsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: fetchedAssets = [], isLoading, isError, refetch } = useAssetsQuery();
  const [assets, setAssets] = useState<AssetRow[]>([]);
  const [editAsset, setEditAsset] = useState<AssetRow | null>(null);
  const [editForm, setEditForm] = useState({ name: '', status: 'OK' as AssetRow['status'], score: '' });

  const listState = useListState<SortKey>({ initialSortKey: 'updatedAt', initialSortDir: 'desc', initialPageSize: 20 });
  const { filterText, setFilterText, sortKey, sortDir, setSortKey, toggleSortDir, page, pageSize, setPageSize, loadMore } =
    listState;

  useEffect(() => {
    setAssets(fetchedAssets);
  }, [fetchedAssets]);

  const processed = useMemo(() => {
    const filtered = applyFilter(assets, filterText);
    const sorted = applySort(filtered, sortKey, sortDir);
    const paginated = applyPagination(sorted, page, pageSize);
    return {
      rows: paginated,
      total: sorted.length
    };
  }, [assets, filterText, sortKey, sortDir, page, pageSize]);

  const canLoadMore = processed.rows.length < processed.total;

  const handleSortPress = (key: SortKey) => {
    if (sortKey === key) {
      toggleSortDir();
    } else {
      setSortKey(key);
    }
  };

  const handleOpenEdit = useCallback((asset: AssetRow) => {
    setEditAsset(asset);
    setEditForm({ name: asset.name, status: asset.status, score: asset.score.toString() });
  }, []);

  const handleSaveEdit = () => {
    if (!editAsset) {
      return;
    }
    const trimmedName = editForm.name.trim();
    const numericScore = Number(editForm.score);
    if (!trimmedName || Number.isNaN(numericScore)) {
      return;
    }

    setAssets((prev) =>
      prev.map((asset) =>
        asset.id === editAsset.id
          ? {
              ...asset,
              name: trimmedName,
              status: editForm.status,
              score: numericScore
            }
          : asset
      )
    );
    setEditAsset(null);
  };

  const loadMoreButton = () =>
    canLoadMore ? (
      <View style={styles.loadMoreContainer}>
        <UiButton
          label="Load more"
          mode="outlined"
          onPress={loadMore}
          testID="assets-load-more"
          accessibilityLabel="Load more assets"
        />
      </View>
    ) : null;

  const renderAsset = ({ item }: ListRenderItemInfo<AssetRow>) => {
    const visuals = statusVisuals[item.status];

    return (
      <Card style={styles.assetCard}>
        <Card.Content>
          <View style={styles.assetHeader}>
            <View style={styles.assetInfo}>
              <Text variant="titleMedium">{item.name}</Text>
              <View style={styles.assetMetaRow}>
                <Text variant="bodySmall" style={styles.assetMetaText}>
                  {item.location}
                </Text>
                <Text variant="bodySmall" style={styles.assetMetaSeparator}>
                  •
                </Text>
                <Text variant="bodySmall" style={styles.assetMetaText}>
                  {formatUpdatedAt(item.updatedAt)}
                </Text>
              </View>
            </View>
              <Chip
                compact
                style={[styles.statusChip, { backgroundColor: visuals.backgroundColor }]}
                textStyle={{ color: visuals.textColor, fontWeight: '600' }}
                accessibilityLabel={`Status ${visuals.label}`}
              >
                {visuals.label}
              </Chip>
          </View>
          <View style={styles.assetStatsRow}>
            <Text variant="bodyMedium">Score {item.score}</Text>
            <Text variant="bodyMedium">ID {item.id}</Text>
          </View>
          <Divider style={styles.assetDivider} />
          <View style={styles.assetActions}>
            <UiButton
              label="View"
              mode="outlined"
              compact
              onPress={() => navigation.navigate('AssetDetails', { asset: item })}
              testID={`asset-${item.id}-view`}
              accessibilityLabel={`View asset ${item.name}`}
            />
            <UiButton
              label="Edit"
              compact
              onPress={() => handleOpenEdit(item)}
              testID={`asset-${item.id}-edit`}
              accessibilityLabel={`Edit asset ${item.name}`}
            />
          </View>
        </Card.Content>
      </Card>
    );
  };

  if (isLoading) {
    return <LoadingState title="Loading assets" message="Syncing asset inventory and health status." />;
  }

  if (isError) {
    return <ErrorState title="Assets unavailable" message="We couldn't load the asset list." onRetry={() => refetch()} />;
  }

  return (
    <ScreenContainer>
      <SectionHeader title="Assets" />
      <UiInput
        label="Search assets"
        value={filterText}
        onChangeText={setFilterText}
        placeholder="Filter by name, location, or status"
        testID="assets-filter-input"
        accessibilityLabel="Search assets input"
      />
      <View style={styles.controlsRow}>
        <Text variant="labelLarge">Sort by</Text>
        <View style={styles.sortChips}>
          {sortOptions.map((option) => {
            const isActive = sortKey === option.key;
            return (
              <Chip
                key={option.key}
                mode={isActive ? 'flat' : 'outlined'}
                selected={isActive}
                onPress={() => handleSortPress(option.key)}
                testID={`sort-chip-${option.key}`}
                accessibilityRole="button"
                accessibilityLabel={`Sort by ${option.label}${isActive ? ` (${sortDir === 'asc' ? 'ascending' : 'descending'})` : ''}`}
              >
                {option.label}
                {isActive ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
              </Chip>
            );
          })}
        </View>
      </View>
      <UiSelect
        label="Page size"
        options={pageSizeOptions.map((size) => ({ label: `${size} rows`, value: size }))}
        selectedValue={pageSize}
        onSelect={(value) => setPageSize(Number(value))}
        testID="assets-page-size-select"
        accessibilityLabel="Select page size"
      />

      <FlatList
        data={processed.rows}
        keyExtractor={(item) => item.id}
        renderItem={renderAsset}
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
        ListEmptyComponent={() => (
          <EmptyState title="No assets" message="Assets will appear after sync completes." />
        )}
        ListFooterComponent={loadMoreButton}
        contentContainerStyle={processed.rows.length ? styles.listContent : styles.emptyListContent}
        keyboardShouldPersistTaps="handled"
      />

      <UiModal
        visible={Boolean(editAsset)}
        onDismiss={() => setEditAsset(null)}
        testID="asset-edit-modal"
        showCloseButton
        closeAccessibilityLabel="Close edit asset modal"
      >
        {editAsset ? (
          <View style={styles.modalContent}>
            <Text variant="titleMedium">Edit Asset</Text>
            <UiInput
              label="Name"
              value={editForm.name}
              onChangeText={(text) => setEditForm((prev) => ({ ...prev, name: text }))}
              testID="edit-asset-name"
              accessibilityLabel="Edit asset name"
            />
            <UiSelect
              label="Status"
              options={statusOptions}
              selectedValue={editForm.status}
              onSelect={(value) => setEditForm((prev) => ({ ...prev, status: value }))}
              testID="edit-asset-status"
              accessibilityLabel="Edit asset status"
            />
            <UiInput
              label="Score"
              value={editForm.score}
              onChangeText={(text) => setEditForm((prev) => ({ ...prev, score: text }))}
              keyboardType="numeric"
              testID="edit-asset-score"
              accessibilityLabel="Edit asset score"
            />
            <View style={styles.modalActions}>
              <UiButton
                label="Close"
                mode="outlined"
                onPress={() => setEditAsset(null)}
                testID="edit-asset-cancel"
                accessibilityLabel="Close edit asset modal"
              />
              <UiButton label="Save" onPress={handleSaveEdit} testID="edit-asset-save" accessibilityLabel="Save asset" />
            </View>
          </View>
        ) : null}
      </UiModal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  controlsRow: {
    gap: 12
  },
  sortChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  listSeparator: {
    height: 12
  },
  listContent: {
    paddingVertical: 8,
    gap: 12
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  assetCard: {
    borderRadius: 12
  },
  assetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  assetInfo: {
    flex: 1,
    paddingRight: 12
  },
  assetMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  },
  assetMetaText: {
    color: '#4E5D78'
  },
  assetMetaSeparator: {
    marginHorizontal: 6,
    color: '#8C99AE'
  },
  statusChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#CAD3E3'
  },
  assetStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12
  },
  assetDivider: {
    marginVertical: 12
  },
  assetActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12
  },
  loadMoreContainer: {
    marginTop: 12,
    alignItems: 'center'
  },
  modalContent: {
    gap: 12
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  }
});

export default AssetsScreen;
