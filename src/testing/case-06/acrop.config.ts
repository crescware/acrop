const config = {
	root: ".",
	scopes: [
		{
			scope: "./a/**/*",
			rules: [
				{ restricted: ["./b/**/*"] },
				{ allowed: ["./a/**/*", "./b/**/*", "./c/**/*"] },
			],
		},
	],
};

export default config;
