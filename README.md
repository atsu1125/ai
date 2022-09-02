<h1><p align="center"><img src="./ai.svg" alt="いあ" height="200"></p></h1>
<p align="center">An Ai for Misskey. <a href="./torisetu.md">About Ai</a></p>

## これなに
Misskey用の日本語Botです。

## インストール
> Node.js と npm と MeCab (オプション) がインストールされている必要があります。

まず適当なディレクトリに `git clone` します。
次にそのディレクトリに `config.json` を作成します。中身は次のようにします（おそらくtrue, false, 数字を入れるときは""を外さないといけない。）:

``` json
{
	"host": "https:// + あなたのインスタンスのURL (末尾の / は除く)",
	"i": "いあとして動かしたいアカウントのアクセストークン",
	"master": "管理者のユーザー名(オプション)",
	"notingEnabled": "ランダムにノートを投稿する機能を無効にする場合は false を入れる",
	"keywordEnabled": "キーワードを覚える機能 (MeCab が必要) を有効にする場合は true を入れる (無効にする場合は false)",
	"keywordInterval": "キーワードを覚える間隔 (分, デフォルト60分)",
	"chartEnabled": "チャート機能を無効化する場合は false を入れてください",
	"reversiEnabled": "いあとリバーシで対局できる機能を有効にする場合は true を入れる (無効にする場合は false)",
	"serverMonitoring": "サーバー監視の機能を有効にする場合は true を入れる (無効にする場合は false)",
	"mecab": "MeCab のインストールパス (ソースからインストールした場合、大体は /usr/local/bin/mecab)",
	"mecabDic": "MeCab の辞書ファイルパス (オプション)",
	"mecabNeologd": "MeCabの辞書に mecab-ipadic-NEologd を使用している場合は true にすると良いかも"
	"welcomeLocal": "新規さんを見つけました！を有効にする場合はtrueを入れる"
}
```
`yarn install` して `yarn build` して `yarn start` すれば起動できます

Dockerの場合は最初に `memory/memory.json` に空ファイルを作っておく必要がある

Dockerイメージはここにある https://hub.docker.com/r/mei23/ia/

これをsystemctlで扱いたいので`/etc/systemd/system/ia.service`を作成
```
[Unit]
Description=ia

[Service]
Type=simple
Environment=NODE_ENV=production
User='iaの実行ユーザーを指定'
ExecStart=/usr/bin/npm start
WorkingDirectory='iaをインストールしたディレクトリ'
TimeoutSec=60
SyslogIdentifier=ia
Restart=always

[Install]
WantedBy=multi-user.target
```
`systemctl enable --now ia.service`で自動起動を設定して起動、`systemctl status ia.service`でステータスを確認できる。

## フォント
一部の機能にはフォントが必要です。いあにはフォントは同梱されていないので、ご自身でフォントをインストールディレクトリに`font.ttf`という名前で設置してください。

## 記憶
いあは記憶の保持にインメモリデータベースを使用しており、いあのインストールディレクトリに `memory.json` という名前で永続化されます。

## ライセンス
MIT

## Awards
<img src="./WorksOnMyMachine.png" alt="Works on my machine" height="120">
