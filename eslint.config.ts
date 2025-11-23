import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import { defineConfig, globalIgnores } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

// 基本的にファイルタイプごとの推奨スタイルを使用する
export default defineConfig([
  globalIgnores([
    'package*.json',
    'tsconfig.json',
    'node_modules/',
    'dist/',
  ]),
  // 基本スタイル設定
  stylistic.configs.recommended,
  // JavaScript/TypeScript
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], plugins: { js }, extends: ['js/recommended'], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
  // JSON（コメント付きを標準とする）
  { files: ['**/*.{json,jsonc}'], plugins: { json }, language: 'json/jsonc', extends: ['json/recommended'] },
  // Markdown
  { files: ['**/*.md'], plugins: { markdown }, language: 'markdown/gfm', extends: ['markdown/recommended'] },
  // 個別ルール
  {
    // vitest テストコード
    files: ['**/*.test.ts'],
    rules: {
      // TypeScriptのグローバル設定 vitest/globals によるエラーを抑制する
      'no-undef': 'off',
    },
  },
])
