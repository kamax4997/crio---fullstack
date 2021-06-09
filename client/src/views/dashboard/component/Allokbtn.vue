<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="290"
  >
    <v-card style="background: white !important;">
      <v-card-title class="headline">
        Confermando!
      </v-card-title>
      <v-card-text>Verranno aggiornati tutti i frighi con l'ultimo stato registrato.<br/>
        (L'attivita di pulizia verra registrata automaticamente nelle giornate Impostate
        </v-card-text>
      <!--<v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-autocomplete
          :items="['Attivo', 'In pulizia', 'In manutenzione', 'Spento']"
          label="Seleziona lo Stato"
        />
      </v-col>-->
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="green darken-1"
          text
          @click.stop="show=false"
        >
          Cancella
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="onUpdateForToday"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { updateHistoryForToday } from '../../../service/fridge'
  import messages from '../../../locales/en'

  export default {
    props: ['visible'],
    computed: {
      show: {
        get () {
          return this.visible
        },
        set (value) {
          if (!value) {
            this.$emit('close')
          }
        },
      },
    },

    methods: {
      async onUpdateForToday () {
        // console.log('updateHistoryForToday')
        try {
          let token = localStorage.getItem('token')
          let currentUser = JSON.parse(localStorage.getItem('currentUser'))
          let uID = currentUser._id
          let res = await updateHistoryForToday({
            token,
            uID,
          })
          // console.log(res)
          this.$store.commit('SET_ALL_FRIDGES', res.data.data)
          let snackbarVal = {
            snackbar: true,
            text: messages.success,
            type: 'success',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal);
          this.show = false;
        } catch (e) {
          console.log(e)
          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: 'error',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
        }
      },
    },
  }
</script>
