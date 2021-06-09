<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card icon="mdi-bell">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              PERSONALIZZA LE NOTIFICHE
              <!-- <span class="body-1">— Complete your profile</span> -->
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-sheet>
                    <v-switch
                      v-model="switch1"
                      inset
                      label="Notifiche Push (Devi accettare per la completa funzionalità dell’applicazione)"
                    />
                  </v-sheet>
                </v-col>
          
                <v-row
                  v-if="switch1"
                  justify="space-around"
                >
                  <v-col
                    class="lg-offset8"
                    md="12"
                    lg="4"
                  >
                    <v-time-picker
                      v-model="e7"
                      format="24hr"
                    />
                  </v-col>
                </v-row>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                  >
                    OK
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    //
    name: 'Notificazioni',
    data () {
      return {
        switch1: false,
      }
    },
  }
</script>
