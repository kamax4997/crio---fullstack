<template>
  <v-container
    v-if="!isVerify"
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card icon="mdi-key-change">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              CAMBIA PASSWORD
              <span class="body-1">—SEGUI LE ISTRUZIONI</span>
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="oldPassword"
                    :rules="[rules.required, rules.min]"
                    hint="At least 6 characters!"
                    label="Digitare la vecchia password.."
                    class="purple-input"
                    type="password"
                    outlined
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="newPassword"
                    :rules="[rules.required, rules.min]"
                    hint="At least 6 characters!"
                    label="Digitare la nuova password.."
                    class="purple-input"
                    type="password"
                    outlined
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="confirmPassword"
                    :rules="[rules.required, rules.min]"
                    hint="At least 6 characters!"
                    label="Ripetere la nuova password.."
                    class="purple-input"
                    type="password"
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    :loading="loading"
                    color="success"
                    class="mr-0"
                    @click="onChangePassword"
                  >
                    AGGIORNA PASSWORD
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
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
                {{messages.emailVerify}}
              </h1>
              <v-icon large>
                mdi-lock
              </v-icon>
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
              {{messages.verifyBtn}}
            </pages-btn>
            <br>
            <br>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
  import messages from '../../locales/en.json'
  import { canResetPassword, resetPassword } from '../../service/auth'

  export default {
    //
    name: 'EditPassword',
    components: {
      PagesBtn: () => import('./component/Btn'),
    },
    data: () => ({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      loading: false,
      rules: {
        required: value => !!value || 'Required!',
        codeMin: v => v.length === 5 || 'Must be 5 characters!',
        confirm: v => v === this.newPassword || 'Password not matched!',
        min: v => v.length >= 6 || 'At least 6 characters!',
        email: e => /^\S+@\S+\.\S+$/.test(e) || 'Invalid Email!',
        emailMatch: () => ('The email and password you entered don\'t match'),
      },
      messages: messages,
      newToken: '',
      isVerify: false,
      code: '',
    }),

    methods: {
      onChangePassword () {
        if (this.newPassword !== this.confirmPassword) {
          let snackbarVal = {
            snackbar: true,
            text: messages.passwordNotMatch,
            type: 'error'
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal);
          return false
        }
        this.loading = true
        let token = localStorage.getItem('token')
        canResetPassword({
          token: token,
          oldPassword: this.oldPassword,
        }).then((res) => {
          this.loading = false
          this.newToken = res.data.data.token
          this.isVerify = true
          let snackbarVal = {
            snackbar: true,
            text: messages.success,
            type: 'success'
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal);
        }).catch((err) => {
          this.loading = false
          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: 'error'
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal);
        })
      },

      onVerify () {
        this.loading = false
        let data = {
          token: localStorage.getItem('token'),
          newToken: this.newToken,
          code: this.code,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        }
        resetPassword(data).then((res) => {
          // console.log(res)
          this.loading = false
          let snackbarVal = {
            snackbar: true,
            text: messages.success,
            type: 'success'
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal);
          this.isVerify = false
        }).catch(e => {
          this.loading = false
          let snackbarVal = {
            snackbar: true,
            text: messages.verifyInvalid,
            type: 'error'
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal);
          this.isVerify = false
        })
      },
    },
  }
</script>
