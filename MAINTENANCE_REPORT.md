# サイトメンテナンス報告書

## 実施日
2025-10-27

## 問題点の概要

このプロジェクトは長期間メンテナンスされておらず、以下の重大な問題がありました:

### 🔴 **クリティカル (修正済み)**

1. **Nuxt 2→4への誤ったアップグレード**
   - Dependabotが自動的にNuxt 3→4へアップグレード
   - プロジェクトはNuxt 2/Vue 2向けに設計されており、完全に互換性なし
   - **対応**: Nuxt 2.18.1へダウングレード

2. **ビルド失敗**
   - sanitize-htmlのバージョンがWebpack 4と非互換
   - **対応**: sanitize-html 2.7.3へダウングレード

3. **ESLint設定の破損**
   - ESLint 9で古い設定形式が動作しない
   - Prettier 3とeslint-plugin-prettier 4の不整合
   - **対応**: ESLint 8へダウングレード、eslint-plugin-prettier 5へアップグレード
   - **対応**: 非推奨のprettier拡張設定を削除

4. **Google Analytics廃止**
   - Google Analytics UA (UA-155323326-3) は2023年7月に廃止済み
   - **対応**: GA4への移行準備 (@nuxtjs/google-gtagに変更)
   - **要対応**: GA4のMeasurement IDを設定する必要あり (nuxt.config.ts:141)

### 🟡 **警告 (確認済み、低リスク)**

5. **セキュリティ脆弱性**
   - postcss (moderate): ライン解析エラー - 影響は限定的
   - braces (high): リソース消費の問題 - 開発時のみの依存
   - これらはNuxt 2の推移的依存関係で、Nuxt 2自体がEOLのため修正不可

6. **非推奨パッケージの使用**
   - Nuxt 2はEOL (End of Life)
   - Vue 2はEOL
   - 多数のwebpack 4関連の非推奨パッケージ

## 実施した修正内容

### 1. 依存関係の修正

**ダウングレード**:
- `nuxt`: 4.2.0 → 2.18.1
- `@nuxt/typescript-runtime`: 3.0.2 → 2.1.0
- `@nuxt/typescript-build`: 3.0.2 → 2.1.0
- `express`: 5.1.0 → 4.21.2
- `sanitize-html`: 2.17.0 → 2.7.3
- `eslint`: 9.38.0 → 8.57.1
- `eslint-config-prettier`: 10.1.8 → 8.10.0

**アップグレード**:
- `eslint-plugin-prettier`: 4.2.1 → 5.2.1

**置き換え**:
- `@nuxtjs/google-analytics` → `@nuxtjs/google-gtag`

**削除**:
- 不要なパッケージ: `fs`, `net`, `tls` (Node.js組み込みモジュール)

### 2. 設定ファイルの修正

**.eslintrc.js**:
- 非推奨のprettier拡張設定を削除 (`prettier/vue`, `prettier/flowtype`, `prettier/react`)
- ESLint 8互換の設定に簡素化

**nuxt.config.ts**:
- Google Analytics UA設定を削除
- Google gtag (GA4) 設定を追加
- コメントのスペーシング修正

**package.json**:
- 依存関係を全体的に見直し
- Nuxt 2/Vue 2互換のバージョンに統一

### 3. ビルド・Lint確認

- ✅ `yarn build` - 成功
- ✅ `yarn lint:js` - 動作 (軽微なwarningのみ)

## 今後の推奨事項

### 短期 (即対応推奨)

1. **GA4のMeasurement IDを設定**
   - `nuxt.config.ts` の141行目、`G-XXXXXXXXXX` を実際のGA4 IDに置き換え

2. **動作確認**
   - 開発環境で `yarn dev` を実行して動作確認
   - イベント検索、表示機能の確認
   - GA4の動作確認

### 中期 (計画的に対応)

3. **Nuxt 3への移行検討**
   - Nuxt 2はEOLのため、長期的にはNuxt 3への移行が必要
   - Vue 3への移行も必要
   - Vuetify 2 → Vuetify 3への移行
   - この移行は大規模なリファクタリングを伴う

4. **TypeScriptの型チェック強化**
   - 現在はtypeCheckが有効だが、実装の型定義を改善

5. **テストの追加**
   - 現在テストが存在しない
   - ユニットテスト、E2Eテストの追加

### 長期

6. **アーキテクチャの見直し**
   - SSRの必要性の検討
   - Nuxt 3 + Vue 3 + Vuetify 3への完全移行
   - または、他のモダンなフレームワークへの移行検討

## 技術スタック (現状)

- **フレームワーク**: Nuxt.js 2.18.1 (EOL)
- **UIライブラリ**: Vuetify 2.x (Vue 2)
- **言語**: TypeScript, JavaScript
- **ビルドツール**: Webpack 4
- **パッケージマネージャー**: Yarn 1.x
- **Lint**: ESLint 8.57.1, Prettier 3.6.2

## まとめ

プロジェクトはビルド可能な状態に復旧しましたが、使用している技術スタック全体がEOLのため、
長期的な保守性には課題があります。短期的には動作しますが、中長期的にはNuxt 3への
移行を計画することを強く推奨します。
