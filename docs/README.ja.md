# acrop

[English](../README.md)

acrop は TypeScript プロジェクトの import をルールに沿って検査する CLI です。ドメイン層から UI 層への依存を防いだり、機能間の依存を制限したり、共有コードを参照できる範囲を決めたりできます。

## クイックスタート

### インストール

Node.js 22 以上を使い、検査対象のプロジェクトでお使いのパッケージマネージャーに対応するコマンドを実行します。 [npm の acrop](https://www.npmjs.com/package/acrop)

```sh
# npm
npm install --save-dev acrop

# pnpm
pnpm add --save-dev acrop
```

### import の制約を設定する

次のような構成のプロジェクトを例に、プロジェクトのルートに `acrop.config.ts` を作成します。

```text
.
├── acrop.config.ts
└── src/
    ├── domain/order.ts
    ├── shared/id.ts
    └── ui/button.ts
```

```ts
export default {
	root: ".",
	scopes: [
		{
			scope: "./src/domain/**/*",
			rules: [
				{ restricted: ["./src/ui"], name: "No UI imports in domain code" },
				{ allowed: ["./src"] },
			],
		},
	],
};
```

このスコープは `src/domain/` 以下のファイルを検査します。最初のルールで `src/ui/` への import を禁止し、次のルールで `src/` 以下の残りの import 先を許可します。

### 検査する

`node_modules/` や `dist/` などの生成ディレクトリは、プロジェクトの `.gitignore` に追加すると除外できます。プロジェクトのルートから、設定ファイルのパスを引数に渡して実行します。

```sh
# npm
npm exec -- acrop ./acrop.config.ts

# pnpm
pnpm exec acrop ./acrop.config.ts
```

たとえば `src/domain/order.ts` に次の import があると、1 行目は許可され、2 行目は違反として報告されます。

```ts
import { id } from "../shared/id";
import { button } from "../ui/button";
```

```text
./src/domain/order.ts (1)
2:24 ./src/ui/button No UI imports in domain code
```

レポートには import 元のファイル、違反数、import の行と列、import 先、ルール名が表示されます。この例の終了コードは `1` です。

## 設定の仕組み

設定は、探索の起点となるディレクトリ `root` と適用順に並べた `scopes` の配列を持つオブジェクトとしてデフォルトエクスポートします。`root` に相対パスを指定した場合は、設定ファイルがある場所を基準に解決します。`root: "."` は設定ファイルのあるディレクトリ、`root: "./src"` はその下の `src/` を探索し、探索起点の `.gitignore` を参照します。シンボリックリンクはリンク先をたどります。ただし、リンク先を解決できないリンクと、探索中の上位ディレクトリへ戻るリンクは読み飛ばします。

- `scope` は、探索起点からの相対パスで検査対象を指定する glob です。スコープと import 先の glob は `./` から始めます。
- 各ファイルには最初に一致したスコープが適用されます。スコープ内では、最初に一致したルールで各 import の許可・禁止が決まり、どのルールにも一致しない import は禁止されます。どのスコープにも属さないファイルは検査対象外です。
- `allowed` と `restricted` には import 先の glob の配列を指定します。探索起点から見た import 元の相対パス（`./` で始まる文字列）を受け取り、glob の配列を返す関数も指定できます。`./src/ui` のようなディレクトリの指定は、その配下のパスにも一致します。
- `sibling: true` は、import 元と同じディレクトリおよびそのサブディレクトリ内への import を許可します。`sibling: false` は同じ範囲への import を禁止します。
- `name` はレポートに表示するルール名です。
- `only: true` はデバッグ用です。この指定のあるスコープだけを検査し、終了コードは `1` になります。

検査対象は `.ts` と `.tsx` ファイルの静的な `import` 宣言です。パッケージ名や TypeScript のパスエイリアスも含め、import 先の文字列を import 元からのファイルパスとして扱います。照合に使うのは探索起点からの相対パスです。たとえば `src/domain/order.ts` の `../ui/button` は `./src/ui/button` として照合されます。

## CLI オプションと終了コード

| オプション                    | 動作                                                                                                                                                            |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--unscoped`                  | 検査されなかったファイルを一覧表示します。                                                                                                                      |
| `--verbose`                   | 詳細ログと処理時間を表示します。                                                                                                                                |
| `--unmatched-patterns <mode>` | どの import にも一致しなかったパターンの扱いを指定します。`off`（既定値）は報告を省略し、`warn` は報告のみ、`error` は報告したうえで終了コードを `1` にします。 |

配列に書いたパターンは、スコープに該当するファイルが0件でも未使用として扱います。関数ルールでは、検査したファイルに対して関数が返したパターンを判定します。

導入時は、`--unscoped` でスコープから漏れたファイルを、`--unmatched-patterns warn` で使われていないパターンを確認できます。

import の検査に通ると終了コードは `0` です。禁止された import、設定や引数のエラー、`error` モードでの未使用パターン、`only: true` の指定がある場合は `1` になります。構文エラーがあるファイルは報告してスキップするので、プロジェクトの TypeScript のチェックと併用してください。

## プロジェクトのチェックに組み込む

プロジェクトの `package.json` にスクリプトを追加します。

```json
{
	"scripts": {
		"check:imports": "acrop ./acrop.config.ts"
	}
}
```

設定ファイルとパッケージマネージャーのロックファイルをコミットします。CI で依存関係をインストールしたあと、`npm run check:imports` または `pnpm run check:imports` を実行します。

## ライセンス

acrop は [MIT ライセンス](../LICENSE)で公開されています。

## 開発

リポジトリは mise で Node.js と pnpm のバージョンを固定しています。 [mise のインストール手順](https://mise.jdx.dev/installing-mise.html) · [mise.toml](../mise.toml)

```sh
git clone https://github.com/crescware/acrop.git
cd acrop
mise install
mise exec -- pnpm install --frozen-lockfile
mise exec -- pnpm build
```

ビルドすると `dist/index.mjs` が生成されます。ローカルでビルドした CLI を試すには、プロジェクトの設定ファイルのパスを渡します。

```sh
mise exec -- node dist/index.mjs /path/to/project/acrop.config.ts
```

| コマンド                    | 動作                                                                             |
| --------------------------- | -------------------------------------------------------------------------------- |
| `mise exec -- pnpm check`   | TypeScript の型チェック、oxlint、oxfmt のフォーマット検査、Vitest を実行します。 |
| `mise exec -- pnpm format`  | oxfmt で整形し、`package.json` と `scripts` のキーも並べ替えます。               |
| `mise exec -- pnpm test`    | Vitest のテストを実行します。                                                    |
| `mise exec -- pnpm build`   | 検証を実行して CLI をビルドします。                                              |
| `mise exec -- pnpm publish` | 検証とビルドを実行して、パッケージを npm に公開します。                          |
