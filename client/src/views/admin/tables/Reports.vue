<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <base-material-card icon="mdi-calendar-search">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              GENERA REPORTS
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-select
                    v-model="selectedFridges"
                    :items="items"
                    chips
                    label="Frigoriferi"
                    multiple
                    outlined
                  >
                    <template v-slot:prepend-item>
                      <v-list-item
                        ripple
                        @click="toggle"
                      >
                        <v-list-item-action>
                          <v-icon :color="selectedFridges.length > 0 ? 'indigo darken-4' : ''">
                            {{ icon }}
                          </v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title>Tutti i frigoriferi</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider class="mt-2" />
                    </template>
                  </v-select>
                </v-col>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="dateRangeText"
                      label="Intervallo data selezionato"
                      prepend-icon="mdi-calendar"
                      hint="YYYY/MM/DD "
                      :show-current="datess"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-date-picker
                      v-model="dates"
                      range
                      locale="it"
                    />
                  </v-col>
                </v-row>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                  >
                    GENERA REPORT
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card
          color="success"
          icon="mdi-clipboard-text"
          inline
          title="Frigo 1 Belluno Rapporti"
          class="px-5 py-3 mb-5"
        >
          <v-simple-table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Note</th>
                <th>Stato </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>03/07/2020</td>
                <td>Frigo 1</td>
                <td>Frigorifero1Belluno</td>
                <td>In pulizia</td>
                <td class="text-right">
                  <v-btn
                    v-for="(action, i) in actions"
                    :key="i"
                    class="px-2 ml-1"
                    :color="action.color"
                    min-width="0"
                    small
                  >
                    <v-icon
                      small
                      v-text="action.icon"
                    />
                  </v-btn>
                </td>
              </tr>

              <tr>
                <td>03/07/2020</td>
                <td>Frigo 2</td>
                <td>Frigorifero2Belluno</td>
                <td>Attivo</td>
                <td class="text-right">
                  <v-btn
                    v-for="(action, i) in actions"
                    :key="i"
                    class="px-2 ml-1"
                    :color="action.color"
                    min-width="0"
                    small
                  >
                    <v-icon
                      small
                      v-text="action.icon"
                    />
                  </v-btn>
                </td>
              </tr>

              <tr>
                <td>03/07/2020</td>
                <td>Frigo 3</td>
                <td>Frigorifero3Belluno</td>
                <td>Attivo</td>
                <td class="text-right">
                  <v-btn
                    v-for="(action, i) in actions"
                    :key="i"
                    class="px-2 ml-1"
                    :color="action.color"
                    min-width="0"
                    small
                  >
                    <v-icon
                      small
                      v-text="action.icon"
                    />
                  </v-btn>
                </td>
              </tr>

              <tr>
                <td>03/07/2020</td>
                <td>Frigo 4</td>
                <td>Frigorifero4Belluno</td>
                <td>In manutenzione</td>
                <td class="text-right">
                  <v-btn
                    v-for="(action, i) in actions"
                    :key="i"
                    class="px-2 ml-1"
                    :color="action.color"
                    min-width="0"
                    small
                  >
                    <v-icon
                      small
                      v-text="action.icon"
                    />
                  </v-btn>
                </td>
              </tr>

              <tr>
                <td>03/07/2020</td>
                <td>Frigo 5</td>
                <td>Frigorifero5Belluno</td>
                <td>Spento</td>

                <td class="text-right">
                  <v-btn
                    v-for="(action, i) in actions"
                    :key="i"
                    class="px-2 ml-1"
                    :color="action.color"
                    min-width="0"
                    small
                  >
                    <v-icon
                      small
                      v-text="action.icon"
                    />
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import moment from 'moment'

  export default {
    //
    name: 'Reports',
    data: () => ({

      dates: [],
      datess: ['yyyy/mm/dd', 'yyyy/mm/dd'],

      // dates1 : retdaterange(),
      // date: new Date().toISOString().substr(0, 10),
      date: moment().format('YYYY-MM-DD').substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      items: [
        'Frigo1Belluno',
        'Frigo2Dolomitti',
        'FrigoBelluno',
        'Frigo4Belluno',
        'Frigo5Dolomitti',
        'Frigo6FDolomiti',
        'Frigo7Belluno',
        'Frigo8Dolomitti'],
      selectedFridges: [],
      dropdown_icon: [
        { text: 'Tutti i frigoriferi', callback: () => console.log('list') },
        { text: 'Frigo1', callback: () => console.log('list') },
        { text: 'Frigo1', callback: () => console.log('favorite') },
        { text: 'Frigo1', callback: () => console.log('delete') },
      ],
    }),
    computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
      likesAllFruit () {
        return this.selectedFridges.length === this.items.length
      },
      likesSomeFruit () {
        return this.selectedFridges.length > 0 && !this.likesAllFruit
      },
      icon () {
        if (this.likesAllFruit) return 'mdi-close-box'
        if (this.likesSomeFruit) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },

    },
    methods: {
      toggle () {
        this.$nextTick(() => {
          if (this.likesAllFruit) {
            this.selectedFridges = []
          } else {
            this.selectedFridges = this.items.slice()
          }
        })
      },
    },
  }
</script>
