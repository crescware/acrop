const config = {
  root: ".",
  scopes: [
    {
      scope: "./a/**/*",
      allowed: [],
      disallowSiblingImportsUnlessAllow: true,
    },
  ],
};

export default config;
