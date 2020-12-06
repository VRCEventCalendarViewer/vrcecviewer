<!-- eslint-disable vue/no-v-html -->
<template>
  <v-app>
    <v-main>
      <!--期間指定-->
      <v-row align="center">
        <v-col cols="auto">
          <v-text-field
            v-model="start"
            placeholder="Start Date"
            single-line
            hide-details
            readonly
          >
            <template #append-outer>
              <date-picker v-model="start" />
            </template>
          </v-text-field>
        </v-col>

        <v-col cols="auto">~</v-col>

        <v-col cols="auto">
          <v-text-field
            v-model="end"
            placeholder="End Date"
            single-line
            hide-details
            readonly
          >
            <template #append-outer>
              <date-picker v-model="end" />
            </template>
          </v-text-field>
        </v-col>

        <v-col cols="auto">
          <v-btn @click="updateData">Update</v-btn>
        </v-col>
      </v-row>

      <!--タグ条件指定-->
      <v-row align="center">
        <v-col cols="auto">Filter</v-col>
        <v-col cols="auto">
          <v-btn
            small
            rounded
            class="filter-mode-btn"
            @click="toggleFilterMode"
          >
            <v-icon>
              {{ and ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off' }}
            </v-icon>
            {{ and ? 'AND' : 'OR' }}
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn small rounded @click="resetFilter">
            <v-icon small>mdi-delete</v-icon> Clear
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            v-for="genre in $getGenres()"
            :key="genre.name"
            small
            :class="`genre-tag ${
              (filter & genre.flag) === 0
                ? 'genre-not-selected'
                : 'genre-selected'
            }`"
            :color="`${
              (filter & genre.flag) === 0 ? 'transparent' : genre.color
            }`"
            :style="`color: ${
              (filter & genre.flag) !== 0 ? 'white' : '#777777'
            };`"
            @click="tag(genre)"
          >
            {{ genre.name }}
          </v-btn>
        </v-col>
      </v-row>

      <!--イベントデータ表示-->
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              Events ({{ dataStart }} ~ {{ dataEnd }})
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
              :loading="loading"
              loading-text="Loading..."
              @click:row="eventRowClicked"
            >
              <template #item.genre="{ item }">
                <v-btn
                  v-for="genre in $parseGenre(item.genre)"
                  :key="genre.name"
                  x-small
                  depressed
                  class="genre-tag"
                  :color="genre.color"
                  @click.stop="tag(genre)"
                >
                  {{ genre.name }}
                </v-btn>
              </template>

              <template #item.organizer="{ item }">
                <div v-html="$sanitize(item.organizer)"></div>
              </template>

              <template
                v-if="!this.$vuetify.breakpoint.xs"
                #item.details="{ item }"
              >
                <v-tooltip
                  left
                  color="blue-grey"
                  max-width="400"
                  :v-if="!item.description"
                >
                  <template #activator="{ on, attrs }">
                    <!--
                    <v-btn icon :to="`/event/${item.gcal_id}?${backToQueryParams}`">
                      <v-icon>mdi-book-open-outline</v-icon>
                    </v-btn>
                    -->
                    <v-btn
                      v-if="item.description"
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-book-open-outline</v-icon>
                    </v-btn>
                  </template>

                  <span v-html="$sanitize(item.description)"></span>
                </v-tooltip>
              </template>
              <template v-else #item.details="{ item }">
                <v-btn icon :to="`/event/${item.gcal_id}?${backToQueryParams}`">
                  <v-icon>mdi-book-open-outline</v-icon>
                </v-btn>
              </template>
            </v-data-table>

            <v-snackbar v-model="showLoadFailed" color="orange" align="center">
              <span> <v-icon>mdi-alert</v-icon> Failed to load data </span>
              <template #action="{ attrs }">
                <v-btn text v-bind="attrs" @click="updateData">
                  <v-icon>mdi-autorenew</v-icon> Retry
                </v-btn>
              </template>
            </v-snackbar>
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
  async asyncData(context) {
    /**
     * デフォルトはこれから1週間のイベント情報を取得
     * クエリに期間が指定されていればその期間で取得
     *
     * クエリからフィルター条件を読み取って返す
     */
    const now = new Date()
    const oneWeekLater = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 8
    )

    let start = formatDate(now)
    let end = formatDate(oneWeekLater)
    let filter = 0
    let and = true

    if ('start' in context.query) {
      start = context.query.start
    }
    if ('end' in context.query) {
      end = context.query.end
    }
    if ('filter' in context.query) {
      filter = Number(context.query.filter)
    }
    if ('and' in context.query) {
      and = Boolean(Number(context.query.and))
    }

    const url = context.$config.apiBaseUrl + '?start=' + start + '&end=' + end

    const data = await axios
      .get(url)
      .then((response) => response.data.events)
      .catch((error) => {
        console.log(error)
      })

    return {
      start,
      end,
      events: data || [],
      dataStart: data ? start : null,
      dataEnd: data ? end : null,
      filter,
      and,
      loading: false,
      showLoadFailed: !data,
    }
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
      events: [],
      sortDesc: [false],
      search: null,
      loading: true,
      showLoadFailed: false,
    }
  },
  head: {
    title: 'Home',
  },
  computed: {
    filteredEvents() {
      if (this.filter === 0) {
        return this.events
      } else if (this.and) {
        return this.events.filter((e) => {
          return (e.genre & this.filter) === this.filter
        })
      } else {
        return this.events.filter((e) => {
          return (e.genre & this.filter) !== 0
        })
      }
    },
    backToQueryParams() {
      return (
        'start=' +
        this.dataStart +
        '&end=' +
        this.dataEnd +
        '&filter=' +
        this.filter +
        '&and=' +
        Number(this.and)
      )
    },
  },
  methods: {
    tag(tag) {
      // フラグ更新
      this.filter ^= tag.flag
    },
    toggleFilterMode() {
      this.and = !this.and
    },
    resetFilter() {
      this.filter = 0
    },
    async updateData() {
      this.loading = true
      this.showLoadFailed = false
      this.events = []

      this.dataStart = this.start
      this.dataEnd = this.end

      const url =
        this.$config.apiBaseUrl +
        '?start=' +
        this.dataStart +
        '&end=' +
        this.dataEnd

      this.events =
        (await axios
          .get(url)
          .then((response) => response.data.events)
          .catch((error) => {
            console.log(error)
            this.showLoadFailed = true
          })) || []

      this.loading = false
    },
    eventRowClicked(event) {
      if (this.$vuetify.breakpoint.xs) {
        // スマホの場合は行クリックでも詳細ページに飛ばない（誤クリック防止）
        return
      }
      this.$router.push(
        '/event/' + event.gcal_id + '?' + this.backToQueryParams
      )
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
  margin: 0px 3px 0px 0px;
}
.genre-selected {
  color: transparent;
  border: 1px solid;
}
.genre-not-selected {
  color: #222222;
  border: 1px solid;
}
.filter-mode-btn {
  width: 6em;
}
</style>
