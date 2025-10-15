module.exports = {
  env: { node: true, es2022: true },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parserOptions: { ecmaVersion: 2022, sourceType: "script" },
  ignorePatterns: ["dist/", "logs/", "coverage/"],
  rules: {
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "no-console": "off",
  },
};
