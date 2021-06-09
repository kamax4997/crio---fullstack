<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="290"
  >
    <v-card style="background: white !important;">
      <v-card-title class="headline">
        Sei sicuro?
      </v-card-title>
      <v-card-text>Questo aggiornerà tutti i frigoriferi per oggi con lo stato selezionato qui sotto!</v-card-text>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-select
          :items="['Attivo', 'In pulizia', 'In manutenzione', 'Spento']"
          label="Seleziona lo Stato"
        />
      </v-col>
      <v-card-actions>
        <v-spacer />
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
          @click="dialog2 = false"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
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
  }
</script>
