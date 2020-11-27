<!-- eslint-disable vue/no-v-html -->
<template>
  <v-app>
    <v-main>
      <v-card>
        <v-container>
          <v-card-title>{{ event.summary }}</v-card-title>

          <v-card-subtitle>
            {{ event.start }} ~ {{ event.end }}

            <span class="tags-outside">
              <span class="tags-inside">
                <span
                  v-for="genre in $parseGenre(event.genre)"
                  :key="genre.name"
                  class="genre-tag"
                  :style="`background-color: ${genre.color};`"
                >
                  <small class="genre-tag-text">{{ genre.name }}</small>
                </span>
              </span>
            </span>
          </v-card-subtitle>

          <v-divider class="mx-3"></v-divider>

          <v-card-text>
            <v-card flat>
              <v-card-title>Organizer</v-card-title>
              <v-card-text>
                <div v-html="$sanitize($auto_link(event.organizer))"></div>
              </v-card-text>
            </v-card>

            <v-card flat>
              <v-card-title>Description</v-card-title>
              <v-card-text>
                <div v-html="$sanitize($auto_link(event.description))"></div>
              </v-card-text>
            </v-card>

            <v-card flat>
              <v-card-title>Conditions</v-card-title>
              <v-card-text>
                <div v-html="$sanitize($auto_link(event.conditions))"></div>
              </v-card-text>
            </v-card>

            <v-card flat>
              <v-card-title>How to join</v-card-title>
              <v-card-text>
                <div v-html="$sanitize($auto_link(event.how))"></div>
              </v-card-text>
            </v-card>

            <v-card flat>
              <v-card-title>Note</v-card-title>
              <v-card-text>
                <div v-html="$sanitize($auto_link(event.note))"></div>

                <div v-html="$sanitize($auto_link(event.others))"></div>
              </v-card-text>
            </v-card>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :to="backTo">
              <v-icon>mdi-keyboard-backspace</v-icon> Back
            </v-btn>
            <v-btn
              :href="`https://www.google.com/calendar/event?eid=${event.link}`"
              rel="noopener"
              target="_blank"
            >
              <v-icon>mdi-calendar</v-icon>
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData(context) {
    /**
     * クエリで指定されたIDのイベント情報を取得
     *
     * 検索ページに戻るための情報もクエリから取得して設定
     */
    const gcalId = context.params.event
    const start = context.query.start
    const end = context.query.end
    const filter = context.query.filter
    const and = context.query.and
    let backTo = '/'

    if (
      context.$isString(start) &&
      start &&
      context.$isString(end) &&
      end &&
      context.$isString(filter) &&
      filter &&
      context.$isString(and) &&
      and
    ) {
      backTo +=
        '?start=' + start + '&end=' + end + '&filter=' + filter + '&and=' + and
    }
    const event = await axios
      .get('https://api.vrcec-viewer.rioil.dev?gcal_id=' + gcalId)
      .then((response) => {
        return response.data.events[0]
      })
      .catch((error) => {
        console.log(error)
      })
    return { gcalId, event, backTo }
  },
  head: {
    title: 'イベント詳細',
  },
}
</script>

<style scoped>
.genre-tag {
  margin: 2px 4px 2px 0px;
  padding: 0.5px 12px;
  border-radius: 5px;
  display: inline-block;
  margin-left: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.genre-tag-text {
  color: #eeeeee;
}

.tags-outside {
  display: flex;
}

.tags-inside {
  margin-left: auto;
}
</style>
