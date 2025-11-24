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
