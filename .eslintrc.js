module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    camelcase: "off",
    "no-use-before-define": "off",
    "no-unused-vars": "off",
    "no-labels": "off",
    "spaced-comment": "off",
    "lines-between-class-members": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "react/react-in-jsx-scope": "off",
    "promise/param-names": "off",
    "import/no-unresolved": "off",
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     endOfLine: 'auto', // resolves 'CRLF' vs 'LF' conflicts
    //   },
    // ],
  },
  ignorePatterns: [
    "**/dist",
    "**/lib",
    "**/node_modules",
    "**/tests",
    "**/*.js",
  ],
};
