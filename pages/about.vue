<template>
  <v-app>
    <v-main>
      <v-card>
        <v-card-title>About</v-card-title>
        <v-card-text>
          <v-card flat>
            <v-card-title>このサイトの目的</v-card-title>
            <v-card-text>
              <a
                href="https://sites.google.com/view/vrchat-event"
                target="_blank"
              >
                VRChatイベントカレンダー
              </a>
              に登録されたイベントのキーワードやジャンルによる検索機能を提供し，よりイベントを見つけやすくすることを目的としています．
            </v-card-text>
          </v-card>

          <v-card flat>
            <v-card-title>使用しているデータ</v-card-title>
            <v-card-text>
              当サイトは，カッコウ様が管理されている
              <a
                href="https://sites.google.com/view/vrchat-event"
                target="_blank"
              >
                VRChatイベントカレンダー
              </a>
              に登録されたイベントデータを
              <a
                href="https://sites.google.com/view/vrchat-event/%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E3%83%87%E3%83%BC%E3%82%BF%E4%BA%8C%E6%AC%A1%E5%88%A9%E7%94%A8%E6%96%B9%E9%87%9D"
                target="_blank"
              >
                イベントデータ二次利用方針
              </a>
              に基づいて利用しています．
            </v-card-text>
          </v-card>

          <v-card flat>
            <v-card-title>当サイトからのデータ取得</v-card-title>
            <v-card-text>
              当サイトはデータを
              <a href="https://developers.google.com/calendar" target="_blank">
                Google Calendar API
              </a>
              を用いて取得し，各種機能の提供のために加工しています．<br />
              情報の正確性確保，及びサーバー負荷防止のため，当サイト，及び当サイト内部APIからのデータ取得は禁止させて頂きます．
            </v-card-text>
          </v-card>

          <v-card flat>
            <v-card-title>問い合わせ先</v-card-title>
            <v-card-text>
              当サイトに関するお問い合わせは，画面下部にあるCONTACTからお願いします．<br />
              <a
                href="https://sites.google.com/view/vrchat-event"
                target="_blank"
              >
                VRChatイベントカレンダー
              </a>
              に登録されたイベントデータの内容の修正依頼等は，カッコウ様
              <a href="https://twitter.com/nest_cuckoo_" target="_blank">
                @nest_cuckoo_
              </a>
              にお願いします．
            </v-card-text>
          </v-card>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn to="/"><v-icon>mdi-home</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
  head: {
    title: 'About',
  },
}
</script>
