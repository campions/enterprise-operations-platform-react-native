import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import UiButton from '../../../components/ui/UiButton';
import ScreenContainer from '../../../components/layout/ScreenContainer';
import { RootStackParamList } from '../../../app/navigation/types';

const formatUpdatedAt = (timestamp: string) =>
  new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

const AssetDetailsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'AssetDetails'>>();
  const { asset } = route.params;

  return (
    <ScreenContainer scrollable={false} contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={asset.name} subtitle={asset.id} />
        <Card.Content>
          <View style={styles.row}>
            <Text variant="bodyMedium" style={styles.label}>
              Status
            </Text>
            <Text variant="bodyMedium">{asset.status}</Text>
          </View>
          <View style={styles.row}>
            <Text variant="bodyMedium" style={styles.label}>
              Location
            </Text>
            <Text variant="bodyMedium">{asset.location}</Text>
          </View>
          <View style={styles.row}>
            <Text variant="bodyMedium" style={styles.label}>
              Updated
            </Text>
            <Text variant="bodyMedium">{formatUpdatedAt(asset.updatedAt)}</Text>
          </View>
          <View style={styles.row}>
            <Text variant="bodyMedium" style={styles.label}>
              Score
            </Text>
            <Text variant="bodyMedium">{asset.score}</Text>
          </View>
        </Card.Content>
      </Card>
      <UiButton label="Close" onPress={() => navigation.goBack()} testID="asset-details-close" />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: 16
  },
  card: {
    borderRadius: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  label: {
    color: '#4E5D78'
  }
});

export default AssetDetailsScreen;
