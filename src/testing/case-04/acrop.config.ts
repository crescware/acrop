const config = {
	root: ".",
	scopes: [
		{
			scope: "./a/**/*",
			rules: [{ allowed: ["./a/a3"] }],
			disallowSiblingImportsUnlessAllow: true,
		},
	],
};

export default config;
