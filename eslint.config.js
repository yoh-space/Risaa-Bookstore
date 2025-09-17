import pluginReactNative from "eslint-plugin-react-native";
import { defineConfig } from "eslint/config";
import babelParser from "@babel/eslint-parser";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { "react-native": pluginReactNative },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        // requireConfigFile: false means we need to specify babel options here
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"] // <-- Add this line
        }
      }
    },
    rules: {
      "react-native/no-raw-text": "error"
    },
    extends: [],
  },
]);
