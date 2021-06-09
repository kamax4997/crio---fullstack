<template>
  <v-snackbar
    v-model="snackBar"
    :bottom="y === 'bottom'"
    :color="snackbarType.value[type]"
    :left="x === 'left'"
    :multi-line="mode === 'multi-line'"
    :right="x === 'right'"
    timeout="5000"
    :top="y === 'top'"
    :vertical="mode === 'vertical'"
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        icon
        dark
        v-bind="attrs"
        @click="$emit('close', $event)"
      >
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  export default {
    name: 'CustomSnackbar',
    props: ['snackbar', 'x', 'y', 'mode', 'text', 'type'],
    data: () => ({
      snackbarType: {
        value: {
          error: 'error',
          info: 'info',
          success: 'success',
        },
        color: {
          error: 'error',
          info: 'info',
          success: 'success',
        },
      },
    }),

    computed: {
      snackBar: {
        get: function () {
          return this.snackbar
        },
        set: function (v) {
          this.$store.commit('SHOW_SNACK_BAR', v)
        },
      },
    },
  }
</script>
