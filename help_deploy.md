# RenderでMERNアプリをデプロイする手順（初心者向け）

---

## 1. 事前準備
- プロジェクトをGitHubにpushしておく（すでに完了していればOK）
- MongoDB Atlasの接続情報を用意しておく

---

## 2. Renderにサインアップ／ログイン
1. https://render.com/ にアクセス
2. GoogleアカウントやGitHubアカウントで登録・ログイン

---

## 3. バックエンド（Node.js/Express）をデプロイ
1. ダッシュボードで「New +」→「Web Service」を選択
2. 「Connect a repository」でGitHubと連携し、対象リポジトリを選択
3. 「Name」：サービス名を入力（例：mern-backend）
4. 「Root Directory」：backend などサーバーディレクトリ名を入力
5. 「Environment」：Node
6. 「Build Command」：
   ```
   npm install
   ```
7. 「Start Command」：
   ```
   node server.js
   ```
8. 「Environment Variables」：
   - `PORT`（空欄でもOK、Renderが自動で割り当てる場合も多い）
   - `MONGODB_URI`（MongoDB Atlasの接続URI）
9. 「Create Web Service」をクリック

---

## 4. フロントエンド（Vite/Reactなど）をデプロイ
1. ダッシュボードで「New +」→「Static Site」を選択
2. 対象リポジトリを選択
3. 「Name」：サービス名を入力（例：mern-frontend）
4. 「Root Directory」：mern などフロントエンドディレクトリ名を入力
5. 「Build Command」：
   ```
   npm install && npm run build
   ```
6. 「Publish Directory」：
   ```
   dist
   ```
7. 必要に応じてAPIのURL（例：VITE_API_URL）を環境変数で設定
8. 「Create Static Site」をクリック

---

## 5. サーバーとクライアントの接続
- フロントエンドのAPIリクエスト先（例：axiosのbaseURL）をRenderのbackendのURLに変更
- Viteの場合、.envファイルに
  ```
  VITE_API_URL=https://xxxxxx.onrender.com/api
  ```
  などと記載し、`import.meta.env.VITE_API_URL` で参照

---

## 6. デプロイ完了・動作確認
- Renderの各サービスページに「Live URL」が表示される
- フロントエンドのURLにアクセスし、アプリが正しく動作するか確認
- APIが動かない場合はCORS設定やAPIのURLが正しいか確認

---

## 7. よくあるトラブルと対策
- MongoDBに接続できない → IPホワイトリストやユーザー名・パスワードを再確認
- APIのURLが間違っている → .envや設定ファイルを見直す
- デプロイ後に変更した場合は「Manual Deploy」や「Clear cache & deploy」を実行

---

分からない点やエラーが出た場合は、どの段階か・エラーメッセージなどを教えてください。さらに詳しくサポートします！
