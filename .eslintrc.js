module.exports = {
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["react", "prettier"],
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    jsx: true,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    curly: ["error"],
    camelcase: 0,
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-unused-vars": "warn",
    "no-debugger": "warn",
    "import/no-cycle": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-named-default": 0,
    "import/prefer-default-export": 0,
    "no-use-before-define": 0,
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5"
      }
    ],
    "react/jsx-boolean-value": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "react/require-default-props": 0
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js"]
      }
    },
    react: {
      pragma: "React",
      version: "detect"
    }
  }
};
