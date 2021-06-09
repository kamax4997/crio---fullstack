<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :color="!plan.best && !hover ? 'transparent elevation-0' : undefined"
      :light="plan.best || hover"
      to="/login"
      class="v-card--plan mx-auto pt-3 pb-4 px-2 text-center"
      max-width="100%"
    >
      <div
        class="body-2 text-uppercase grey--text"
        v-text="plan.heading"
      />

      <v-avatar
        size="130"
      >
        <v-icon
          :color="!plan.best && !hover ? undefined : 'success'"
          size="64"
          v-text="plan.icon"
        />
      </v-avatar>

      <h2
        class="display-2 font-weight-light"
        v-text="plan.title"
      />
      <div style=" max-height: 50px;">
        <v-card-text
          class="body-1 font-weight-light pa-1  "
          v-text="plan.text"
        />
      </div>
      <pages-btn
        :color="!plan.best && !hover ? 'white' : 'success'"
        class="plan-btn"
      >
        <!-- Old solution button -->  <!-- {{ $t('plan') }} -->
        {{ plan.btn }}
      </pages-btn>
    </v-card>
  </v-hover>
</template>

<script>
  export default {
    name: 'PagesPlanCard',

    components: {
      PagesBtn: () => import('./Btn'),
    },

    props: {
      plan: {
        type: Object,
        default: () => ({
          best: false,
          heading: undefined,
          icon: undefined,
          title: undefined,
          text: undefined,
        }),
      },
    },
  }
</script>

<style lang="sass">
  .v-card--plan
    .v-avatar
      border-radius: 50%
      border: 1px solid #E5E5E5

    .plan-btn
      width: 100%
</style>
