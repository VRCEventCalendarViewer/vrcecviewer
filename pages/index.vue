<template>
  <v-app>
    <v-main>
      <!--
        <p>
          <table>
            <tr>
              <th>Summary</th>
              <th>Start</th>
              <th>End</th>
              <th>Note</th>
            </tr>
            <tr v-for="event in events" :key="event.id">
              <td>{{ event.summary }}</td>
              <td>{{ event.start }}</td>
              <td>{{ event.end }}</td>
              <td><div v-html="$sanitize(event.note)"></div></td>
            </tr>
          </table>
        </p>
        -->
      <v-row>
        <v-col cols="3">
          <v-text-field
            v-model="startDate"
            placeholder="Start Date"
            single-line
          >
            <template v-slot:append-outer>
              <date-picker v-model="startDate" />
            </template>
          </v-text-field>
          <v-label></v-label>
        </v-col>

        <v-col cols="3">
          <v-text-field v-model="endDate" placeholder="End Date" single-line>
            <template v-slot:append-outer>
              <date-picker v-model="endDate" />
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              This Month's Events
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="events"
              :search="search"
              sort-by="start"
              :sort-desc="sortDesc"
            >
              <template v-slot:item.link="{ item }">
                <a
                  :href="`https://www.google.com/calendar/event?eid=${item.link}`"
                  target="_blank"
                  ><v-icon>mdi-calendar</v-icon>
                </a>
              </template>

              <template v-slot:item.details="{ item }">
                <NuxtLink :to="`/event/${item.gcal_id}`"
                  ><v-icon>mdi-book-open-outline</v-icon></NuxtLink
                >
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import DatePicker from '~/components/DatePicker'

export default {
  components: {
    DatePicker,
  },
  asyncData() {
    return axios
      .get('http://localhost:8000/')
      .then((response) => {
        return { events: response.data.events }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  data() {
    return {
      headers: [
        {
          text: 'Summary',
          value: 'summary',
        },
        {
          text: 'Organizer',
          value: 'organizer',
        },
        {
          text: 'Start',
          value: 'start',
        },
        {
          text: 'End',
          value: 'end',
        },
        {
          text: 'Detail',
          value: 'details',
          sortable: false,
        },
      ],
      sortDesc: [true],
      startDate: null,
      endDate: null,
      search: null,
    }
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
