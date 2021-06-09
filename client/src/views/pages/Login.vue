<template>
  <v-container id="login" class="fill-height justify-center" tag="section">
    <v-row justify="center">
      <div class="col-md-4">
        <v-col class="d-none d-sm-none d-md-block" cols="12">
          <!-- <pages-heading class="display-3 text-white">
                  Semplifica con
                </pages-heading> -->
          <img
            :src="require(`@/assets/SemplificaconCRIOON_White.png`)"
            alt="logo"
            class="reg-logo"
          />

          <v-row no-gutters>
            <v-col v-for="(section, i) in sections" :key="i" cols="12">
              <v-list-item three-line>
                <v-list-item-icon class="mr-4 mt-5 mt-md-4">
                  <v-icon
                    :large="$vuetify.breakpoint.mdAndUp"
                    :color="section.iconColor"
                    v-text="section.icon"
                    class="text-white"
                    style="margin-top: 10px !important"
                  />
                </v-list-item-icon>

                <v-list-item-content style="padding-bottom: 0">
                  <v-list-item-title
                    class="cont-title mt-3 text-white ff-mon"
                    v-text="section.title"
                  />

                  <v-list-item-subtitle
                    v-text="section.text"
                    class="text-white mb-0"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-col>
      </div>
      <div class="col-md-8">
         <img
            :src="require(`@/assets/SemplificaconCRIOON_White.png`)"
            alt="logo"
            class="login-top-logo"
          />
        <div class="login-box">
          <v-slide-y-transition appear>
            <!-- <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                Login
              </h1>
           

              <v-icon large>
                mdi-power
              </v-icon>
            </div>
          </template> -->

            <v-card-text class="text-center">
              <!-- <div class="text-center grey--text body-1 font-weight-light">
              Or Be Classical
            </div> -->

              <!-- <v-text-field
              color="secondary"
              label="First Name..."
              prepend-icon="mdi-face"
              class="mt-10"
            /> -->

              <v-text-field
                v-model="email"
                :rules="[rules.required, rules.email]"
                color="#000000"
                label="Email..."
              />
                <!-- prepend-icon="mdi-email" -->

              <v-text-field
                v-model="password"
                :rules="[rules.required, rules.min]"
                hint="Minimo 6 caratteri!"
                class=""
                type="password"
                color="#000000"
                label="Password..."
                border="#000000"
                @keypress.enter="onLogin"
              />
                <!-- prepend-icon="mdi-lock-outline" -->

              <div class="row">
                <div class="col-md-6">
                  <!-- <router-link class="router-link" to="/register"
                ><span class="text-no-wrap success--text"
                  >Registrati
                </span></router-link
              > -->
                  <router-link class="router-link" to="/forgot"
                    ><span
                      class="text-no-wrap success--text ff-mon"
                      style="font-weight: 400"
                      >Hai dimenticato la password?</span
                    ></router-link
                  >
                </div>

                <div class="col-md-6 text-right">
                  <pages-btn
                    color="success"
                    :loading="loading"
                    v-on:click="onLogin"
                  >
                    Accedi
                  </pages-btn>
                </div>
              </div>
      

            </v-card-text>
          </v-slide-y-transition>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { router } from "../../router";
import { loginApi, authenticationService } from "../../service/auth";
import messages from "../../locales/en";

export default {
  name: "PagesLogin",

  components: {
    PagesBtn: () => import("./components/Btn"),
    CustomSnackbar: () => import("../../components/base/CustomSnackbar"),
  },

  data: () => ({
    socials: [
      {
        href: "#",
        icon: "mdi-facebook-box",
      },
      {
        href: "#",
        icon: "mdi-twitter",
      },
      {
        href: "#",
        icon: "mdi-github-box",
      },
    ],
    sections: [
      {
        icon: "mdi-bell-ring",
        iconColor: "green",
        title: "Avviso!",
        text:
          "Notifica personalizzabile per registrare la temperatura delle tue celle.",
      },
      {
        icon: "mdi-file-document-multiple-outline",
        iconColor: "secondary",
        title: "Reports Personalizzabili   ",
        text:
          "Scarica in tempo reale i tuoi reports in formato csv, pdf o excel.",
        iconColor: "#fff",
      },
      {
        icon: "mdi-lock",
        iconColor: "#4286f4",
        title: "Massima sicurezza !",
        text: " I vostri dati sono protetti e al sicuro nei migliori provider.",
      },
      // {
      //   icon: 'mdi-snowflake-alert',
      //   iconColor: 'cyan',
      //   title: 'Prova gratis!',
      //   text: 'Semplice, affidabile, utile. Provaci!',
      // },
    ],
    password: "",
    email: "",
    loading: false,
    rules: {
      required: (value) => !!value || "Required!",
      min: (v) => v.length >= 6 || "Minimo 6 caratteri!",
      email: (e) => /^\S+@\S+\.\S+$/.test(e) || "Invalid Email!",
      emailMatch: () => "The email and password you entered don't match",
    },
    messages: messages,
  }),

  methods: {
    onLogin() {
      this.loading = true;
      loginApi({
        email: this.email,
        password: this.password,
      })
        .then((res) => {
          this.loading = false;
          if (res.status === 201) {
            let snackbarVal = {
              snackbar: true,
              text: messages.disableAlert,
              type: "error",
            };
            this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
            return;
          }
          let data = res.data.data;
          localStorage.setItem("token", data.token);
          let currentUser = JSON.parse(localStorage.getItem("currentUser"));
          this.$store.commit("SET_CURRENT_USER", currentUser);
          if (authenticationService.getCurrentUser.role === "admin") {
            router.push("/admin");
          } else {
            router.push("/dashboard");
          }
        })
        .catch((e) => {
          // console.log(e);
          this.loading = false;
          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: "error",
          };
          this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
        });
    },
  },
};
</script>

<style>
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
.ff-mon {
  font-family: "montserrat" !important;
  /* font-weight: 700 !important; */
}
.router-link {
  text-decoration: none;
}
.mdi-email {
  color: black !important;
}
.mdi-lock-outline {
  color: black !important;
}
input {
  color: black !important;
}
input::placeholder {
  color: black !important;
  font-family: "montserrat" !important;
}
.cont-title {
  font-size: 24px !important;
  font-weight: 700 !important;
}
.v-input input {
  border-bottom: 1px solid black !important;
}
.v-label{
  color: black !important;
  font-family: "montserrat";
}
</style>
