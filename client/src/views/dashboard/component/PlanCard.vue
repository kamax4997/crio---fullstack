<template>
    <v-hover v-slot:default="{ hover }">
      <v-card
        :color="!plan.best && !hover ? 'transparent elevation-0' : undefined"
        :light="plan.best || hover"
        :to="plan.type !== 'trial' && !plan.best ? '/dashboard/checkout/' + plan._id : ''"
        class="v-card--plan mx-auto pt-3 pb-4 px-2 text-center"
        max-width="100%"
        @click="payAct(plan)"
      >
        <div
          :class="'body-2 text-uppercase' + (plan.type !== 'trial' ? ' grey--text' : ' #007ebc--text')"
          v-text="plan.heading"
        />

        <v-avatar
          size="130"
        >
          <v-icon
            :color="plan.type === 'trial' && plan.trialFinished ? '#000' : (!plan.best && !hover ? undefined : 'success')"
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
          :color="plan.type === 'trial' && plan.trialFinished ? '#000' : (!plan.best && !hover ? 'success' :  '#007ebc')"
          class="plan-btn"
        >
        {{!plan.best ? (plan.type === 'trial' && plan.trialFinished ? messages.trialFinished : plan.btn) : 'Hai questo pacchetto'}}
        </pages-btn>
      </v-card>
    </v-hover>
</template>

<script>
  import messages from '../../../locales/en';

  export default {
    name: 'PagesPlanCard',

    components: {
      PagesBtn: () => import('./Btn'),
    },

    data () {
      return {
        messages: messages,
      }
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
          trialFinished: undefined,
        }),
      },
    },

    mounted () {

    },

    methods: {
      payAct(plan){
        this.$parent.onClick(plan);
      }
    }

  }
</script>

<style lang="sass">
  .v-card--plan
    width: 100%

    .v-avatar
      border-radius: 50%
      border: 1px solid #E5E5E5

    .plan-btn
      width: 100%
</style>
