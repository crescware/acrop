const config = {
  root: ".",
  scopes: [
    {
      scope: "./a/**/*",
      allowed: ["./a/a3"],
      disallowSiblingImportsUnlessAllow: true,
    },
  ],
};

export default config;
