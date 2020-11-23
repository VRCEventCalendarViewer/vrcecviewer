<template>
  <v-app>
    <v-main>
      <v-card>
        <v-container>
          <v-card-title>{{ event.summary }}</v-card-title>

          <v-card-subtitle>
            {{ event.start }} ~ {{ event.end }}
            {{ event.genre }}
          </v-card-subtitle>

          <v-divider class="mx-3"></v-divider>

          <v-card-text>
            <v-card flat>
              <v-card-title>Organizer</v-card-title>
              <v-card-text>
                {{ event.organizer }}
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
                {{ event.conditions }}
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
            <v-btn to="/"><v-icon>mdi-keyboard-backspace</v-icon> Back </v-btn>
            <v-btn
              :href="`https://www.google.com/calendar/event?eid=${event.link}`"
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
  async asyncData({ params }) {
    const gcalId = params.event
    const event = await axios
      .get('http://localhost:8000?gcal_id=' + gcalId)
      .then((response) => {
        return response.data.events[0]
      })
      .catch((error) => {
        console.log(error)
      })
    return { gcalId, event }
  },
}
</script>
