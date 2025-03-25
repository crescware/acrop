const config = {
	root: ".",
	scopes: [
		{
			scope: "./a/**/*",
			rules: [{ allowed: ["./b/**/*"] }],
		},
	],
};

export default config;
