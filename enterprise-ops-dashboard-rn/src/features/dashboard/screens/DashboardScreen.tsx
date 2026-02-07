import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, useWindowDimensions, View } from 'react-native';
import { ActivityIndicator, Chip, Divider, Text, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../../components/layout/ScreenContainer';
import SectionHeader from '../../../components/layout/SectionHeader';
import EmptyState from '../../../components/states/EmptyState';
import ErrorState from '../../../components/states/ErrorState';
import LoadingState from '../../../components/states/LoadingState';
import UiCard from '../../../components/ui/UiCard';
import { AssetRow } from '../../../data/models';
import { useAssetsQuery } from '../../../hooks/useAssetsQuery';
import { useKpisQuery } from '../../../hooks/useKpisQuery';
import { RootStackParamList } from '../../../app/navigation/types';
import KpiCard from '../components/KpiCard';

const formatUpdatedAt = (timestamp: string) =>
  new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

const getKpiCardBasis = (columns: number) => {
  if (columns >= 4) {
    return '23%';
  }
  if (columns === 3) {
    return '31%';
  }
  return '48%';
};

const statusVisuals: Record<AssetRow['status'], { label: string; backgroundColor: string; textColor: string }> = {
  OK: { label: 'OK', backgroundColor: '#E6F4EA', textColor: '#0A7E07' },
  WARN: { label: 'WARN', backgroundColor: '#FFF4E5', textColor: '#B35C00' },
  ERROR: { label: 'ERROR', backgroundColor: '#FDEAEA', textColor: '#B00020' }
};

const DashboardScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: metrics = [], isLoading, isError, refetch } = useKpisQuery();
  const {
    data: assets = [],
    isLoading: isAssetsLoading,
    isError: isAssetsError,
    refetch: refetchAssets
  } = useAssetsQuery();
  const { width } = useWindowDimensions();

  const gridColumns = width >= 1200 ? 4 : width >= 900 ? 3 : 2;
  const kpiCardBasis = getKpiCardBasis(gridColumns);

  const recentUpdates = useMemo(() => assets.slice(0, 10), [assets]);

  const renderAssetItem = useCallback(
    ({ item }: ListRenderItemInfo<AssetRow>) => {
      const visuals = statusVisuals[item.status];

      return (
        <TouchableRipple
          onPress={() => navigation.navigate('AssetDetails', { asset: item })}
          testID={`recent-update-${item.id}`}
          accessibilityRole="button"
          accessibilityLabel={`Open details for ${item.name}`}
        >
          <View style={styles.assetRow}>
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
            <View style={styles.assetDetails}>
              <Chip
                compact
                style={[styles.statusChip, { backgroundColor: visuals.backgroundColor }]}
                textStyle={{ color: visuals.textColor, fontWeight: '600' }}
                accessibilityLabel={`Status ${visuals.label}`}
              >
                {visuals.label}
              </Chip>
              <Text variant="bodyMedium" style={styles.scoreLabel}>
                Score {item.score}
              </Text>
            </View>
          </View>
        </TouchableRipple>
      );
    },
    []
  );

  if (isLoading) {
    return <LoadingState title="Loading dashboard" message="Fetching KPI data and system summaries." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Dashboard unavailable"
        message="We couldn't load the latest KPI metrics."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <ScreenContainer>
      <SectionHeader title="Operations Overview" />
      {metrics.length ? (
        <View style={styles.kpiGrid}>
          {metrics.map((metric) => (
            <View key={metric.id} style={[styles.kpiItem, { flexBasis: kpiCardBasis }]}>
              <KpiCard
                label={metric.label}
                value={metric.value}
                delta={metric.delta}
                unit={metric.unit}
                testID={`kpi-card-${metric.id}`}
              />
            </View>
          ))}
        </View>
      ) : (
        <EmptyState title="No KPIs yet" message="Metrics will appear as soon as data is available." />
      )}

      <SectionHeader title="Recent Updates" />
      <UiCard>
        {isAssetsLoading ? (
          <ActivityIndicator style={styles.listLoader} />
        ) : isAssetsError ? (
          <ErrorState title="Recent updates unavailable" message="Unable to load assets." onRetry={() => refetchAssets()} />
        ) : (
          <FlatList
            data={recentUpdates}
            keyExtractor={(item) => item.id}
            renderItem={renderAssetItem}
            ItemSeparatorComponent={() => <Divider />}
            ListEmptyComponent={() => (
              <Text variant="bodyMedium" style={styles.emptyListText}>
                No recent updates.
              </Text>
            )}
            scrollEnabled={false}
            contentContainerStyle={styles.assetList}
          />
        )}
      </UiCard>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  kpiItem: {
    flexGrow: 1,
    minWidth: 160
  },
  listLoader: {
    paddingVertical: 24
  },
  assetList: {
    paddingVertical: 8
  },
  assetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12
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
  assetDetails: {
    alignItems: 'flex-end',
    gap: 6
  },
  statusChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#CAD3E3'
  },
  scoreLabel: {
    fontWeight: '600'
  },
  emptyListText: {
    textAlign: 'center',
    paddingVertical: 16,
    color: '#4E5D78'
  }
});

export default DashboardScreen;
