<template>
  <v-container
    id="how-to"
    fluid
    tag="section"
    class="pa-5"
  >
    <v-row
      align="center"
      class="text-center"
      justify="center">
      <pages-heading class="mb-12 display-4 font-weight-bold">
        {{messages.aboutTitle}}
      </pages-heading>
    </v-row>
    <v-row>
      <v-col
        class="pa-10 col-sm-12 col-md-6"
      >
        <v-img src="../../assets/notification.png" aspect-ratio="3.5"
               :lazy-src="`../../assets/notification.png`"
        ><div class="fill-height repeating-gradient"></div></v-img>
      </v-col>
      <v-col
        class="pa-10 col-sm-12 col-md-6"
      >
        <div class="text-center">
          <h1 class="display-2 font-weight-bold mb-2">
            {{messages.notificationIssueTitle}}
          </h1>
          <p>
            {{messages.notificationIssueMsg}}
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="pa-10 col-sm-12 col-md-6"
      >
        <div class="text-center">
          <h1 class="display-2 font-weight-bold mb-2">
            {{messages.paypalIssueTitle}}
          </h1>
          <p>{{messages.paypalIssueMsg}}</p>
        </div>
      </v-col>
      <v-col
        class="pa-10 col-sm-12 col-md-6"
      >
        <v-img src="../../assets/paypal.jpg" aspect-ratio="3.5"
               :lazy-src="`../../assets/paypal.png`"
        ><div class="fill-height repeating-gradient"></div></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import messages from '../../locales/en'

  export default {
    name: 'HowTo',

    components: {
      PagesPlanCard: () => import('./component/PlanCard'),
      PagesHeading: () => import('./component/Heading'),
    },
    data () {
      return {
        messages: messages,
        rules: {
          multiSelRequired: v => v.length > 0 || 'Obbligatorio.',
        },
      }
    },

    computed: {},
  }
</script>
