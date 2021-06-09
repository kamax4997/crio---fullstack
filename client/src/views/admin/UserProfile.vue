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
        <base-material-card icon="mdi-account-outline">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              MODIFICA
              <span class="body-1">— COMPLETA IL TUO PROFILO</span>
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="profile.name"
                    class="purple-input"
                    label="NOME"
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="profile.surname"
                    label="COGNOME"
                    class="purple-input"
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="profile.email"
                    :rules="[rules.required, rules.email]"
                    label="EMAIL"
                    class="purple-input"
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                >
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
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="profile.city"
                    label="CITTA"
                    class="purple-input"
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="profile.nation"
                    label="NAZIONE"
                    class="purple-input"
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="profile.cap"
                    class="purple-input"
                    label="CAP"
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
                  >
                    AGGIORNA PROFILO
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
  import messages from '../../locales/en'
  import { canUpdateProfile, updateProfile } from '../../service/auth'

  export default {
    //
    name: 'Profile',

    components: {
      PagesBtn: () => import('./component/Btn'),
    },

    data: () => ({
      messages: messages,
      rules: {
        required: value => !!value || 'Required!',
        codeMin: v => v.length === 5 || 'Must be 5 characters!',
        email: e => /^\S+@\S+\.\S+$/.test(e) || 'Invalid Email!',
        emailMatch: () => ('The email and password you entered don\'t match'),
      },
      profile: {
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        address: '',
        company: '',
        city: '',
        nation: '',
        cap: '',
      },
      isVerify: false,
      code: '',
      loading: false,
      newToken: '',
    }),

    mounted () {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'))
      this.profile = currentUser
    },

    methods: {
      async onUpdate() {
        try{
          this.loading = true;
          let profile = this.profile;
          profile.token = localStorage.getItem('token');
          let currentUser = await updateProfile({
            profile: profile
          })
          localStorage.setItem('currentUser', JSON.stringify(currentUser.data.data));
          this.$store.commit('SET_CURRENT_USER', currentUser.data.data)
          this.loading = false;
          let snackbarVal = {
            snackbar: true,
            text: messages.success,
            type: 'success'
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal);
        }catch (e) {
          console.log(e)
          this.loading = false;
          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: 'error'
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal);
        }
      },
    },
  }
</script>
