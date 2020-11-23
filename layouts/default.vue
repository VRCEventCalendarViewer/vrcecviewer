<template>
  <v-app>
    <v-container>
      <h1>VRC Event Calendar Viewer</h1>
      <Nuxt />
      <v-footer>
        <v-row justify="center" no-gutters>
          <v-btn
            v-for="link in links"
            :key="link.name"
            :href="link.url"
            color="white"
            text
            rounded
            class="my-2"
          >
            {{ link.name }}
          </v-btn>

          <v-col class="text-center" cols="12">
            <small>
              このサイトは
              <a
                href="https://sites.google.com/view/vrchat-event"
                target="_blank"
              >
                VRChatイベントカレンダー
              </a>
              のデータを利用しています． 詳しくは，
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
