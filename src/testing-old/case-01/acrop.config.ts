const config = {
	root: ".",
	scopes: [
		{
			scope: "./a/**/*",
			rules: [{ allowed: ["./a/**/*", "./b/**/*"] }],
		},
	],
};

export default config;
