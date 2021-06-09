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
        <!-- <base-material-card icon="mdi-key-change">
          <template v-slot:after-heading>
              <span class="body-1" style="font-family: 'montserrat'; font-weight: 700;">SEGUI LE ISTRUZIONI</span>

            <!-- <div class="font-weight-light card-title mt-2">
              CAMBIA PASSWORD
              <span class="body-1">—SEGUI LE ISTRUZIONI</span>
            </div> -->
          <!-- </template> --> 
      <div class="row">
        <div class="col-md-2">
          <span class="mdi mdi-key-change user-i"></span>
        </div>
        <div class="col-md-10 mt-5">
          <div class=" card-title mt-2" style="font-family: 'montserrat'; font-weight: 700;">
                SEGUI LE ISTRUZIONI
              <!-- <span class="body-1" style="font-family: 'montserrat'; font-weight: 700;">— SEGUI LE ISTRUZIONI</span> -->
            </div>
        </div>
      </div>

          <v-form v-model="valid" ref="form" lazy-validation>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="oldPassword"
                    :rules="[rules.required, rules.min]"
                    hint="Minimo 6 caratteri!"
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
                    hint="Minimo 6 caratteri!"
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
                    hint="Minimo 6 caratteri!"
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
                  color="##007ebd"
                  class="mr-0 cust-blue-btn"
                  :loading="loading"
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
        <div
          color="white"
          light
          max-width="100%"
          width="600"
          class="px-5 py-3"
          style="width: 500px;"
        >
          <!-- <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                {{messages.emailVerify}}
              </h1>
              <v-icon large>
                mdi-lock
              </v-icon>
            </div>
          </template> -->


          <div class="row verify-main">
            <div class="col-md-2">
             <v-icon large color="#fff">
                mdi-lock
              </v-icon>
            </div>
            <div class="col-md-10">
              <p style="font-size: 25px;"> Verifica via e-mail!</p>
             
            </div>
          </div>


          

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
        </div>
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
        required: value => !!value || 'Obbligatorio!',
        codeMin: v => v.length === 5 || 'Minimo 5 caratteri!',
        confirm: v => v === this.newPassword || 'Password non abbinata!',
        min: v => v.length >= 6 || 'Minimo 6 caratteri!',
        email: e => /^\S+@\S+\.\S+$/.test(e) || 'E-mail non valida!',
        emailMatch: () => ("L'e-mail e la password che hai inserito non corrispondono!"),
      },
      messages: messages,
      newToken: '',
      isVerify: false,
      code: '',
      valid: false,
    }),

    methods: {
      onChangePassword () {
        this.$refs.form.validate()
        if(!this.$refs.form.validate())
          return false;
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
        let that = this;
        resetPassword(data).then((res) => {
          // console.log(res)
          that.oldPassword = '';
          that.newPassword = '';
          that.confirmPassword = '';
          that.code = ''
          // that.$refs.form.resetValidation();
          that.loading = false
          let snackbarVal = {
            snackbar: true,
            text: messages.success,
            type: 'success'
          }
          that.$store.commit('SHOW_SNACK_BAR', snackbarVal);
          that.isVerify = false
        }).catch(e => {
          console.log(e)
          that.oldPassword = '';
          that.newPassword = '';
          that.confirmPassword = '';
          that.code = ''
          // that.$refs.form.reset();
          that.loading = false
          let snackbarVal = {
            snackbar: true,
            text: messages.verifyInvalid,
            type: 'error'
          }
          that.$store.commit('SHOW_SNACK_BAR', snackbarVal);
          that.isVerify = false
        })
      },
    },
  }
</script>
<style lang="scss">
.verify-main{
  width: 100%;
    margin: auto;
    background: #4caf50;
    color: white;
    padding: 21px 0px;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12) !important;
    border-radius: 3px;
}
</style>