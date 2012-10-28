Support Utility JS
======================
機能が使えるかどうかや端末情報など全27種の情報を取得するJavaScriptライブラリ

デモ
------
http://dev.creatorish.com/demo/support-util/

取得できる情報
------
+    サポート関連 - ○○が使えるかどうかのチェック7種
+    ベンダー関連 - ブラウザ名やベンダープレフィックスなど6種
+    デバイス関連 - 端末情報やＯＳ・Retinaディスプレイかどうかなどのチェック12種
+    Flash関連 -  FlashPlayerがインストールされているかどうかやバージョンなど2種

使い方
------

support-util.jsを読み込むだけです。取得できる情報は$s変数内に以下のように格納されます。

### サポート関連 ###

+    $s.support.cookie: true/false : クッキーが使えるかどうか
+    $s.support.transform3d: true/false : Transform3Dが使えるかどうか（Firefoxではまだ検知できません）
+    $s.support.touch: true/false : タッチイベントが使えるかどうか
+    $s.support.geolocation: true/false : GPS情報が取得できるかどうか
+    $s.support.devicemotion: true/false : DeviceMotionイベントが使えるかどうか
+    $s.support.deviceorientation: true/false : DeviceOrientationイベントが使えるかどうか
+    $s.support.getComputedStyle: true/false : getComputedStyle関数が定義されているかどうか

### ベンダー関連 ###

+    $s.vendor.name: Microsoft/Google/Apple/Mozilla/Opera : ブラウザベンダー名
+    $s.vendor.browser: IE/Chrome/Safari/Firefox/Opera : ブラウザ名
+    $s.vendor.version: 0.0 : ブラウザのバージョン
+    $s.vendor.prefix: -ms-/-webkit-/-webkit-/-moz-/-o- : アクセスしたブラウザのベンダープレフィックス
+    $s.vendor.transitionend: MSTransitionEnd/webkitTransitionEnd/webkitTransitionEnd/transitionend/oTransitionEnd : アクセスしたブラウザのtransitionendイベント名
+    $s.vendor.animationend: MSAnimationEnd/webkitAnimationEnd/webkitAnimationEnd/animationend/oAnimationEnd : アクセスしたブラウザのanimationendイベント名

### デバイス関連 ###

+    $s.device.version: 0 : iOS/AndroidのOSバージョン（Win/Macは取得できません）
+    $s.device.windows: true/false : ウィンドウズかどうか
+    $s.device.mac: true/false : マックかどうか
+    $s.device.iPhone: true/false : iPhoneかどうか
+    $s.device.iPad: true/false : iPadかどうか
+    $s.device.android: true/false : Androidかどうか
+    $s.device.tablet: true/false : タブレット端末（iPad/Android Pad）かどうか
+    $s.device.androidTablet: true/false : Androidタブレット端末かどうか
+    $s.device.androidMobile: true/false : Androidモバイル端末かどうか
+    $s.device.mobile: true/false : モバイル端末（iPhone/Androidモバイル）かどうか
+    $s.device.windowsPhone: true/false : ウィンドウズフォンかどうか
+    $s.device.retina: true/false : Retinaディスプレイかどうか

### Flash関連 ###

+    $s.flash.version: 0.0 : FlashPlayerのバージョン
+    $s.flash.support: true/false : FlashPlayerがインストールされているかどうか


注意点
------

ユーザーエージェントによる振り分けなので、容易に変更可能です。  
厳密な処理は新しいブラウザやバージョンが出るたびにチェックが必要なため行っていません。

ライセンス
--------
[MIT]: http://www.opensource.org/licenses/mit-license.php
Copyright &copy; 2012 creatorish.com
Distributed under the [MIT License][mit].

作者
--------
creatorish yuu  
Weblog: <http://creatorish.com>  
Facebook: <http://facebook.com/creatorish>  
Twitter: <http://twitter.jp/creatorish>