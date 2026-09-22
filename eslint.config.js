import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    prettier,

    {
        "files": ["src/**/*.ts", "src/**/*.js"],
        "languageOptions": {
            "parser": tseslint.parser,
            "sourceType": "module",
            "globals": {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021
            }
        },
        "rules": {
            "prettier/prettier": "error",
            "@typescript-eslint/no-explicit-any": "off",
            "prefer-const": "warn",
            "no-console": "off"
        }
    },

    {
        "ignores": ["dist/**", "node_modules/**", "webpack.config.js", "eslint.config.js"]
    }
];