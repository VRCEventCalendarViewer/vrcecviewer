<template>
  <v-app>
    <v-container>
      <h1>VRChat Event Calendar Viewer</h1>
      <Nuxt />
      <v-footer>
        <v-row justify="center" no-gutters>
          <v-btn
            v-for="link in links"
            :key="link.name"
            :to="link.url"
            color="white"
            text
            rounded
            class="my-2"
          >
            {{ link.name }}
          </v-btn>

          <v-menu offset-y open-on-hover top>
            <template #activator="{ on, attrs }">
              <v-btn
                color="white"
                text
                rounded
                class="my-2"
                v-bind="attrs"
                v-on="on"
              >
                Contact
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                href="https://forms.gle/TdjRg9goXDQTbhM49"
                target="_blank"
                rel="noopener"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    通常のお問い合わせ （Google Forms）
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                href="https://twitter.com/rioil_dev"
                target="_blank"
                rel="noopener"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    緊急のお問い合わせ （Twitter DM）
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-col class="text-center" cols="12">
            <small>
              このサイトは
              <a
                href="https://vrceve.com/"
                target="_blank"
                rel="noopener"
              >
                VRChatイベントカレンダー
              </a>
              のデータを利用しています． 詳しくは
              <NuxtLink to="/about">About</NuxtLink>
              ページをご確認ください．
            </small>
          </v-col>

          <v-col class="text-center" cols="12">
            {{ new Date().getFullYear() }} - <strong>rioil</strong>
          </v-col>
        </v-row>
      </v-footer>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: 'Home',
          url: '/',
        },
        {
          name: 'About',
          url: '/about',
        },
      ],
    }
  },
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
