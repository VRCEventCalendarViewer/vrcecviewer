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
      <v-row align="center">
        <v-col cols="auto">
          <v-text-field
            v-model="startDate"
            placeholder="Start Date"
            single-line
          >
            <template #append-outer>
              <date-picker v-model="startDate" />
            </template>
          </v-text-field>
        </v-col>

        <v-col cols="auto">
          <v-text-field v-model="endDate" placeholder="End Date" single-line>
            <template #append-outer>
              <date-picker v-model="endDate" />
            </template>
          </v-text-field>
        </v-col>

        <v-col cols="auto">
          <v-btn :href="`/?start=${startDate}&end=${endDate}`">Update</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="auto">Filter : </v-col>
        <v-col cols="auto">
          <span
            v-for="genre in genres"
            :key="genre.name"
            :class="`genre-tag ${
              (tagFlag & genre.flag) === 0
                ? 'genre-not-selected'
                : 'genre-selected'
            }`"
            :style="`background-color: ${
              (tagFlag & genre.flag) === 0 ? 'transparent' : genre.color
            };`"
          >
            <a
              :style="`color: ${
                (tagFlag & genre.flag) !== 0 ? 'white' : '#777777'
              };`"
              @click="tag(genre)"
            >
              {{ genre.name }}
            </a>
          </span>
        </v-col>
      </v-row>

      <!--
      <v-row>
        <v-col cols="auto">Filtered by : </v-col>
        <v-col cols="auto">
          <span
            v-for="genre in $parse_genre(tagFlag)"
            :key="genre.name"
            class="genre-tag"
            :style="`background-color: ${genre.color};`"
          >
            <small>
              <a class="genre-tag-text" @click="tag(genre)">
                {{ genre.name }}
              </a>
            </small>
          </span>
        </v-col>
      </v-row>
      -->

      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              Events ({{ startDate }} ~ {{ endDate }})
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
              :items="filteredEvents"
              :search="search"
              sort-by="start"
              :sort-desc="sortDesc"
            >
              <template #item.genre="{ item }">
                <span
                  v-for="genre in $parse_genre(item.genre)"
                  :key="genre.name"
                  class="genre-tag"
                  :style="`background-color: ${genre.color};`"
                >
                  <small>
                    <a class="genre-tag-text" @click="tag(genre)">
                      {{ genre.name }}
                    </a>
                  </small>
                </span>
              </template>

              <template #item.organizer="{ item }">
                <div v-html="$sanitize(item.organizer)"></div>
              </template>
              <!--
              <template v-slot:item.link="{ item }">
                <a
                  :href="`https://www.google.com/calendar/event?eid=${item.link}`"
                  target="_blank"
                  ><v-icon>mdi-calendar</v-icon>
                </a>
              </template>
              -->

              <template #item.details="{ item }">
                <NuxtLink :to="`/event/${item.gcal_id}`">
                  <v-icon>mdi-book-open-outline</v-icon>
                </NuxtLink>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col>
          <p>{{ $route.query.id }}</p>
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
  asyncData({ _params, query }) {
    const now = new Date()
    const oneWeekLater = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 8
    )

    let start = formatDate(now)
    let end = formatDate(oneWeekLater)

    if ('start' in query) {
      start = query.start
    }
    if ('end' in query) {
      end = query.end
    }

    const url =
      'https://api.vrcec-viewer.rioil.dev?start=' + start + '&end=' + end

    return axios
      .get(url)
      .then((response) => {
        return { startDate: start, endDate: end, events: response.data.events }
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
          width: '45%',
        },
        {
          text: 'Genre',
          value: 'genre',
          width: '20%',
          sortable: false,
        },
        {
          text: 'Organizer',
          value: 'organizer',
          width: '10%',
        },
        {
          text: 'Start',
          value: 'start',
          width: '10%',
        },
        {
          text: 'End',
          value: 'end',
          width: '10%',
        },
        {
          text: 'Detail',
          value: 'details',
          width: '5%',
          sortable: false,
        },
      ],
      sortDesc: [false],
      search: null,
      tagFlag: 0,
      genres: [
        {
          flag: 128,
          name: '初心者向け',
          color: '#666666',
        },
        {
          flag: 1,
          name: 'アバター試着会',
          color: '#660033',
        },
        {
          flag: 2,
          name: '改変アバター交流会',
          color: '#660033',
        },
        {
          flag: 8,
          name: 'VR飲み会',
          color: '#330066',
        },
        {
          flag: 16,
          name: '店舗系',
          color: '#336600',
        },
        {
          flag: 32,
          name: '音楽',
          color: '#006633',
        },
        {
          flag: 64,
          name: 'ロールプレイ',
          color: '#003366',
        },
        {
          flag: 4,
          name: 'その他交流会',
          color: 'black',
        },
        {
          flag: 256,
          name: '定期',
          color: 'black',
        },
      ],
    }
  },
  head: {
    title: 'Home',
  },
  computed: {
    filteredEvents() {
      if (this.tagFlag === 0) {
        return this.events
      } else {
        return this.events.filter((e) => {
          return (e.genre & this.tagFlag) !== 0
        })
      }
    },
  },
  methods: {
    tag(tag) {
      // フラグ更新
      this.tagFlag ^= tag.flag
    },
  },
}

function formatDate(date) {
  return (
    date.getFullYear() +
    '-' +
    zeroPadding(date.getMonth() + 1) +
    '-' +
    zeroPadding(date.getDate())
    /* + ' ' +
    zeroPadding(date.getHours()) +
    ':' +
    zeroPadding(date.getMinutes()) +
    ':' +
    zeroPadding(date.getSeconds()) */
  )
}

function zeroPadding(str) {
  return ('0' + str).slice(-2)
}
</script>

<style scoped>
.genre-tag {
  margin: 1px;
  padding: 0px 5px;
  border-radius: 5px;
  display: inline-block;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.genre-tag-text {
  color: white;
}
.genre-selected {
  color: transparent;
  border: 1px solid;
}
.genre-not-selected {
  color: #222222;
  border: 1px solid;
}
</style>
