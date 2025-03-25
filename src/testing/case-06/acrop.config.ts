const config = {
	root: ".",
	scopes: [
		{
			scope: "./a/**/*",
			rules: [{ restricted: ["./b/**/*"] }, { allowed: ["./c/**/*"] }],
		},
	],
};

export default config;
