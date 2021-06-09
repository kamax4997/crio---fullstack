<template>

  <v-container
    id="verify"
    class="fill-height justify-center margin"
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
              <div class="row head-row">
                <div class="col-md-2 col-sm-3 col-3">
                  <v-icon large class="col-white" style="color: white !important;"> mdi-email</v-icon>
                </div>
                <div class="col-md-10 col-sm-9 col-9 text-left">
                  <h1 class="display-2 font-weight-bold mb-2 mt-2">
                    {{ message.emailVerify }}
                  </h1>
                </div>
              </div>

            </div>
          </template>

          <v-card-text class="text-center">
            <!-- <div class="text-center grey--text body-1 font-weight-light">
              Or Be Classical
            </div> -->

            <v-text-field
              v-model="code"
              :rules="[rules.required, rules.codeMin]"
              hint="Must be 5 characters"
              outlined
              color="secondary"
              :label="message.verifyPlaceHolder"
              class="mt-10"
            />
            <div class="text-right">
              <pages-btn color="success" :loading="loading" v-on:click="onVerify">
                {{ message.verifyBtn }}
              </pages-btn>
            </div>

          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>

  </v-container>

</template>

<script>
  import {router} from "../../router";
  import {register} from "../../service/auth";
  import message from "../../locales/en";

  export default {
    name: "PagesVerify",

    components: {
      PagesBtn: () => import("./components/Btn"),
      PagesHeading: () => import("./components/Heading"),
    },

    data: () => ({
      message: message,
      loading: false,
      token: "",
      code: "",
      rules: {
        required: (value) => !!value || "Obbligatorio!",
        codeMin: (v) => v.length === 5 || "Deve essere di 5 caratteri!",
        min: (v) => v.length >= 6 || "Minimo 6 caratteri!",
      },
    }),

    mounted() {
      this.token = router.history.current.params.token
    },

    methods: {

      onVerify() {
        let data = {
          token: this.token,
          code: this.code,
        };
        register(data)
          .then((res) => {
            // console.log(res);
            let resData = res.data;
            if (resData.statusCode !== 201) {
              //login
              localStorage.setItem("token", resData.data.token);
              let currentUser = resData.data.user;
              localStorage.setItem("currentUser", JSON.stringify(currentUser));
              this.$store.commit("SET_CURRENT_USER", currentUser);
              router.push("/dashboard");
            } else {
              //error
              let snackbarVal = {
                snackbar: true,
                text: message.failed,
                type: "error",
              };
              this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
            }
          })
          .catch((e) => {
            let snackbarVal = {
              snackbar: true,
              text: message.failed,
              type: "error",
            };
            this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
          });
      },
    },
  };
</script>

<style lang="sass" scoped>
  #register
    .v-list-item__subtitle
      -webkic-line-clamp: initial
      -webkit-box-orient: initial
</style>
<style lang="css">
  @font-face {
    font-family: "montserrat-thin";
    src: url("../../assets/font/Montserrat/Montserrat-Thin.ttf") format("truetype");
    src: url("../../assets/font/Montserrat/Montserrat-Bold.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  .ff-mon-t {
    font-family: "montserrat-thin";
    font-weight: 400;
  }

  .fon-bold {
    font-family: "montserrat-thin";
    font-weight: 700 !important;
  }

  .text-green {
    font-family: "montserrat-thin" !important;
    color: green !important;
  }

</style>
