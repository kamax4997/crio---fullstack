<template>
  <v-container v-if="!isVerify" id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col
        cols="12"
        md="9"
      >

      <div class="row">
        <div class="col-md-2">
          <span class="mdi mdi-account-outline user-i"></span>
        </div>
        <div class="col-md-10 mt-5">
          <div class=" card-title mt-2" style="font-family: 'montserrat'; font-weight: 700;">
              MODIFICA
              <span class="body-1" style="font-family: 'montserrat'; font-weight: 700;">— COMPLETA IL TUO PROFILO</span>
            </div>
        </div>
      </div>


      
          <br>

        <br />

        <v-form>
          <v-container class="py-0">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="profile.name"
                  class="purple-input"
                  label="NOME"
                  outlined
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="profile.surname"
                  label="COGNOME"
                  class="purple-input"
                  outlined
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="profile.email"
                  :rules="[rules.required, rules.email]"
                  label="EMAIL"
                  class="purple-input"
                  outlined
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="profile.phoneNumber"
                  label="TELEFONO"
                  class="purple-input"
                  outlined
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="profile.address"
                  label="INDIRIZZO"
                  class="purple-input"
                  outlined
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="profile.company"
                  label="AZIENDA"
                  class="purple-input"
                  outlined
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="profile.city"
                  label="CITTÀ"
                  class="purple-input"
                  outlined
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="profile.nation"
                  label="NAZIONE"
                  class="purple-input"
                  outlined
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="profile.cap"
                  class="purple-input"
                  label="CAP"
                  outlined
                />
              </v-col>

              <v-col col="12" md="6">
                <span>Inizio dell'iscrizione</span>
                <p class="date-para">{{ subscriptionDate }}</p>
              </v-col>

              <v-col col="12" md="6">
                <span>Fine dell'abbonamento</span>
                <p class="date-para">{{ expireDate }}</p>
              </v-col>
              <!-- <p>{{ isExpired }}</p> -->
              <v-col cols="12" class="text-right">
                <v-btn
                  color="##007ebd"
                  class="mr-0 cust-blue-btn"
                  @click="onUpdate"
                >
                  AGGIORNA PROFILO
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
  <v-container
    v-else
    id="verify"
    class="fill-height justify-center"
    tag="section"
  >
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          color="success"
          light
          max-width="100%"
          width="400"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                {{ messages.emailVerify }}
              </h1>
              <v-icon large> mdi-lock </v-icon>
            </div>
          </template>

          <v-card-text class="text-center">
            <v-text-field
              v-model="code"
              :rules="[rules.required, rules.codeMin]"
              hint="Must be 5 characters"
              outlined
              color="secondary"
              :label="messages.verifyPlaceHolder"
              class="mt-10"
            />
            <pages-btn color="success" :loading="loading" v-on:click="onVerify">
              {{ messages.verifyBtn }}
            </pages-btn>
            <br />
            <br />
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
import messages from "../../locales/en";
import { canUpdateProfile, updateProfile } from "../../service/auth";
import { getMainPackages } from "../../service/packages";
import moment from "moment";
export default {
  //
  name: "Profile",

  components: {
    PagesBtn: () => import("./component/Btn"),
  },

  data: () => ({
    messages: messages,
    rules: {
      required: (value) => !!value || "Obligatorio!",
      codeMin: (v) => v.length === 5 || "Minimo 6 charatteri !",
      email: (e) => /^\S+@\S+\.\S+$/.test(e) || "Invalid Email!",
      emailMatch: () => "The email and password you entered don't match",
    },
    profile: {
      name: "",
      surname: "",
      email: "",
      phoneNumber: "",
      address: "",
      company: "",
      city: "",
      nation: "",
      cap: "",
    },
    isVerify: false,
    code: "",
    loading: false,
    newToken: "",
    subscriptionDate: "",
    expireDate: "",
    isExpired: false,
  }),

  async mounted() {
    let token = localStorage.getItem("token");
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.profile = currentUser;
    let uID = currentUser._id;
    let res = await getMainPackages({
      token,
      uID,
    });
    let mainPackages = res.data.data.packages;
    let curPackage = res.data.data.curPackage;
    this.subscriptionDate = moment(curPackage.createdAt).format("DD/MM/YYYY");
    this.expireDate = moment(curPackage.endDate).format("DD/MM/YYYY");
    let a = new Date(Date.now());
    a = moment(a).format("MM/DD/YYYY");
    if (a > this.expireDate) {
      this.isExpired = true;
    }
  },

  methods: {
    async onUpdate() {
      try {
        this.loading = true;
        let profile = this.profile;
        profile.token = localStorage.getItem("token");
        let currentUser = await updateProfile({
          profile: profile,
        });
        // console.log(currentUser)
        localStorage.setItem(
          "currentUser",
          JSON.stringify(currentUser.data.data)
        );
        this.$store.commit("SET_CURRENT_USER", currentUser.data.data);
        this.loading = false;
        let snackbarVal = {
          snackbar: true,
          text: messages.success,
          type: "success",
        };
        this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
      } catch (e) {
        console.log(e);
        this.loading = false;
        let snackbarVal = {
          snackbar: true,
          text: messages.failed,
          type: "error",
        };
        this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
      }
    },

  },
};
</script>
<style lang="css">
.cust-blue-btn {
  background: #007ebd !important;
  border-radius: 20px !important;
}
.date-para {
  margin: 0;
  border: 1px solid #b1b1b1;
  padding: 17px 11px;
  border-radius: 3px;
  font-family: "montserrat";
}
</style>