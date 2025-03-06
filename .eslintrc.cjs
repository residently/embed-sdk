module.exports = {
  extends: [
    "airbnb",
    "airbnb-typescript",
    "prettier",
    "plugin:jest/recommended",
  ],
  plugins: ["import", "jest"],
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
  env: {
    browser: true,
    "jest/globals": true,
  },
  settings: {
    react: {
      version: "18",
    },
    "import/internal-regex":
      "^tests|components/",
  },
  rules: {
    curly: ["error", "all"],
    "import/no-relative-parent-imports": "error",
    "import/extensions": "off",
    "import/no-anonymous-default-export": "error",
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "block",
        next: "*",
      },
      {
        blankLine: "always",
        prev: "block-like",
        next: "*",
      },
      {
        blankLine: "always",
        prev: "function",
        next: "*",
      },
      {
        blankLine: "always",
        prev: "switch",
        next: "*",
      },
      {
        blankLine: "always",
        prev: "throw",
        next: "*",
      },
      {
        blankLine: "always",
        prev: "try",
        next: "*",
      },
    ],
    "prefer-arrow-callback": [
      "error",
      {
        allowNamedFunctions: true,
      },
    ],
    "react/function-component-definition": "off",
    "react/jsx-no-duplicate-props": [
      "error",
      {
        ignoreCase: false,
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],
  },
  overrides: [
    {
      files: ["tests/**/*"],
      rules: {
        "import/no-unresolved": "off",
      },
    },
  ],
};
