<template>
  <v-container id="user-profile" fluid tag="section">
     <v-dialog v-model="expiredModal" persistent max-width="370">

      <v-card>
        <v-card-title class="headline">Opss...  </v-card-title>
        <v-card-text
          >Il vostro free test è scaduto. Clicca su Attiva Nuovo per acquistare il pacchetto desiderato.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="clickOk()"> Attiva Nuovo </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



    <v-row justify="center">
      <v-col cols="12" md="4">
        <div class="shadow-box">
           <base-material-card icon="mdi mdi-snowflake-variant" color="#007ebc">
          <template v-slot:after-heading>
            <div class=" card-title mt-2">
              CREA NUOVO FRIGO
              <!-- <span class="body-1">—Aggiungere Nuovo</span> -->
            </div>
          </template>

          <v-form v-model="valid" ref="form" lazy-validation>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="title"
                    :rules="[rules.required, rules.counter]"
                    required
                    label="Nome"
                    counter
                    maxlength="20"
                    outlined
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="fridgetype"
                    :menu-props="{ top: true, offsetY: true }"
                    :items="fridgetypes"
                    :rules="[rules.singleSelRequired]"
                    item-text="title"
                    item-value="_id"
                    label="Tipo di frigorifero"
                    outlined
                    required
                    text="#007ebc"
                    color="#007ebc"
                  />
                </v-col>
                <v-col cols="12" sm="12">
                  <v-select
                    v-model="maintenanceDay"
                    :items="weekdaysConst"
                    :menu-props="{ top: true, offsetY: true }"
                    :rules="[rules.multiSelRequired]"
                    item-text="title"
                    item-value="index"
                    :label="messages.selectWeekdays"
                    outlined
                    multiple
                    required
                    color="#007ebc"
                    text="#007ebc"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="note"
                    class="purple-input"
                    rows="3"
                    label="Nota/Responsabile"
                    placeholder="Note su questo frigorifero.."
                    outlined
                    :rules="[rules.required, rules.counter]"
                    counter
                    maxlength="40"
                  />
                </v-col>
                <v-col cols="12" class="text-right">
                  <v-btn
                    color="#007ebc"
                    class="mr-0 radius"
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
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <div class="shadow-box">
        <base-material-card
          color="#007ebc"
          icon="mdi-text-box-multiple-outline"
          inline
          title="Tutti i frigoriferi"
          class="px-5 py-3 mb-5 bold"
        >
          <v-simple-table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Note+Responsibli</th>
                <th>Stato attuale</th>
                <th>Tipo di Frigrorifero</th>
                <th class="text-right">Azioni</th>
                <th class="text-right">
                  {{ messages.activationTitle }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-if="fridges.length > 0"
                v-for="(fridge, index) in fridges"
                :key="index"
              >
                <td>
                  <span>{{ index + 1 }}</span>
                </td>
                <td>{{ fridge.name }}</td>
                <td>{{ fridge.note }}</td>
                <td>{{ fridgeStatus[fridge.status] }}</td>
                <td>{{ fridge.typeTitle }}</td>
                <!--              <td>{{getTypeTitle(fridge.type)}}</td>-->
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
                        :disabled="!fridge.active"
                        @click="doAction(fridge._id, action.type, index)"
                      >
                        <v-icon small v-text="action.icon" />
                      </v-btn>
                    </template>
                    <span>{{ action.tooltip }}</span>
                  </v-tooltip>
                </td>
                <td >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-switch
                        v-model="fridge.active"
                        value
                        v-on="on"
                        :input-value="fridge.active"
                        @change="changeActivate(fridge, index)"
                      />
                    </template>
                    <span>{{ messages.activationTitle }}</span>
                  </v-tooltip>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </base-material-card>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="350px">
      <v-card>
        <v-card-title>
          <div class="font-weight-bold card-title mt-2"> Modifica frigo</div>
        </v-card-title>
        <v-card-text>
          <v-form v-model="evalid" ref="form">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="title1"
                    :rules="[rules.required, rules.counter]"
                    required
                    label="Nome"
                    counter
                    maxlength="20"
                    outlined
                  />
                </v-col>
                <v-col cols="12" sm="12">
                  <v-selectn
                    v-model="fridgetype1"
                    :items="fridgetypes"
                    :rules="[rules.singleSelRequired]"
                    item-text="title"
                    item-value="_id"
                    label="Tipo di frigorifero"
                    outlined
                  />
                </v-col>
                <v-col cols="12" sm="12">
                  <v-select
                    v-model="maintenanceDay1"
                    :items="weekdaysConst"
                    :rules="[rules.multiSelRequired]"
                    item-text="title"
                    item-value="index"
                    :label="messages.selectWeekdays"
                    outlined
                    multiple
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="note1"
                    class="purple-input"
                    rows="3"
                    label="Nota"
                    placeholder="Note su questo frigorifero.."
                    outlined

                    :rules="[rules.required, rules.counter]"
                    counter
                    maxlength="40"
                  />
                </v-col>
                <v-col cols="12" class="text-right">
                  <v-btn
                    color="#007ebc"
                    class="mr-0 radius"
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
        <v-card-text class="text-md-center text--primary">{{
          messages.deleteFridgeConfirm
        }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="confirmDialog = false">{{
            messages.no
          }}</v-btn>
          <v-btn color="green darken-1" text @click="onDelete">{{
            messages.yes
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {
  createFridge,
  deleteFridge,
  getAllFridges,
  getFridgeTypes,
  updateFridge,
  updateFridgeActivaion,
} from "../../service/fridge";
import messages from "../../locales/en";
import { fridgeStatus, weekdaysConst } from "../../service/config";
import { mdiBattlenet } from "@mdi/js";
import { mdiTextBoxMultipleOutline } from "@mdi/js";
import { mapState } from "vuex";
import { mdiSnowflakeVariant } from '@mdi/js';
import { getMainPackages } from "../../service/packages";
import moment from "moment";
export default {
  //
  name: "ManageFridges",
  data: () => ({
    // fridgetypes: ['TN 0/+2', 'TN +2/+4', 'TN +4/+8', 'BT -10/-12', 'BT -18/-20'],
    // fridgetypes: [],
            isExpired: false,
            expiredModal: false,
            subscriptionDate: "",
            expireDate: "",

    fridgetype: {},
    fridgetype1: {},
    title: "",
    title1: "",
    maintenanceDay: [],
    maintenanceDay1: [],
    note: "",
    note1: "",
    loading: false,
    loading1: false,
    updateID: "",
    weekdays: [],
    weekdaysConst: weekdaysConst,
    evalid: false,
    valid: false,
    rules: {
      required: (value) => !!value || "Obbligatorio.",
      counter: (value) => value.length <= 40 || "Massimo 35 caratteri",
      singleSelRequired: (v) => typeof v !== "object" || "Obbligatorio.",
      multiSelRequired: (v) => v.length > 0 || "Obbligatorio.",
    },
    actions: [
      /*{
          color: 'warning',
          icon: 'mdi-alert-circle',
          tooltip: 'Status',
        },*/
      {
        color: "#007ebc",
        icon: "mdi-pencil",
        tooltip: "Edit",
        type: "edit",
      },
      {
        color: "007ebc",
        icon: "mdi-delete",
        tooltip: "Delete",
        type: "delete",
      },
    ],
    // fridges: [],
    overlay: true,
    fridgeStatus: fridgeStatus,
    dialog: false,
    confirmDialog: false,
    messages: messages,
    deleteID: "",
  }),

  computed: {
    ...mapState(["allGlobalFridges", "allFridgeTypes"]),
    fridges() {
      return this.$store.state.allGlobalFridges || [{}];
    },
    fridgetypes() {
      return this.$store.state.allFridgeTypes || [{ title: "" }];
    },
  },

  async mounted() {
    this.$store.commit("SHOW_OVER_LAY", true);
    try {
      let token = localStorage.getItem("token");
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let uID = currentUser._id;
      let res = await getAllFridges({
        token,
        uID,
      });
      this.$store.commit("SET_ALL_FRIDGES", res.data.data);
      // this.fridges = this.$store.state.allGlobalFridges;
      // this.fridges = res.data.data
      res = await getFridgeTypes({ token });
      this.$store.commit("SET_FRIDGE_TYPES", res.data.data);
      // this.fridgetypes = res.data.data
      this.$store.commit("SHOW_OVER_LAY", false);
    } catch (e) {
      this.$store.commit("SHOW_OVER_LAY", false);
    }
     //  this is where checking of the package is done
    let token = localStorage.getItem("token");
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let uID = currentUser._id;
    let res1 = await getMainPackages({
      token,
      uID,
    });
    let mainPackages = res1.data.data.packages;
     let curPackage = res1.data.data.curPackage;
     // console.log(res);

    this.subscriptionDate = moment(curPackage.createdAt).format("YYYY/MM/DD");
    this.expireDate = moment(curPackage.endDate).format("YYYY/MM/DD");

    let a = new Date(Date.now());
    a = moment(a).format("YYYY/MM/DD");
    // console.log('today: ' +a );
    // console.log("package ends at :"+ this.expireDate);


    if (a >= this.expireDate) {
     this.isExpired = true;
     //this.expiredModal  = true;
    }
    //console.log(this.isExpired)
     this.expiredModal = this.isExpired;

  },

  methods: {
      clickOk() {
     // this.expiredModal = true;
      this.$router.push("purchase");
    },
    onCreate() {
      this.$refs.form.validate();
      if (!this.$refs.form.validate()) return false;
      this.loading = true;
      let token = localStorage.getItem("token");
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let uID = currentUser._id;
      let data = {
        name: this.title,
        type: this.fridgetype,
        maintenanceDay: this.maintenanceDay,
        note: this.note,
        uID: uID,
      };
      createFridge({
        token,
        data,
      })
        .then((res) => {
          this.loading = false;
          if (res.data.statusCode === 201) {
            let snackbarVal = {
              snackbar: true,
              text: messages.overflowFridge,
              type: "error",
            };
            this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
          } else {
            this.title = "";
            this.fridgetype = {};
            this.maintenanceDay = [];
            this.note = "";
            this.$refs.form.resetValidation();
            this.$store.commit("SET_ALL_FRIDGES", res.data.data);
            // this.fridges = res.data.data
            let snackbarVal = {
              snackbar: true,
              text: messages.createFridge,
              type: "success",
            };
            this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
          }
        })
        .catch((e) => {
          this.loading = false;
          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: "error",
          };
          this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
        });
    },

    onDelete() {
      this.confirmDialog = false;
      let token = localStorage.getItem("token");
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let uID = currentUser._id;
      deleteFridge({
        token,
        _id: this.deleteID,
        uID,
      })
        .then((res) => {
          this.$store.commit("SET_ALL_FRIDGES", res.data.data);
          // this.fridges = res.data.data
          let snackbarVal = {
            snackbar: true,
            text: messages.success,
            type: "success",
          };
          this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
        })
        .catch((e) => {
          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: "error",
          };
          this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
        });
    },

    async changeActivate(fridge, index) {
      let token = localStorage.getItem("token");
      let data = {
        _id: fridge._id,
        active: fridge.active,
      };
      try{
        await updateFridgeActivaion({
          token,
          data,
        });
      }catch (e) {
        fridge.active = false;
        let snackbarVal = {
          snackbar: true,
          text: messages.activateFridgeError,
          type: 'error',
        };
        this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
      }

    },

    doAction(_id, i, index) {
      // console.log(_id, i);
      if (i === "status") {
        // enable status

      } else if (i === "edit") {
        // edit
        this.dialog = true;
        let fridge = this.fridges[index];
        this.title1 = fridge.name;
        this.note1 = fridge.note;
        this.maintenanceDay1 = fridge.maintenanceDay;
        this.fridgetype1 = fridge.type;
        this.updateID = _id;
      } else if (i === "delete") {
        //delete
        this.deleteID = _id;
        this.confirmDialog = true;
        /*let token = localStorage.getItem('token')
          let currentUser = JSON.parse(localStorage.getItem('currentUser'))
          let uID = currentUser._id
          deleteFridge({
            token,
            _id,
            uID,
          }).then((res) => {
            this.fridges = res.data.data
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
          })*/
      }
    },

    onUpdate() {
      this.$refs.form.validate();
      if (!this.$refs.form.validate()) return false;
      this.loading1 = true;
      let token = localStorage.getItem("token");
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let uID = currentUser._id;
      let data = {
        name: this.title1,
        type: this.fridgetype1,
        maintenanceDay: this.maintenanceDay1,
        note: this.note1,
        _id: this.updateID,
        uID: uID,
      };
      // console.log(data);
      updateFridge({
        token,
        data,
      })
        .then((res) => {
          this.loading1 = false;
          this.$store.commit("SET_ALL_FRIDGES", res.data.data);
          // this.fridges = res.data.data
          let snackbarVal = {
            snackbar: true,
            text: messages.updateFridge,
            type: "success",
          };
          this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
          this.dialog = false;
        })
        .catch((e) => {
          this.loading1 = false;
          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: "error",
          };
          this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
        });
    },

    // Get fridge type by id
    getTypeTitle(id) {
      // console.log(id, this.fridgetypes);
      if (this.fridgetypes.length > 1)
        return this.fridgetypes.filter((item) => item._id === id)[0].title;
      else return null;
    },
  },
};
</script>
<style lang="css">
@font-face {
  font-family: "montserrat";
  src: url("../../assets/font/Montserrat/Montserrat-Regular.ttf")
    format("truetype");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "montserrat";
  src: url("../../assets/font/Montserrat/Montserrat-Bold.ttf")
    format("truetype");
  font-weight: 700;
  font-style: normal;
}
#cus-arrow {
  color: #007ebc !important;
}
.v-select .v-select__selections {
  font-family: "montserrat" !important;
  font-weight: 600 !important;
}
/* .v-sheet {
  border-radius: 50% !important;
} */
.v-application .pa-7 {
    padding: 28px !important;
    border-radius: 50% !important;
}
.ml-6{
  margin-left: 0 !important;
  width: 63% !important;
}
.card-title{
   font-family: "montserrat" !important;
  font-weight: 600 !important;
}
.v-application .font-weight-light {
    /* font-weight: 600 !important; */
   font-family: "montserrat" !important;

}
.shadow-box{
      border: 1px solid transparent;
    box-shadow: 2px 1px 6px 2px #0000002b;
    border-radius: 4px;
}
td{
     font-weight: 600 !important;
   font-family: "montserrat" !important;
}
/* .mdi-menu-down{
  color: blue !important;
} */


.bold{
  font-weight: 700 !important;
}
.ml-4 .card-title{
  font-weight: 700 !important;
}
.v-input__control .mdi-menu-down{
  color: #007ebc !important;
}
</style>
