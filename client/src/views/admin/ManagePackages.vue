<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <!-- //example with dialog -->
        <v-dialog
          v-model="vDialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              outlined
              color="primary"
              dark
              @click="clickVCreateBtn"
            >
              {{messages.voucherCode}}
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{updatingVCode ? messages.voucherUpdate : messages.voucherCreate}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="voucherCode"
                      :rules="[rules.required, rules.min]"
                      hint="At least 6 characters!"
                      :label="messages.voucherCode"
                      class="purple-input"
                      outlined
                    />
                    <v-text-field
                      v-model="vPercentage"
                      :rules="[rules.required]"
                      :label="messages.vPercentage"
                      class="purple-input"
                      outlined
                    />
                    <v-textarea
                      v-model="vDescription"
                      :label="messages.vDescription"
                      class="purple-input"
                      outlined
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-select
                      v-if="updatingVCode"
                      v-model="vPackage"
                      :items="packages"
                      item-text="packageName"
                      item-value="_id"
                      :label="messages.selectPackages"
                    />
                    <v-select
                      v-else
                      v-model="vPackages"
                      :items="packages"
                      item-text="packageName"
                      item-value="_id"
                      :label="messages.selectPackages"
                      multiple
                    />
                    <v-text-field
                      v-model="dateRangeText"
                      label="Intervallo data selezionato"
                      prepend-icon="mdi-calendar"
                      hint="YYYY/MM/DD "
                      :show-current="datess"
                    />
                    <v-date-picker
                      v-model="dates"
                      range
                      :selected-items-text="messages.dateSelected"
                      locale="it-it"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="blue darken-1"
                text
                @click="vDialog = false"
              >
                {{messages.cancel}}
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                :loading="loading1"
                @click="createVoucherCode"
              >
                {{messages.ok}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col/>
    </v-row>

    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <base-material-card icon="mdi-plus">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              {{messages.createPackageTitle}}
              <!-- <span class="body-1">—Aggiungere Nuovo</span> -->
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="packageName"
                    :rules="[rules.required, rules.counter]"
                    :label="messages.pNameTitle"
                    counter
                    maxlength="20"
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="numberFridges"
                    :rules="[rules.required]"
                    :label="messages.pNumberFridgeTitle"
                    counter
                    maxlength="20"
                    type="number"
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="period"
                    :rules="[rules.required]"
                    :label="messages.pPeriodTitle"
                    counter
                    maxlength="20"
                    type="number"
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="periodUnit"
                    :items="periodConst"
                    item-text="title"
                    item-value="unit"
                    :label="messages.pPeriodUnit"
                    outlined
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="price"
                    :rules="[rules.required]"
                    :label="messages.pPriceTitle"
                    counter
                    maxlength="20"
                    type="number"
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="onCreate"
                    :loading="loading"
                  >
                    AGGUNGI
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
          :title="messages.allPackageTitle"
          class="px-5 py-3 mb-5"
        >
          <v-simple-table>
            <thead>
            <tr>
              <th>#</th>
              <th>{{messages.pNameTitle}}</th>
              <th>{{messages.pNumberFridgeTitle}}</th>
              <th>{{messages.pPeriodTitle}}</th>
              <th>{{messages.pPriceTitle}}</th>
              <th class="text-right">
                {{messages.actionTitle}}
              </th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(packageItem, index) in packages" :key="index">
              <td><span>{{ index + 1 }}</span></td>
              <td>{{packageItem.packageName}}</td>
              <td>{{packageItem.numberFridges}}</td>
              <td>{{packageItem.period}}</td>
              <td>{{packageItem.price}}</td>
              <td class="text-right">
                <v-tooltip bottom v-for="(action, i) in actions">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      :key="i"
                      class="px-2 ml-1"
                      :color="action.color"
                      min-width="0"
                      small
                      v-bind="attrs"
                      v-on="on"
                      @click="doAction(packageItem._id, action.type, index)"
                    >
                      <v-icon
                        small
                        v-text="action.icon"
                      />
                    </v-btn>
                  </template>
                  <span>{{action.tooltip}}</span>
                </v-tooltip>
              </td>
            </tr>
            </tbody>
          </v-simple-table>
        </base-material-card>

        <base-material-card
          color="success"
          icon="mdi-clipboard-text"
          inline
          :title="messages.allVoucherTitle"
          class="px-5 py-3 mb-5"
        >
          <v-simple-table>
            <thead>
            <tr>
              <th>#</th>
              <th>{{messages.voucherCode}}</th>
              <th>{{messages.vDescription}}</th>
              <th>{{messages.percentage}}</th>
              <th>{{messages.vPackage}}</th>
              <th>{{messages.startDate}}</th>
              <th>{{messages.endDate}}</th>
              <th class="text-right">
                {{messages.actionTitle}}
              </th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(codeItem, index) in voucherCodes" :key="index">
              <td><span>{{ index + 1 }}</span></td>
              <td>{{codeItem.code}}</td>
              <td>{{codeItem.description}}</td>
              <td>{{codeItem.percentage}}</td>
              <td>{{codeItem.packageName}}</td>
              <td>{{codeItem.startDate}}</td>
              <td>{{codeItem.endDate}}</td>
              <td class="text-right">
                <v-tooltip bottom v-for="(action, i) in actions">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      :key="i"
                      class="px-2 ml-1"
                      :color="action.color"
                      min-width="0"
                      small
                      v-bind="attrs"
                      v-on="on"
                      @click="doCodeAction(codeItem, action.type, index)"
                    >
                      <v-icon
                        small
                        v-text="action.icon"
                      />
                    </v-btn>
                  </template>
                  <span>{{action.tooltip}}</span>
                </v-tooltip>
              </td>
            </tr>
            </tbody>
          </v-simple-table>
        </base-material-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      width="600"
    >
      <v-card>
        <v-card-title>
          <div class="font-weight-bold card-title mt-2">
            {{messages.editPackageTitle}}
          </div>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="packageName1"
                    :rules="[rules.required, rules.counter]"
                    :label="messages.pNameTitle"
                    counter
                    maxlength="20"
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="numberFridges1"
                    :rules="[rules.required]"
                    :label="messages.pNumberFridgeTitle"
                    counter
                    maxlength="20"
                    type="number"
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="period1"
                    :rules="[rules.required]"
                    :label="messages.pPeriodTitle"
                    counter
                    maxlength="20"
                    type="number"
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="periodUnit1"
                    :items="periodConst"
                    item-text="title"
                    item-value="unit"
                    :label="messages.pPeriodUnit"
                    outlined
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="price1"
                    :rules="[rules.required]"
                    :label="messages.pPriceTitle"
                    counter
                    maxlength="20"
                    type="number"
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="onUpdate"
                    :loading="loading1"
                  >
                    AGGUNGI
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirmDialog" persistent max-width="290">
      <v-card>
        <v-card-text class="text-md-center text--primary">{{messages.deletePackageConfirm}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="confirmDialog = false">{{messages.no}}</v-btn>
          <v-btn color="green darken-1" text @click="onDelete">{{messages.yes}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmVDialog" persistent max-width="290">
      <v-card>
        <v-card-text class="text-md-center text--primary">{{messages.deleteVConfirm}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="confirmVDialog = false">{{messages.no}}</v-btn>
          <v-btn color="green darken-1" text @click="onVDelete">{{messages.yes}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

</template>

<script>
  import {
    createMainPackage,
    createVoucherCode,
    deleteMainPackage, deleteVoucherCode,
    getAllPackages, getAllVoucherCodes,
    updateMainPackage, updateVoucherCode,
  } from '../../service/packages'
  import messages from '../../locales/en'
  import { periodConst, periodUnitConst } from '../../service/config'
  import moment from 'moment'

  export default {
    //
    name: 'ManagePackages',
    data: () => ({
      messages: messages,
      loading: false,
      loading1: false,
      updateID: '',
      rules: {
        required: value => !!value || 'Obbligatorio.',
        counter: value => value.length <= 15 || 'Massimo 15 caratteri',
        min: v => v.length >= 6 || 'At least 6 characters!',
      },
      actions: [
        /*{
          color: 'warning',
          icon: 'mdi-alert-circle',
          tooltip: 'Status',
        },*/
        {
          color: 'success',
          icon: 'mdi-pencil',
          tooltip: 'Edit',
          type: 'edit',
        },
        {
          color: 'error',
          icon: 'mdi-delete',
          tooltip: 'Delete',
          type: 'delete',
        },
      ],
      overlay: true,
      dialog: false,
      confirmDialog: false,
      //
      periodConst: periodConst,
      packages: [],
      packageName: '',
      numberFridges: 0,
      period: 0,
      periodUnit: {},
      price: '',
      packageName1: '',
      numberFridges1: 0,
      period1: 0,
      periodUnit1: {},
      price1: '',
      deleteID: '',

      voucherCodes: [],
      voucherCode: '',
      vDescription: '',
      vPercentage: 0,
      vPeriod: 0,
      vDialog: false,
      vPackages: [],
      vPackage: {},
      updatingVCode: false,
      updatingVID: '',
      deletingVID: '',

      // dates: [new Date().toISOString().substr(0, 10)],
      dates: [moment().format('YYYY-MM-DD').substr(0, 10)],
      datess: ['yyyy/mm/dd', 'yyyy/mm/dd'],

      confirmVDialog: false,
    }),

    computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
    },

    async mounted () {
      try {
        this.$store.commit('SHOW_OVER_LAY', true)
        let token = localStorage.getItem('token')
        let res = await getAllPackages({
          token,
        })
        this.packages = res.data.data
        res = await getAllVoucherCodes({ token })
        this.voucherCodes = res.data.data
        this.$store.commit('SHOW_OVER_LAY', false)
      } catch (e) {
        this.$store.commit('SHOW_OVER_LAY', false)
      }
    },

    methods: {
      onCreate () {
        this.loading = true
        let token = localStorage.getItem('token')
        let newPackage = {
          period: this.period * periodUnitConst[this.periodUnit],
          periodQty: this.period,
          periodUnit: this.periodUnit,
          packageName: this.packageName,
          numberFridges: this.numberFridges,
          price: this.price,
        }
        // console.log(newPackage)
        createMainPackage({
          token,
          newPackage,
        }).then((res) => {
          this.loading = false
          this.packages = res.data.data
          let snackbarVal = {
            snackbar: true,
            text: messages.createPackage,
            type: 'success',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
        }).catch(e => {
          this.loading = false
          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: 'error',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
        })
      },

      onDelete () {
        this.confirmDialog = false
        let token = localStorage.getItem('token')
        deleteMainPackage({
          token,
          _id: this.deleteID,
        }).then((res) => {
          this.packages = res.data.data
          let snackbarVal = {
            snackbar: true,
            text: messages.success,
            type: 'success',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
        }).catch(e => {
          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: 'error',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
        })
      },

      doAction (_id, i, index) {
        // console.log(_id, i)
        if (i === 'status') {
          // enable status
          return
        } else if (i === 'edit') {
          // edit
          this.dialog = true
          let upackage = this.packages[index]
          this.packageName1 = upackage.packageName
          this.numberFridges1 = upackage.numberFridges
          this.period1 = upackage.periodQty
          this.periodUnit1 = upackage.periodUnit
          this.price1 = upackage.price
          this.updateID = _id
          // console.log(upackage)
        } else if (i === 'delete') {
          //delete
          this.confirmDialog = true
          this.deleteID = _id
        }
      },

      onUpdate () {
        this.loading1 = true
        let token = localStorage.getItem('token')
        let mainPackage = {
          packageName: this.packageName1,
          numberFridges: this.numberFridges1,
          period: this.period1 * periodUnitConst[this.periodUnit1],
          periodQty: this.period1,
          periodUnit: this.periodUnit1,
          price: this.price1,
          _id: this.updateID,
        }
        updateMainPackage({
          token,
          mainPackage,
        }).then((res) => {
          this.loading1 = false
          this.packages = res.data.data
          let snackbarVal = {
            snackbar: true,
            text: messages.updateFridge,
            type: 'success',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
        }).catch(e => {
          this.loading1 = false
          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: 'error',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
          this.dialog = false
        })
      },

      async createVoucherCode () {
        this.loading1 = true
        try {
          let data = {
            code: this.voucherCode,
            pID: this.vPackages,
            description: this.vDescription,
            percentage: this.vPercentage,
            startDate: this.dates[0] > this.dates[1] ? this.dates[1] : this.dates[0],
            endDate: this.dates[0] < this.dates[1] ? this.dates[1] : this.dates[0],
          }
          let token = localStorage.getItem('token')
          let voucherCodes = []
          if (this.updatingVCode) {
            data.pID = this.vPackage
            data._id = this.updatingVID
            // console.log(this.vPackage)
            voucherCodes = await updateVoucherCode({
              token,
              data,
            })
          } else {
            voucherCodes = await createVoucherCode({
              token,
              data,
            })
          }
          this.voucherCodes = voucherCodes.data.data
          this.loading1 = false
          // this.vDialog = false;
          let snackbarVal = {
            snackbar: true,
            text: messages.voucherCodeCreated,
            type: 'success',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
          this.vDialog = false
        } catch (e) {
          this.loading1 = false
          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: 'error',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
        }
      },

      doCodeAction (item, i, index) {
        if (i === 'edit') {
          this.voucherCode = item.code
          this.vPackage = {}
          this.vPackage._id = item.pID
          this.vPackage.packageName = item.packageName
          // console.log(this.vPackage)
          this.vDescription = item.description
          this.vPercentage = item.percentage
          this.dates = [
            new Date(item.startDate).toISOString().substr(0, 10),
            new Date(item.endDate).toISOString().substr(0, 10),
          ]
          this.updatingVID = item._id
          this.vDialog = true
          this.updatingVCode = true
        } else if (i === 'delete') {
          this.deletingVID = item._id
          this.confirmVDialog = true
        }
      },

      async onVDelete () {
        try {
          let token = localStorage.getItem('token')
          let _id = this.deletingVID
          let voucherCodes = await deleteVoucherCode({
            token,
            _id,
          })
          this.voucherCodes = voucherCodes.data.data
          let snackbarVal = {
            snackbar: true,
            text: messages.success,
            type: 'success',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
          this.confirmVDialog = false
        } catch (e) {
          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: 'error',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
        }
      },

      clickVCreateBtn () {
        this.voucherCode = ''
        this.vPackages = []
        this.vDescription = ''
        this.vPercentage = 0
        // this.dates = [new Date().toISOString().substr(0, 10)]
        this.dates = [moment().format('YYYY-MM-DD').substr(0, 10)]
        this.vDialog = true
        this.updatingVCode = false
      },
    },
  }
</script>
