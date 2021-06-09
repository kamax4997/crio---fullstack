<template>
  <v-container id="dashboard" fluid tag="section">
    <!-- {{ isExpired }} -->

    <v-dialog v-model="expiredModal" persistent max-width="370">

      <v-card>
        <v-card-title class="headline">Opss...</v-card-title>
        <v-card-text
        >Il vostro free test è scaduto. Clicca su Attiva Nuovo per acquistare il pacchetto desiderato.
        </v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="clickOk()"> Attiva Nuovo</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col cols="12" sm="6">
        <!-- //example with dialog -->
        <v-dialog
          v-model="dialog"
          max-width="450px"
          max-height="450px"
          v-if="!loading"
          class="bg-white"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="fridges.length > 0"
              outlined
              class="cust-btn"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Gestione Multipla
            </v-btn>
            <v-btn
              v-if="fridges.length == 0"
              outlined
              class="cust-btn"
              dark
              @click="goToManage()"
            >
              {{disabledFridges > 0 ? "Vai ad abilitare o creare frigoriferi!" : "Crea il tuo primo frigo!" }}
            </v-btn>
          </template>
          <v-card class="bg-white">
            <v-card-title>
              <span class="headline">Gestione Multipla!</span>
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="datesText"
                        label="Intervallo data selezionato"
                        prepend-icon="mdi-calendar"
                        hint="DD/MM/YYYY"
                        :show-current="datess"
                      />
                      <v-date-picker
                        class="d-lg-none d-xl-none d-md-none d-sm-block"
                        v-model="picker"
                        multiple
                        :selected-items-text="messages.dateSelected"
                        locale="it-it"
                        :min="minDate"
                        :allowed-dates="disablePastDates"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="fridge"
                        :items="fridges"
                        item-text="name"
                        item-value="_id"
                        :label="messages.selectFridges"
                        :rules="[rules.multiSelRequired]"
                        :menu-props="{ top: true, offsetY: true }"
                        multiple
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="status"
                        :items="statusData"
                        item-text="title"
                        item-value="index"
                        :label="messages.selectStatus"
                        :menu-props="{ top: true, offsetY: true }"
                      />
                    </v-col>
                    <v-col cols="12" class="d-none d-sm-none d-md-block">
                      <v-date-picker
                        v-model="picker"
                        multiple
                        :selected-items-text="messages.dateSelected"
                        locale="it-it"
                        :min="minDate"
                        :allowed-dates="disablePastDates"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Cancella
              </v-btn>
              <v-btn color="blue darken-1" text @click="onUpdate"> Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col/>
    </v-row>

    <v-row>
      <v-col v-for="(data, i) in fridges" :key="i" cols="12" sm="6" lg="3">
        <v-hover v-slot:default="{ hover }">
          <base-material-stats-card
            :class="hover && 'v-hover-cursor'"
            :color="statusColors[data.status]"
            :light="hover"
            :elevation="hover ? 16 : 2"
            :icon="statusIcons[data.status]"
            :title="data.name"
            :value="fridgeStatus[data.status]"
            sub-icon="mdi-calendar"
            :sub-text="formatDate(data.createdAt)"
            @click="clickCard(data)"
            style="
              box-shadow: 1px 0px 7px 2px #0000002e !important;
              border-radius: 12px;
            "
          />
        </v-hover>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog2"
      max-width="350px"
      max-height="350px"
      class="bg-white"
    >
      <v-card class="bg-white">
        <v-card-title>
          <span class="headline">Modifica questo frigo!</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid2" ref="form" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="datesText"
                    label="Intervallo data selezionato"
                    prepend-icon="mdi-calendar"
                    hint="DD/MM/YYYY"
                    :show-current="datess"
                  />
                  <v-date-picker
                    class="d-lg-none d-xl-none d-md-none d-sm-block"
                    v-model="picker"
                    :min="minDate"
                    :allowed-dates="disablePastDates"
                    multiple
                    :selected-items-text="messages.dateSelected"
                    locale="it-it"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="status"
                    :items="statusData"
                    item-text="title"
                    item-value="index"
                    :label="messages.selectStatus"
                    :menu-props="{ top: true, offsetY: true }"
                  />
                </v-col>
                <v-col class="d-none d-sm-none d-md-block" cols="12">
                  <v-date-picker
                    v-model="picker"
                    multiple
                    :selected-items-text="messages.dateSelected"
                    locale="it-it"
                    :min="minDate"
                    :allowed-dates="disablePastDates"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="blue darken-1" text @click="dialog2 = false">
            Cancella
          </v-btn>
          <v-btn color="blue darken-1" text @click="onUpdateOne"> Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import {
    getAllFridges,
    getFridgeTypes,
    updateFridge,
    updateHistory,
  } from "../../service/fridge";
  import {
    statusColors,
    statusIcons,
    fridgeStatus,
    fridgeStatusData,
  } from "../../service/config";
  import {mdiSnowflakeVariant} from "@mdi/js";
  import {getMainPackages} from "../../service/packages";

  import messages from "../../locales/en";
  import {mapState} from "vuex";
  import moment from "moment";

  export default {
    name: "DashboardDashboard",

    data() {
      return {
        minDate: "2020-10-01",
        rules: {
          multiSelRequired: (v) => v.length > 0 || "Obbligatorio.",
        },
        valid: false,
        valid2: false,
        messages: messages,
        fridge: [],
        status: 0,
        // picker: [new Date().toISOString().substr(0, 10)],
        picker: [moment().format("YYYY-MM-DD").substr(0, 10)],
        datess: ["yyyy/mm/dd", "yyyy/mm/dd"],
        dialog: false, //change status for all
        dialog2: false, //edit dialog for each one
        // fridges: [],
        fridgesModel: [],
        statusColors: statusColors,
        statusIcons: statusIcons,
        fridgeStatus: fridgeStatus,
        statusData: fridgeStatusData,
        curFridge: {},
        subscriptionDate: "",
        expireDate: "",
        isExpired: false,
        expiredModal: false,
        disabledFridges: 0,
        loading: false,
      };
    },

    watch: {
      dialog(v) {
        if (!v) {
          this.picker = [moment().format("YYYY-MM-DD").substr(0, 10)];
          this.fridge = [];
          this.status = 0;
        }
      },
      dialog2(v) {
        if (!v) {
          this.picker = [moment().format("YYYY-MM-DD").substr(0, 10)];
          this.fridge = [];
          this.status = 0;
        }
      },
    },

    computed: {

      ...mapState(["allGlobalFridges"]),
      fridges() {
        return this.$store.state.allGlobalFridges.filter((item) => item.active);
      },
      totalSales() {
        return this.sales.reduce((acc, val) => acc + val.salesInM, 0);
      },


      datesText() {
        let tmp = [];
        this.picker.forEach((pItem) => {
          tmp.push(moment(pItem).format("DD/MM/YYYY"));
        });
        return tmp.join(" , ");
      },
    },

    async mounted() {
      this.loading = true;
      try{
        this.$store.commit("SHOW_OVER_LAY", true);
        let token = localStorage.getItem("token");
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));

        let uID = currentUser._id;
        let res = await getMainPackages({
          token,
          uID,
        });
        let mainPackages = res.data.data.packages;
        let curPackage = res.data.data.curPackage;

        if (curPackage) {
          this.subscriptionDate = moment(curPackage.createdAt).format("YYYY/MM/DD");
          this.expireDate = moment(curPackage.endDate).format("YYYY/MM/DD");
        }

        let a = new Date(Date.now());
        a = moment(a).format("YYYY/MM/DD");


        if (a >= this.expireDate) {
          this.isExpired = true;

        }
        //console.log(this.isExpired)
        this.expiredModal = this.isExpired;

        await getFridgeTypes({token});
        let allFridges = await getAllFridges({
          token,
          uID,
        });
        this.$store.commit("SET_ALL_FRIDGES", allFridges.data.data);
        this.disabledFridges = 0;
        allFridges.data.data.map(item => {
          if (item.active) {
            this.fridgesModel.push(item._id);
          } else {
            this.disabledFridges++;
          }
        });
        this.$store.commit("SHOW_OVER_LAY", false);
        this.loading = false;
      }catch (e) {
        this.loading = false;
      }

      /*getFridgeTypes({token})
        .then((res) => {
          // this.fridgetypes = res.data.data
          getAllFridges({
            token,
            uID,
          })
            .then((res) => {
              this.$store.commit("SET_ALL_FRIDGES", res.data.data);
              // this.fridges = res.data.data.filter(item => item.active)
              // this.fridges = this.$store.state.allGlobalFridges.filter(item => item.active);

              /!*this.fridges
                // .filter((item) => item.active === true)
                .map((item) => {
                  this.fridgesModel.push(item._id);
                });*!/
              this.disabledFridges = 0;
              // this.$store.state.allGlobalFridges.map(item => {
                res.data.data.map(item => {
                if(item.active){
                  this.fridgesModel.push(item._id);
                }else {
                  this.disabledFridges ++;
                }
              })
              this.$store.commit("SHOW_OVER_LAY", false);
            })
            .catch((e) => {
              this.$store.commit("SHOW_OVER_LAY", false);
            });
        })
        .catch((e) => {
          this.$store.commit("SHOW_OVER_LAY", false);
        });*/
    },

    methods: {
      disablePastDates(val) {

        return val <= new Date().toISOString().substr(0, 10)

      },
      clickOk() {
        this.expiredModal = true;
        this.$router.push("dashboard/purchase");
      },
      clickCancel() {
        this.expiredModal = true;
        this.$router.push("dashboard");
      },
      goToManage() {
        this.$router.push("dashboard/manage");
      },
      formatDate(date) {
        return moment(date).format("DD/MM/YYYY");
      },
      complete(index) {
        this.list[index] = !this.list[index];
      },

      updateFridgeStatus() {
        let token = localStorage.getItem("token");
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let uID = currentUser._id;
        let data = {
          dates: this.picker,
          fridges: this.fridge,
          status: this.status,
          uID: uID,
        };
        // console.log(this.picker, this.fridge, this.status)
        updateHistory({
          token,
          data,
        })
          .then((res) => {
            getAllFridges({
              token,
              uID,
            })
              .then((res) => {
                this.$store.commit("SET_ALL_FRIDGES", res.data.data);
                // this.fridges = res.data.data.filter(item => item.active)
                this.fridges.map((item) => {
                  this.fridgesModel.push(item._id);
                });
                // this.dialog = false
                this.$store.commit("SHOW_OVER_LAY", false);
                let snackbarVal = {
                  snackbar: true,
                  text: messages.success,
                  type: "success",
                };
                this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
              })
              .catch(() => {
                this.$store.commit("SHOW_OVER_LAY", false);
              });
          })
          .catch((e) => {
            console.log(e);
            this.$store.commit("SHOW_OVER_LAY", false);
          });
      },

      onUpdate() {
        this.$refs.form.validate();
        if (!this.$refs.form.validate()) {
          return false;
        }
        this.dialog = false;
        this.$store.commit("SHOW_OVER_LAY", true);
        this.updateFridgeStatus();
      },

      clickCard(fridge) {
        this.curFridge = fridge;
        this.dialog2 = true;
      },

      onUpdateOne() {
        this.fridge = [this.curFridge._id];
        this.dialog2 = false;
        this.$store.commit("SHOW_OVER_LAY", true);
        this.updateFridgeStatus();
      },
    },
  };
</script>
<style lang="css">
  .v-application .pa-7 {
    border-radius: 50%;

  }
</style>
