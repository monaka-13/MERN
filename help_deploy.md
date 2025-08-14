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


## 5. サーバーとクライアントの接続（詳細）

### 1. Renderでバックエンド（API）のURLを確認
1. Renderのダッシュボードで、作成したバックエンド（Web Service）をクリックします。
2. 上部に「Service URL」や「Live URL」として `https://xxxxxx.onrender.com` のようなURLが表示されます。
   例: `https://mern-stl2.onrender.com`


### 2. フロントエンドのAPIリクエスト先を修正（さらに詳しく）

#### 【なぜ修正が必要？】
ローカル開発時は `http://localhost:3000/api` など自分のパソコンのサーバーにアクセスしていましたが、
Renderにデプロイした後は「Render上のサーバー（Web Service）」のURLにアクセスする必要があります。

#### 【RenderのバックエンドURLの調べ方】
1. Renderのダッシュボードで、作成したバックエンド（Web Service）をクリックします。
2. 上部に「Service URL」や「Live URL」として `https://xxxxxx.onrender.com` のようなURLが表示されます。
   例: `https://mern-backend-abc123.onrender.com`

#### 【どこを修正する？】
フロントエンドのAPIリクエスト部分（例：axiosやfetchでAPIを呼び出している部分）を探します。

##### 例1: axiosを使っている場合
```js
// 変更前（ローカル用）
axios.defaults.baseURL = "http://localhost:3000/api";

// 変更後（Render用）
axios.defaults.baseURL = "https://mern-backend-abc123.onrender.com/api";
```

##### 例2: fetchを使っている場合
```js
// 変更前
fetch("http://localhost:3000/api/tasks")

// 変更後
fetch("https://mern-backend-abc123.onrender.com/api/tasks")
```

#### 【ViteやReactで環境変数を使う場合】
1. フロントエンドのプロジェクト直下に `.env` ファイルを作成（または編集）します。
2. 以下のように記載します。
   ```
   VITE_API_URL=https://mern-backend-abc123.onrender.com/api
   ```
3. フロントエンドのコードで `import.meta.env.VITE_API_URL` を使ってAPIのURLを参照します。
   ```js
   axios.defaults.baseURL = import.meta.env.VITE_API_URL;
   // または
   fetch(`${import.meta.env.VITE_API_URL}/tasks`)
   ```

#### 【修正後の流れ】
1. .envやコードを修正したら、必ずGitHubにpushします。
2. Renderのフロントエンド（Static Site）で「Manual Deploy」や「Clear cache & deploy」を実行します。
3. フロントエンドのURLにアクセスし、API経由でデータ取得や送信ができるか確認します。

---

### 3. Viteの場合のおすすめ設定
1. フロントエンドのプロジェクト直下に `.env` ファイルを作成（または編集）します。
2. 以下のように記載します。
   ```
   VITE_API_URL=https://mern-backend-abc123.onrender.com/api
   ```
3. フロントエンドのコードで `import.meta.env.VITE_API_URL` を使ってAPIのURLを参照します。
   ```js
   axios.defaults.baseURL = import.meta.env.VITE_API_URL;
   ```

### 4. デプロイ後の注意
- .envファイルを修正した場合は、必ずGitHubにpushし、Renderで再デプロイ（または「Manual Deploy」）してください。
- APIのURLが正しく設定されていないと、フロントエンドからデータ取得や送信ができません。

---

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
