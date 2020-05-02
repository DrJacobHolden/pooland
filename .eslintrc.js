// webpack hot reload aborts if there are any errors, so only warn locally
const errorInCI = process.env.CI ? "error" : "warn";

module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "plugin:ramda/recommended", "prettier", "prettier/react"],
  plugins: ["prefer-arrow", "ramda", "react-hooks", "prettier"],
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    jsx: true,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    curly: ["error"],
    camelcase: 0,
    "no-console": [errorInCI, { allow: ["warn", "error"] }],
    "no-unused-vars": errorInCI,
    "no-debugger": errorInCI,
    "import/no-cycle": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-named-default": 0,
    "import/prefer-default-export": 0,
    "no-use-before-define": 0,
    "prefer-arrow/prefer-arrow-functions": [
      "error",
      { disallowPrototype: true, singleReturnOnly: true },
    ],
    "prettier/prettier": "error",
    "react-hooks/exhaustive-deps": 0,
    "react-hooks/rules-of-hooks": "error",
    "react/jsx-boolean-value": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "react/require-default-props": 0,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js"],
      },
    },
  },
};
