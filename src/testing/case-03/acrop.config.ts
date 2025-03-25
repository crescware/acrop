const config = {
	root: ".",
	scopes: [
		{
			scope: "./a/**/*",
			rules: [{ allowed: [] }],
			disallowSiblingImportsUnlessAllow: true,
		},
	],
};

export default config;
