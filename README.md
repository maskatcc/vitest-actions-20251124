# Node.js by TypeScript テンプレート（2025/10/26 版）

## npm 初期化とセットアップ

npm の初期化コマンドを実行して `package.json` ファイルを作成する

```cmd
npm init -y
```

`package.json` に `type` を指定して、ESModule 方式を有効化する

```json
{
  "name": "...",
  "version": "...",
  "type": "module",
  "...": "..."
}
```

## TypeScript インストールとセットアップ

TypeScript コンパイラ（tsc）を、Node.js 型定義と一緒にインストールする

```cmd
npm install --save-dev typescript @types/node
```

TypeScript を初期化して設定ファイル `tsconfig.json` を作成する

```cmd
npx tsc --init
```

TypeScript 設定を環境にあわせて構成する  

初期化した直後は、任意のプロジェクト環境における推奨設定となっているので、個別の環境にあわせて最小限の調整をおこなう  
最初はコメントアウトされている `rootDir` や `outDir` の他に、`include` を解除すれば十分と思われる  
このタイミングで `include` を指定するのは、設定ファイルに `.ts` を使用するパッケージがあり、それはコンパイル対象外にするため（例：vitest, ESLint）

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    "rootDir": "./src",
    "outDir": "./dist",
    "...": "..."
  },
  "include": ["./src/**/*"]
}
```

コンパイル（より正確には、トランスパイル）の出力先となる `dist` ディレクトリは、`.gitignore` ファイルでソース管理の対象外にする

```text
node_modules/
dist/
```

この環境で tsc を実行すると、`./src` ディレクトリ内に配置した `.ts` ファイルを、`./dist` ディレクトリに `.js` ファイルとしてトランスパイルできる  

```cmd
npx tsc
```

`package.json` にスクリプト実行を設定して npm コマンドとして実行することもできる

```json
{
  ...
  "scripts": {
    "build": "tsc",
    "test": "..."
  },
  ...
}
```

```cmd
npm run build
```

## vitest インストールとセットアップ

単体テスト実行環境として、`vitest` をインストールする

```cmd
npm install --save-dev vitest
```

vitest 設定ファイル `vitest.config.ts` を作成し、Node.js 向けの設定とする

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    exclude: ['node_modules', 'dist'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
```

`tsconfig.json` にて、`vitest/globals` の型定義をグローバル設定して、`.test.ts` ファイルにおける `expect` 等の明示的なインポートを不要にする

```json
{
  "compilerOptions": {
    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "nodenext",
    "target": "esnext",
    "types": ["vitest/globals"],

    "...": "...",
  }
}
```

`package.json` にスクリプト設定して npm コマンドでテスト実行できるようにする

```json
{
  ...
  "scripts": {
    "...": "...",
    "test": "vitest --config vitest.config.ts"
  },
  ...
}
```

テストを実行すると、次のようなテスト結果が出力される

```cmd
npm test
```

```cmd
 DEV  v4.0.3 {project-name}

 ✓ src/main.test.ts (1 test) 1ms
   ✓ main (1)
     ✓ hello 1ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  16:02:30
   Duration  189ms (transform 27ms, setup 0ms, collect 35ms, tests 1ms, environment 0ms, prepare 11ms)
```

## ESLint インストールとセットアップ

### ESLint インストール

リンター環境として、`ESLint` をインストールする  
公式サイトの案内に従って以下のコマンドを実行する

```cmd
npm init @eslint/config@latest
```

ウィザードが始まり、プロジェクト環境に応じて選択する

- リンター対象：JavaScript、JSON や Markdown はお好みで
- リンター動作：チェックと自動修正
- モジュール種類：ESModule (esm)
- フレームワーク：使用しない（none）
- TypeScript：使用する
- 実行環境：Node.js
- 設定ファイル形式：TypeScript形式
- マークダウン形式：GitHub flavor + Jitiを利用する

選択したパッケージを npm でインストールし、 ESLint 設定ファイル `eslint.config.ts` を作成する

## ESLint stylistic インストールとセットアップ

続けて、`ESLint` プラグインのスタイルフォーマッターである `stylistic` をインストールする  

```cmd
npm install --save-dev @stylistic/eslint-plugin
```

> 現状 `Prettier` の方が圧倒的にメジャーだが、いずれ `ESLint stylistic` が主流になると考えている  
> `ESLint stylistic` は後発ながら ESLint 公式プラグインのため、当然ながらリンターとの相性がよく、ESLint 設定ファイルとの統合により、環境系エラーに遭遇する可能性が低い  
> そして重要な点として、`ESLint stylistic` ルールは `Prettier` よりシンプルで、現状のスタンダードな推奨ルールに従うだけでよく、個人的にはセンスが良いと感じる  
>
> そして、このプラグイン誕生に至った、以下の作者の意見に共感する
>
> - [Why? \| ESLint Stylistic](https://eslint.style/guide/why)
> - [Why I don't use Prettier](https://antfu.me/posts/why-not-prettier)

基本的に推奨ルールに従いながら個別ルールは最小限としつつ、`globalIgnores` などの調整を加えて、設定内容は以下のようにする（細かい部分はお好みで）

```ts
export default defineConfig([
  globalIgnores([
    'package*.json',
    'tsconfig.json',
    'node_modules/',
    'dist/',
  ]),
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
```

## husky & lint-staged インストールとセットアップ

ソースコードを管理する際に `ESLint` を強制する仕組みとして、`husky` と `lint-staged` をインストールする  

```cmd
npm install --save-dev husky lint-staged
```

### husky セットアップ

以下のコマンドを実行して、まずは `husky` を初期化する

```cmd
npx husky init
```

これで Git フックの仕組みを使い、`package.json` の prepare スクリプト設定を組み合わせて、`husky` が動作するようになる  
また、初期化時に自動生成されている `.husky/pre-commit` ファイルを以下のように変更する

```cmd
npx lint-staged
```

`husky` が介在してすることでコミット直前に `pre-commit` スクリプトが発火して、`lint-staged` が動作する  

### lint-staged セットアップ

`lint-staged` は、`package.json` の lint-staged 設定により、ステージ済みのファイルを対象としてスクリプトを実行する  
以下のように設定することで、コミット対象の `.ts` ファイル（`*.config.ts` を除く）に、`ESLint` の適用と TypeScript の型チェックを強制する  
これはチーム開発において非常に強力な安全弁となる

```json
{
  ...
  "lint-staged": {
    "!(*config).ts": [
      "eslint",
      "tsc --noEmit"
    ]
  },
  ...
}
```

### VSCode ESLint セットアップ

ESLint における最後の仕上げとして、以下のように `.vscode/settings.json` ファイルを作成する

```json
{
  "editor.codeActionsOnSave": {
    // ファイル保存時にESLintスタイルに自動修正する
    "source.fixAll.eslint": "explicit"
  }
}
```

これで VSCode を使って ESLint 対象ファイルを保存する際には、常に ESLint の指摘事項を自動修復するようになる  

前提として、VSCode 設定におけるデフォルトのフォーマッター設定だけは、プロジェクト設定の範囲を超えて、事前に準備しておく必要がある点に注意する  
これは、VSCodeに ESLint プラグインをインストールし、それをデフォルトフォーマッターに使えば良いはずだが、Prettier 派と競合する可能性がある
