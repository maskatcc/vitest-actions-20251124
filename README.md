# vitest-actions (2025/11/24)

## 前提となる環境条件

### （必須）ツール：[actionlint](https://github.com/rhysd/actionlint)

GitHub actions のワークフローファイル（.yml）の、`run` コマンド（bash）をチェックする  
`winget` を使ってインストールする（`scoop`、`chocolatey` も可能）

```pwsh
winget install actionlint
```

ワークフローファイルを管理しているプロジェクトで actionlint を実行する（.ymlファイル指定不要）  

```pwsh
actionlint
```

- [GitHub Actions のワークフローをチェックする actionlint をつくった \- はやくプログラムになりたい](https://github.com/adrienverge/yamllint)

### （推奨）VSCode拡張機能：[YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)

1. YAML validation:
   - Detects whether the entire file is valid yaml
   - Detects errors such as:
     - Node is not found
     - Node has an invalid key node type
     - Node has an invalid type
     - Node is not a valid child node
2. Document Outlining (Ctrl + Shift + O):
   - Provides the document outlining of all completed nodes in the file
3. Auto completion (Ctrl + Space):
   - Auto completes on all commands
   - Scalar nodes autocomplete to schema's defaults if they exist
4. Hover support:
   - Hovering over a node shows description if provided by schema
5. Formatter:
   - Allows for formatting the current file
   - On type formatting auto indent for array items

## 参考サイト

- [【初心者向け】【入門】GitHub Actionsとは？書き方、デバッグ設定、runs\-onやcheckoutなどの仕組みや構造も含めて徹底解説 \#Linux \- Qiita](https://qiita.com/shun198/items/14cdba2d8e58ab96cf95)
- [GitHub Actions の手動実行で入力された値を安全に使いたい](https://zenn.dev/hankei6km/articles/use-github-acions-workflow-dispatch-inputs-safely)
- [GitHub Actionsを使ってVitestの自動実行とカバレッジをPR上で表示させよう！ \#GitHubActions \- Qiita](https://qiita.com/shun198/items/f640b3d3bf73d2cc3510)
- [davelosert/vitest\-coverage\-report\-action: A GitHub Action to report vitest test coverage results](https://github.com/davelosert/vitest-coverage-report-action)
- [Github Actions matrix includeを使った実装方法](https://zenn.dev/masa9436/articles/f8d3971ef822b7)
