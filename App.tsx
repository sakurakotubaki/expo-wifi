import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import * as Network from 'expo-network';

export default function App() {
  const [networkState, setNetworkState] = useState<{
    isConnected: boolean;
    type: string | null;
    isInternetReachable: boolean;
    details: Network.NetworkState | null;
  }>({
    isConnected: false,
    type: null,
    isInternetReachable: false,
    details: null,
  });
  const [refreshing, setRefreshing] = useState(false);

  const getNetworkInfo = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();

      setNetworkState({
        isConnected: networkState?.isConnected ?? false,
        type: networkState?.type ?? null,
        isInternetReachable: networkState?.isInternetReachable ?? false,
        details: networkState ?? null,
      });
    } catch (error) {
      console.error('Error fetching network info:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getNetworkInfo();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getNetworkInfo();
  }, []);

  const renderNetworkStatus = () => {
    const statusColor = networkState.isConnected ? '#4CAF50' : '#F44336';
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.headerText}>WiFi 接続状態</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {networkState.isConnected ? '接続中' : '未接続'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>接続タイプ:</Text>
            <Text style={styles.value}>
              {networkState.type === 'WIFI' ? 'WiFi'
                : networkState.type === 'CELLULAR' ? 'モバイル通信'
                  : networkState.type === 'BLUETOOTH' ? 'Bluetooth'
                    : networkState.type === 'ETHERNET' ? '有線LAN'
                      : networkState.type === 'VPN' ? 'VPN'
                        : networkState.type === 'OTHER' ? 'その他'
                          : '不明'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>インターネット:</Text>
            <Text style={styles.value}>
              {networkState.isInternetReachable ? '利用可能' : '利用不可'}
            </Text>
          </View>
          {!networkState.isConnected && (
            <View style={styles.errorMessage}>
              <Text style={styles.errorText}>
                WiFiに接続されていません。{'\n'}
                端末のWiFi設定を確認してください。
              </Text>
            </View>
          )}
        </View>
      </>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          title="更新中..."
          tintColor="#2196F3"
        />
      }
    >
      <StatusBar style="light" />
      {renderNetworkStatus()}
      <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
        <Text style={styles.refreshButtonText}>接続状態を更新</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 16,
    paddingTop: 60,
    marginBottom: 16,
    marginHorizontal: -16,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#666',
    width: 120,
  },
  value: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  errorMessage: {
    backgroundColor: '#FFF3F3',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#FFE0E0',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  refreshButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});