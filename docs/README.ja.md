# acrop

[English](../README.md)

acrop は TypeScript プロジェクトの import をルールに沿って検査する CLI です。たとえば、ドメイン層から UI 層への import を禁止し、コードの依存方向を保てます。

## ソースからビルド

ビルド済み CLI の実行には Node.js 22 以上が必要です。acrop のビルドには mise をインストールし、リポジトリで固定した Node.js と pnpm を使います。 [mise のインストール手順](https://mise.jdx.dev/installing-mise.html) · [mise.toml](../mise.toml)

```sh
git clone https://github.com/crescware/acrop.git
cd acrop
mise install
mise exec -- pnpm install --frozen-lockfile
mise exec -- pnpm build
```

ビルドすると `dist/index.mjs` が生成されます。

## プロジェクトを検査する

検査したいディレクトリに `acrop.config.ts` を作成します。必須フィールドの `root` に `"."` を指定し、設定をデフォルトエクスポートしてください。acrop は `.ts` と `.tsx` ファイルを探索し、設定ファイルと同じディレクトリの `.gitignore` を参照します。

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

この例では、`src/domain/order.ts` から `../shared/id` への import は許可され、`../ui/button` への import は禁止されます。各ファイルには最初に一致したスコープが適用され、各 import の許可・禁止は最初に一致したルールで決まります。スコープ内でどのルールにも一致しない import は禁止されます。

acrop のリポジトリから、検査対象プロジェクトの設定ファイルのパスを渡して実行します。

```sh
mise exec -- node dist/index.mjs /path/to/project/acrop.config.ts
```

### 設定項目

- `scope` は、設定ファイルのディレクトリからの相対パスで対象ファイルを指定する glob です。スコープと import 先の glob は `./` から始めます。
- `allowed` と `restricted` には import 先の glob の配列を指定します。import 元の相対パスを受け取り、glob の配列を返す関数も指定できます。
- `sibling: true` は、import 元と同じディレクトリおよびそのサブディレクトリ内への import を許可します。`sibling: false` は同じ範囲への import を禁止します。
- `name` はレポートに表示するルール名です。
- `only: true` はデバッグ用です。指定したスコープだけを検査し、終了コードは `1` になります。

検査対象は静的な `import` 宣言です。acrop は import 先の文字列を import 元ファイルからのパスとして解釈し、設定ファイルのディレクトリからの相対パスをルールと照合します。パッケージ名や TypeScript のパスエイリアスも同じ方法で扱います。

### CLI オプション

| オプション                    | 動作                                                                                                                                                            |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--unscoped`                  | 検査されなかったファイルを一覧表示します。                                                                                                                      |
| `--verbose`                   | 詳細ログと処理時間を表示します。                                                                                                                                |
| `--unmatched-patterns <mode>` | どの import にも一致しなかったパターンの扱いを指定します。`off`（既定値）は報告を省略し、`warn` は報告のみ、`error` は報告したうえで終了コードを `1` にします。 |

禁止された import が見つかった場合、CLI の終了コードは `1` です。構文エラーがあるファイルは報告し、import の検査をスキップします。

## 開発

セットアップ後、リポジトリのルートで次のコマンドを実行できます。

| コマンド                   | 動作                                                                             |
| -------------------------- | -------------------------------------------------------------------------------- |
| `mise exec -- pnpm check`  | TypeScript の型チェック、oxlint、oxfmt のフォーマット検査、Vitest を実行します。 |
| `mise exec -- pnpm format` | oxfmt で整形し、`package.json` と `scripts` のキーも並べ替えます。               |
| `mise exec -- pnpm test`   | Vitest のテストを実行します。                                                    |
| `mise exec -- pnpm build`  | 検証を実行して CLI をビルドします。                                              |

Ubuntu で Node の起動時に `libatomic.so.1` が見つからない場合は、そのライブラリを提供する OS パッケージをインストールしてください。 [Ubuntu の libatomic1 パッケージ](https://packages.ubuntu.com/resolute/libatomic1)

## ライセンス

acrop は [MIT ライセンス](../LICENSE)で公開されています。
