<template>
  <v-container id="login" class="fill-height justify-center margin" tag="section">
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          color="success"
          light
          max-width="100%"
          width="400"
          class="px-5 py-3"
          style="border-radius:0px !important;"
        >
          <template v-slot:heading>
            <div class="text-center">
              <div class="row">
                <div class="col-md-1 col-sm-2 col-2">
                  <v-icon large> mdi-lock </v-icon>
                </div>
                <div class="col-md-11 col-sm-10 col-10">
                  <h1 class="display-2 font-weight-bold mb-2">
                    {{ message.forgot }}
                  </h1>
                </div>
              </div>
            </div>
          </template>

          <v-card-text v-if="!success" class="text-center">
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              outlined
              color="secondary"
              :label="message.email"
              class="mt-10"
            />
            <div class="col-md-12 text-right">
              <pages-btn color="success" :loading="loading" v-on:click="onSend">
                {{ message.send }}
              </pages-btn>
            </div>
          </v-card-text>

          <v-card-text v-else class="text-center">
            <div class="text-center grey--text body-1 font-weight-bold">
              {{ message.forgotSuccess }}
            </div>
            <br />
            <!--<router-link class="router-link" to="/login">
              <span class="text-no-wrap success&#45;&#45;text">{{ message.login }}</span>
            </router-link>-->
          </v-card-text>

        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>

  <!--<v-container v-else id="login" class="fill-height justify-center margin" tag="section">
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          color="success"
          light
          max-width="100%"
          width="400"
          class="px-5 py-3"
          style="border-radius:0px !important;"
        >
          <template v-slot:heading>
            <div class="text-center">
              <div class="row">
                <div class="col-md-1 col-sm-2 col-2">
                  <v-icon large> mdi-lock </v-icon>
                </div>
                <div class="col-md-11 col-sm-10 col-10">
                  <h1 class="display-2 font-weight-bold mb-2">
                    {{ message.resetPassword }}
                  </h1>
                </div>
              </div>
            </div>
          </template>

          <v-card-text v-if="!!success" class="text-center">
            <v-text-field
              v-model="password"
              :rules="[rules.required, rules.min]"
              hint="Minimo 6 caratteri!"
              class=""
              outlined
              type="password"
              color="#000000"
              label="Password..."
              border="#000000"
            />
            <v-text-field
              v-model="repassword"
              :rules="[rules.required, rules.min]"
              hint="Minimo 6 caratteri!"
              class=""
              outlined
              type="password"
              color="#000000"
              label="Confirm Password..."
              border="#000000"
              @keypress.enter="resetPassword"
            />
            <div class="col-md-12 text-right">
              <pages-btn color="success" :loading="loading" v-on:click="onSend">
                {{ message.reset }}
              </pages-btn>
            </div>
          </v-card-text>

          <v-card-text v-else class="text-center">
            <div class="text-center grey&#45;&#45;text body-1 font-weight-bold">
              {{ message.forgotSuccess }}
            </div>
            <br />
            <router-link class="router-link" to="/login">
              <span class="text-no-wrap success&#45;&#45;text">{{ message.login }}</span>
            </router-link>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>-->
</template>

<script>
import { router } from "../../router";
import { forgotPassword, loginApi } from "../../service/auth";
import message from "../../locales/en.json";
import messages from "../../locales/en";

export default {
  name: "PagesForgot",

  components: {
    PagesBtn: () => import("./components/Btn"),
    CustomSnackbar: () => import("../../components/base/CustomSnackbar"),
  },

  data: () => ({
    message: message,
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
    rules: {
      required: (value) => !!value || "Required!",
      min: (v) => v.length === 6 || "Must be 6 characters!",
      email: (e) => /^\S+@\S+\.\S+$/.test(e) || "Invalid Email!",
      emailMatch: () => "The email and password you entered don't match",
    },
    email: "",
    loading: false,
    success: false,
    // token: '',
    // password: '',
    // repassword: '',
  }),

  // mounted() {
  //   this.token = router.history.current.params.token
  //   console.log(this.token, this.success)
  // },

  created() {
    // console.log(this.message)
  },

  methods: {
    onSend() {
      this.loading = true;
      forgotPassword(this.email)
        .then((res) => {
          // console.log(res)
          this.loading = false;
          this.success = true;
          let snackbarVal = {
            snackbar: true,
            text: messages.success,
            type: "success",
          };
          this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
          // router.push('/pages/login')
        })
        .catch((e) => {
          // console.log(e)
          this.loading = false;
          let snackbarVal = {
            snackbar: true,
            text: messages.forgotFailed,
            type: "error",
          };
          this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
        });
    },

    resetPassword(){

    },
  },
};
</script>

<style>
.router-link {
  text-decoration: none;
}
</style>
