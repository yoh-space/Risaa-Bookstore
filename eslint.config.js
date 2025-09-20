import babelParser from "@babel/eslint-parser";
import { defineConfig } from "eslint/config";
import pluginImport from "eslint-plugin-import";  // ✅ add this
import pluginReactNative from "eslint-plugin-react-native";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      "react-native": pluginReactNative,
      import: pluginImport,   // ✅ register plugin
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
    },
      rules: {
        "react-native/no-raw-text": "error",
        "no-undef": "error",
        "import/no-unresolved": "error",
        "import/named": "error",
        "import/default": "error",
        "no-unused-vars": "warn",
      },
    extends: [],
  },
]);