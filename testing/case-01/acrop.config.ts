const config = {
  root: ".",
  scopes: [
    {
      scope: "./a/**/*",
      allowed: ["./b/**/*"],
    },
  ],
};

export default config;
