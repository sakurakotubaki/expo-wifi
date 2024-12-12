# Expo WiFi Status App

このアプリケーションは、デバイスのWiFi接続状態をリアルタイムで確認できるExpoベースのモバイルアプリケーションです。

## 機能

- WiFi接続状態のリアルタイム表示
- ネットワークタイプの表示（WiFi、モバイル通信など）
- インターネット接続状態の確認
- プルトゥリフレッシュによる接続状態の更新

## 必要条件

- [Node.js](https://nodejs.org/) (v18以上)
- [Bun](https://bun.sh/)
- [Expo Go](https://expo.dev/client) (iOSまたはAndroidデバイス用)

## 環境構築

1. bunのインストール（まだインストールしていない場合）:
```bash
curl -fsSL https://bun.sh/install | bash
```

2. プロジェクトのクローンとセットアップ:
```bash
# リポジトリをクローン
git clone [your-repository-url]
cd expo-wifi

# 依存関係のインストール
bun install
```

3. アプリケーションの起動:
```bash
bun start
```

## 使用方法

1. Expo Goアプリを起動
2. QRコードをスキャン（またはURLを入力）してアプリを開く
3. アプリが自動的にデバイスのWiFi接続状態を表示
4. 画面を下にプルダウンして接続状態を更新
5. 「接続状態を更新」ボタンをタップして手動更新も可能

## 技術仕様

- Framework: [Expo](https://expo.dev/) (SDK 52)
- Language: TypeScript
- 主要パッケージ:
  - expo-network: WiFiおよびネットワーク情報の取得
  - react-native: UIコンポーネント
  - expo-status-bar: ステータスバーの制御

## WiFi通信の仕組み

このアプリケーションは以下のような方法でWiFi情報を取得しています：

1. `expo-network`パッケージを使用して、デバイスのネットワーク状態を取得
```typescript
const networkState = await Network.getNetworkStateAsync();
```

2. 取得できる情報：
   - 接続状態（接続中/未接続）
   - ネットワークタイプ（WiFi/モバイル通信など）
   - インターネット到達可能性

注意: Expoの制限により、WiFiの詳細な情報（SSID、信号強度など）や、
WiFiスキャン機能は利用できません。これらの機能が必要な場合は、
expo-dev-clientを使用するか、React Native CLIプロジェクトへの移行が必要です。

## トラブルシューティング

1. アプリが起動しない場合:
   - bunとExpo Goが最新バージョンかを確認
   - `bun install`を再実行

2. ネットワーク情報が取得できない場合:
   - デバイスの位置情報設定が有効になっているか確認
   - アプリのネットワークアクセス権限を確認

3. 更新が反映されない場合:
   - アプリを完全に終了して再起動
   - Expo Goをクリアして再起動
