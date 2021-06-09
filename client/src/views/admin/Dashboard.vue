<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        lg="6"
      >
        <base-material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="success"
          type="Line"
          class="px-4 py-3"
        >
          <h4 class="display-1 font-weight-light mt-2">
            Total Sales: {{totalSales}}
          </h4>

          <div class="grey--text font-weight-light">
            Sales Today: {{todaySales}}
          </div>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="6"
      >
        <base-material-chart-card
          :data="registerUserChart.data"
          :options="registerUserChart.options"
          :responsive-options="registerUserChart.responsiveOptions"
          color="orange darken-1"
          type="Line"
          class="px-4 py-3"
        >
          <h4 class="display-1 font-weight-light mt-2">
            Total Users: {{totalUsers}}
          </h4>

          <div class="grey--text font-weight-light">
            Enabled Users: {{enabledUsers}} , Active Users: {{activeUsers}}
          </div>
        </base-material-chart-card>
      </v-col>
      <v-col
        cols="12"
        lg="12"
      >
        <base-material-card
          color="success"
          icon="mdi-history"
          inline
          class="px-5 py-3"
        >
          <template v-slot:after-heading>
            <div class="display-2 font-weight-light">
              {{messages.purchaseHistory}}
            </div>
          </template>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            class="ml-auto"
            label="Search"
            hide-details
            single-line
            style="max-width: 250px;"
          />

          <v-divider class="mt-3"/>

          <v-data-table
            :headers="headers"
            :items="items"
            :search.sync="search"
            :sort-by="['name', 'office']"
            :sort-desc="[false, true]"
            :hide-default-header="true"
            :disable-sort="false"
            :must-sort="true"
          >
            <template v-slot:header="{headers}">
              <thead>
              <tr>
                <th>No</th>
                <th>Package Name</th>
                <th>Package Type</th>
                <th>Number Of Fridges</th>
                <th>Period</th>
                <th>Price</th>
                <th>User Name</th>
                <th>Address</th>
                <th>Company</th>
                <th>Country</th>
                <th>Purchase Date</th>
                <th>End Date</th>
              </tr>
              </thead>
            </template>
            <template v-slot:body="{ items }">
              <tbody>
              <tr v-for="(item, index) in items" :key="item.name">
                <td>{{ index + 1 }}</td>
                <td>{{ item.packageName }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.numberFridges }}</td>
                <td>{{ item.period }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.company }}</td>
                <td>{{ item.nation }}</td>
                <td>{{ item.startDate }}</td>
                <td>{{ item.endDate }}</td>
              </tr>
              </tbody>
            </template>
          </v-data-table>
        </base-material-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  import messages from '../../locales/en'
  import moment from 'moment'
  import {
    getActiveUsers,
    getEnabledUsers, getPurchaseHistory, getRegisteredUsersThisWeek,
    getSalesThisWeek,
    getTotalSales,
    getTotalUsers,
  } from '../../service/analytics'

  export default {
    data () {
      return {

        //
        messages: messages,
        headers: [
          {
            text: 'No',
            value: 'no',
          },
          {
            text: 'Package Name',
            value: 'packageName',
          },
          {
            text: 'Package Type',
            value: 'type',
          },
          {
            text: 'Number Of Fridges',
            value: 'numberFridges',
          },
          {
            text: 'Period',
            value: 'period',
          },
          {
            text: 'Price',
            value: 'price',
          },
          {
            text: 'User Name',
            value: 'username',
          },
          {
            text: 'Address',
            value: 'address',
          },
          {
            text: 'Company',
            value: 'company',
          },
          {
            text: 'Country',
            value: 'nation',
          },
          {
            text: 'Purchase Date',
            value: 'startDate',
          },
          {
            text: 'End Date',
            value: 'endDate',
          },
          /*{
            sortable: false,
            text: 'Actions',
            value: 'actions',
          },*/
        ],
        items: [],
        search: undefined,

        dailySalesChart: {
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            series: [],
          },
          options: {
            low: 0,
            high: 10, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
            showPoint: true,
          },
        },
        registerUserChart: {
          data: {
            // labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            series: [
              // [0,0,0,0,0,0,0]
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.none(),
            axisX: {
              showGrid: false,
            },
            low: 0,
            high: 10,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0,
            },
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                },
              },
            }],
          ],
        },
        totalSales: 0,
        todaySales: 0,
        totalUsers: 0,
        enabledUsers: 0,
        activeUsers: 0,
      }
    },

    async mounted () {
      this.$store.commit('SHOW_OVER_LAY', true)
      try {
        let token = localStorage.getItem('token')
        let res = await getTotalUsers({ token })
        this.totalUsers = res.data.data
        res = await getActiveUsers({ token })
        this.activeUsers = res.data.data
        res = await getEnabledUsers({ token })
        this.enabledUsers = res.data.data
        res = await getTotalSales({ token })
        this.totalSales = res.data.data

        res = await getSalesThisWeek({ token })
        let today = moment()
        let day = today.weekday()
        let start = this.dailySalesChart.data.labels.slice(0, day)
        let end = this.dailySalesChart.data.labels.slice(day, 7)
        let weeklabel = end.concat(start)
        this.dailySalesChart.data.labels = weeklabel
        this.dailySalesChart.data.series.push(res.data.data)

        res = await getRegisteredUsersThisWeek({ token })
        this.registerUserChart.data.labels = weeklabel
        this.registerUserChart.data.series.push(res.data.data)

        let resHistory = await getPurchaseHistory({ token })
        let history = []
        resHistory.data.data.map((rHistory, i) => {
          let tmp = rHistory
          tmp.no = i + 1
          tmp.startDate = moment(rHistory.startDate).format('YYYY-MM-DD')
          tmp.endDate = moment(rHistory.endDate).format('YYYY-MM-DD')
          history.push(tmp)
        })
        this.items = history
        this.$store.commit('SHOW_OVER_LAY', false)
      } catch (e) {
        this.$store.commit('SHOW_OVER_LAY', false)
      }
    },

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
  }
</script>

<style lang="sass">
  #coloured-line
    .ct-series-a .ct-line,
    .ct-series-a .ct-point
      stroke: #00cae3 !important

    #multiple-bar
      .ct-series-a .ct-bar
        stroke: #00cae3 !important

      .ct-series-b .ct-bar
        stroke: #f44336 !important

    #pie
      .ct-series-a .ct-slice-pie
        fill: #00cae3 !important

      .ct-series-b .ct-slice-pie
        fill: #f44336 !important
</style>
