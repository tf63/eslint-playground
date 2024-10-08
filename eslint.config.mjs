import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

const extend = compat.extends(
	// 'airbnb',
	// 'plugin:@typescript-eslint/recommended',
	// 'plugin:@typescript-eslint/recommended-requiring-type-checking',
	// 'plugin:import/errors',
	// 'plugin:import/warnings',
	// 'plugin:import/typescript',
	// 'next/core-web-vitals',
	"prettier",
);

const rules = {
	"no-implicit-coercion": ["error", { boolean: false }],
	"no-empty-pattern": "off",
	"no-unused-vars": "off",
	// 'unused-imports/no-unused-imports': 'error',
	// 'unused-imports/no-unused-vars': [
	//     'warn',
	//     {
	//         vars: 'all',
	//         varsIgnorePattern: '^_',
	//         args: 'after-used',
	//         argsIgnorePattern: '^_',
	//     },
	// ],

	// 'react/function-component-definition': 'off',
	// 'react/button-has-type': 'off',
	// 'react/jsx-filename-extension': [1, { extensions: ['.jsx', 'tsx'] }],
	// 'react/no-array-index-key': 'warn',

	// 'import/no-unresolved': 'off',
	// 'import/prefer-default-export': 'off',
	// 'import/no-default-export': 'off',
	// 'import/extensions': 'off',

	// '@typescript-eslint/strict-boolean-expressions': 'error',
};

const ignores = {
	ignores: [
		"**/vite.config.ts",
		"**/tsup.config.ts",
		"**/postcss.config.mjs",
		"**/vitest.config.ts",
		"**/playwright.config.ts",
		"**/tailwind.config.ts",
		"**/next.config.mjs",
		"**/node_modules/**/*",
		"**/public/**/*",
		"**/dist/**/*",
		"**/dist-ssr/**/*",
		"**/build/**/*",
		"**/storybook-static/**/*",
		"**/coverage/**/*",
		"**/bin/**/*",
		"**/obj/**/*",
		"**/out/**/*",
		"**/.yarn/**/*",
		"**/.pnpm-store/**/*",
		"**/.next/**/*",
		"**/.vercel/**/*",
		"**/.swc/**/*",
		"**/.turbo/**/*",
	],
};

export default [
	ignores,
	...fixupConfigRules(extend),
	{
		files: [
			"**/*.js",
			"**/*.jsx",
			"**/*.mjs",
			"**/*.cjs",
			"**/*.ts",
			"**/*.tsx",
		],
		rules: rules,
		plugins: {
			"unused-imports": unusedImports,
		},
		settings: {
			"import/parsers": {
				"@typescript-eslint/parser": [".ts", ".tsx"],
			},
		},
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 10,
			sourceType: "script",

			parserOptions: {
				project: "./tsconfig.json",
			},
		},
	},
	{
		files: ["**/features/", "**/components/", "**/lib/"],
		rules: {
			"import/no-default-export": "error",
		},
	},
	{
		files: ["**/*.stories.*", "**/*.story.*"],
		rules: {
			useHookAtTopLevel: "off",
		},
	},
];
