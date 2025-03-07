import residently from "@residently/eslint-config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...residently,

  {
    ignores: ["tests/support"],
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
    },

    settings: {
      react: {
        version: "18",
      },
    },
  }
);
