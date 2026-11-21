# acrop

[日本語](docs/README.ja.md)

acrop checks import boundaries in TypeScript projects. Use it to keep domain code independent of the UI, limit imports between features, or make shared code accessible from selected parts of an application.

## Quick start

### Install acrop

With Node.js 22 or later, run the command for your package manager in the project you want to check. The GitHub release archive includes the built CLI. [Release v0.0.14](https://github.com/crescware/acrop/releases/tag/v0.0.14)

```sh
# npm
npm install --save-dev https://github.com/crescware/acrop/archive/refs/tags/v0.0.14.tar.gz

# pnpm
pnpm add --save-dev https://github.com/crescware/acrop/archive/refs/tags/v0.0.14.tar.gz
```

### Define an import boundary

For a project laid out like this, add `acrop.config.ts` at the project root:

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

This scope checks files under `src/domain/`. The first rule blocks imports from `src/ui/`, and the second allows other targets under `src/`.

### Run the check

List `node_modules/` and generated directories such as `dist/` in your project's `.gitignore` to skip them. From your project root, pass the configuration file as a command-line argument:

```sh
# npm
npm exec -- acrop ./acrop.config.ts

# pnpm
pnpm exec acrop ./acrop.config.ts
```

For example, if `src/domain/order.ts` contains these imports, the first is allowed and the second is reported:

```ts
import { id } from "../shared/id";
import { button } from "../ui/button";
```

```text
./src/domain/order.ts (1)
2:24 ./src/ui/button No UI imports in domain code
```

The report shows the importing file, its violation count, the line and column of the import, the target path, and the rule name. This run exits with status `1`.

## How configuration works

The configuration must default-export an object with `root: "."` and an ordered `scopes` array. acrop scans from the directory containing the configuration file and reads the `.gitignore` in that directory.

- `scope` is a glob that matches source files relative to the configuration directory. Start scope and target globs with `./`.
- The first matching scope applies to each file. Within that scope, the first matching rule decides each import. Imports in scope that match no rule are restricted. Files outside all scopes are skipped.
- `allowed` and `restricted` accept arrays of target globs. They also accept functions that take the importing file's path relative to the configuration directory, prefixed with `./`, and return an array of globs. A directory pattern such as `./src/ui` also matches paths below it.
- `sibling: true` allows targets in the importing file's directory and its subdirectories. `sibling: false` restricts those targets.
- `name` gives a rule a label in reports.
- `only: true` runs only the scopes marked for debugging and exits with status `1`.

acrop checks static `import` declarations in `.ts` and `.tsx` files. It interprets the import string as a filesystem path relative to the importing file, even for package names or TypeScript aliases. The rules match the resulting path relative to the configuration directory. For example, `../ui/button` from `src/domain/order.ts` matches `./src/ui/button`.

## CLI options and exit codes

| Option                        | Behavior                                                                                                                                                                |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--unscoped`                  | List files that acrop did not check.                                                                                                                                    |
| `--verbose`                   | Show diagnostic logs and timings.                                                                                                                                       |
| `--unmatched-patterns <mode>` | Choose how to handle rule patterns that never matched an import. `off` (default) skips the report, `warn` reports the patterns, and `error` also exits with status `1`. |

Use `--unscoped` to review which files your scopes leave out and `--unmatched-patterns warn` to find unused patterns when introducing acrop.

Status `0` means the import check passed. A restricted import, a configuration or argument error, an unused pattern in `error` mode, or an active `only: true` scope causes status `1`. Files with syntax errors are reported and skipped. Keep your project's TypeScript check alongside acrop.

## Add acrop to project checks

Add a script to your project's `package.json`:

```json
{
	"scripts": {
		"check:imports": "acrop ./acrop.config.ts"
	}
}
```

Commit the configuration and your package manager's lockfile. After installing dependencies in CI, run `npm run check:imports` or `pnpm run check:imports`.

## License

acrop is released under the [MIT License](LICENSE).

## Development

The repository pins Node.js and pnpm with mise. [mise installation guide](https://mise.jdx.dev/installing-mise.html) · [mise.toml](mise.toml)

```sh
git clone https://github.com/crescware/acrop.git
cd acrop
mise install
mise exec -- pnpm install --frozen-lockfile
mise exec -- pnpm build
```

The build produces `dist/index.mjs`. Pass the path to a project's configuration file to try the local build:

```sh
mise exec -- node dist/index.mjs /path/to/project/acrop.config.ts
```

| Command                    | What it does                                                                      |
| -------------------------- | --------------------------------------------------------------------------------- |
| `mise exec -- pnpm check`  | Run TypeScript, oxlint, the oxfmt check, and the Vitest suite.                    |
| `mise exec -- pnpm format` | Format files with oxfmt, including sorting `package.json` and its `scripts` keys. |
| `mise exec -- pnpm test`   | Run the Vitest suite.                                                             |
| `mise exec -- pnpm build`  | Run the checks and build the CLI.                                                 |
