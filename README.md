# acrop

[日本語](docs/README.ja.md)

acrop is a command-line tool for enforcing import boundaries in TypeScript projects. Use it to control which parts of your project can import from one another, such as keeping domain code independent of UI code.

## Build from source

The built CLI requires Node.js 22 or later. To build acrop, install mise and use the Node.js and pnpm versions pinned in the repository. [mise installation guide](https://mise.jdx.dev/installing-mise.html) · [mise.toml](mise.toml)

```sh
git clone https://github.com/crescware/acrop.git
cd acrop
mise install
mise exec -- pnpm install --frozen-lockfile
mise exec -- pnpm build
```

The build produces `dist/index.mjs`.

## Check a project

Create an `acrop.config.ts` in the directory you want to scan. Set the required `root` field to `"."` and export the configuration as the default export. acrop scans `.ts` and `.tsx` files and uses the `.gitignore` next to the configuration file.

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

In this example, `src/domain/order.ts` can import `../shared/id`, while `../ui/button` is restricted. The first matching scope applies to each file, and the first matching rule decides whether to allow each import. Within a scope, imports that match no rule are restricted.

From the acrop checkout, pass the path to your project's configuration file:

```sh
mise exec -- node dist/index.mjs /path/to/project/acrop.config.ts
```

### Configuration

- `scope` is a glob that matches source files relative to the configuration directory. Start scope and target globs with `./`.
- `allowed` and `restricted` accept arrays of target globs. They also accept functions that take the importing file's relative path and return an array of globs.
- `sibling: true` allows targets in the importing file's directory and its subdirectories. `sibling: false` restricts those targets.
- `name` gives a rule a label in reports.
- `only: true` runs only the scopes marked for debugging and exits with status 1.

acrop checks static `import` declarations. It interprets each import string as a filesystem path from the importing file and matches the resulting path relative to the configuration directory. This same path matching applies to package names and TypeScript aliases.

### CLI options

| Option                        | Behavior                                                                                                                                                              |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--unscoped`                  | List files that acrop did not check.                                                                                                                                  |
| `--verbose`                   | Show diagnostic logs and timings.                                                                                                                                     |
| `--unmatched-patterns <mode>` | Choose how to handle rule patterns that never matched an import. `off` (default) skips the report, `warn` reports the patterns, and `error` also exits with status 1. |

The CLI exits with status 1 when it finds a restricted import. Files with syntax errors are reported and skipped.

## Development

Run these commands from the repository root after setup:

| Command                    | What it does                                                                      |
| -------------------------- | --------------------------------------------------------------------------------- |
| `mise exec -- pnpm check`  | Run TypeScript, oxlint, the oxfmt check, and the Vitest suite.                    |
| `mise exec -- pnpm format` | Format files with oxfmt, including sorting `package.json` and its `scripts` keys. |
| `mise exec -- pnpm test`   | Run the Vitest suite.                                                             |
| `mise exec -- pnpm build`  | Run the checks and build the CLI.                                                 |

On Ubuntu, if Node fails to start with a missing `libatomic.so.1` error, install the system package that provides it. [Ubuntu's libatomic1 package](https://packages.ubuntu.com/resolute/libatomic1)

## License

acrop is released under the [MIT License](LICENSE).
