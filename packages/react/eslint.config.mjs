import sharedConfig from "@repo/eslint/eslint.config.mjs";
import tsParser from "@typescript-eslint/parser";

export default [
	...sharedConfig,
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 10,
			sourceType: "script",

			parserOptions: {
				project: "./tsconfig.json",
			},
		},
	},
];
