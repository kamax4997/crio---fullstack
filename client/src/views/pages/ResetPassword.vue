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
                    {{ message.resetPassword }}
                  </h1>
                </div>
              </div>
            </div>
          </template>

          <v-card-text v-if="!success" class="text-center">
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
              <pages-btn color="success" :loading="loading" v-on:click="resetPassword">
                {{ message.reset }}
              </pages-btn>
            </div>
          </v-card-text>

          <v-card-text v-else class="text-center">
            <div class="text-center grey--text body-1 font-weight-bold">
              {{ message.renewPassSuccess }}
            </div>
            <br />
            <router-link class="router-link" to="/login">
              <span class="text-no-wrap success--text">{{ message.login }}</span>
            </router-link>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
import { router } from "../../router";
import {forgotPassword, loginApi, reNewPassword} from "../../service/auth";
import message from "../../locales/en.json";
import messages from "../../locales/en";

export default {
  name: "PagesResetPassword",

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
    },
    loading: false,
    success: true,
    token: '',
    password: '',
    repassword: '',
  }),

  mounted() {
    this.token = router.history.current.params.token
    console.log(this.token, this.success)
  },

  created() {
    // console.log(this.message)
  },

  methods: {

    async resetPassword(){
      try{
        this.loading = true;
        let data = {
          token: this.token,
          newPassword: this.password
        };
        await reNewPassword(data);
        let snackbarVal = {
          snackbar: true,
          text: messages.success,
          type: "success",
        };
        this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
        this.success = true;
        this.loading = false;
      }catch (e) {
        this.success = false;
        let snackbarVal = {
          snackbar: true,
          text: messages.forgotFailed,
          type: "error",
        };
        this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.router-link {
  text-decoration: none;
}
</style>
