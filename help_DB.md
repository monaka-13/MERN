# MongoDBへの接続方法（Node.js＋Mongoose）

---


## 1. MongoDBアカウント作成・クラスタ作成
1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) にアクセスし、アカウントを作成。
2. 「Build a Database」から無料クラスタ（Free Tier）を作成。
3. クラスタ作成後、「Database Access」からユーザー名・パスワードを設定。
4. 「Network Access」からIPアドレス（0.0.0.0/0 で全許可も可）を追加。

---

## 2. データベースアクセスユーザーの作成方法
1. Atlasダッシュボード左メニュー「Database Access」をクリック。
2. 「Add New Database User」をクリック。
3. ユーザー名・パスワードを入力。
4. 「Database User Privileges」は「Read and write to any database」または必要な権限を選択。
5. 「Add User」をクリック。

---

## 2. 接続用URIの取得
1. Atlasダッシュボードで「Connect」→「Connect your application」を選択。
2. 表示された「Connection string」をコピー（例：  
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   ）

---

## IPアドレス
MongoDB Atlasにログイン
左メニュー「Network Access」をクリック
「IP Access List」または「IP Whitelist」画面で「Add IP Address」をクリック
「Current IP Address」を選択して追加、または「0.0.0.0/0」と入力して全てのIPからの接続を許可
「Confirm」や「Save」などで保存


## 3. Node.jsプロジェクトの準備
1. プロジェクトディレクトリで以下を実行：
   ```
   npm init -y
   npm install mongoose
   ```

---


## 4. コードでMongoDBに接続

例：`server.js` の冒頭で以下のように記述

```javascript
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});
```

---


## 5. コレクションへの参照方法（MongoDB Atlas上での手順）

1. MongoDB Atlasにログインし、対象プロジェクトのクラスタを選択します。
2. 「Collections」タブをクリックします。
3. データベースとコレクションの一覧が表示されます。
4. 参照したいデータベース名をクリックし、目的のコレクション名を選択します。
5. コレクション内のドキュメント（データ）が一覧表示され、内容を確認・編集・追加・削除できます。

※GUI上でデータの検索やフィルタ、追加・編集・削除も可能です。

---


## 6. セキュリティのためのベストプラクティス

- 接続URIは直接コードに書かず、`.env`ファイルやRenderの「Environment Variables」に設定し、  
  `process.env.MONGODB_URI` で参照するのが推奨です。

---


## 7. 動作確認

- サーバーを起動し、`Connected to MongoDB` と表示されれば接続成功です。

---

ご不明点があれば、どの手順か教えてください。さらに詳しくサポートします！
