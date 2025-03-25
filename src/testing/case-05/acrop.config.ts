const config = {
	root: ".",
	scopes: [
		{
			scope: "./a/**/*",
			rules: [{ restricted: ["./b/**/*"] }],
		},
	],
};

export default config;
