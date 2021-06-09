<template>
  <v-container
    id="purchase"
    fluid
    tag="section"
    class="pa-5"
  >
    <v-row>

      <template v-for="(plan, i) in plans">


        <v-col
          :key="i"
          class="d-flex"
          cols="12"
          sm="6"
          md="3"
          lg="2"
        >

          <pages-plan-card :plan="plan" @click="onClick"/>

        </v-col>

        <v-col
          v-if="(i === 1 && $vuetify.breakpoint.smAndDown) && i + 1 !== plans.length"
          :key="`divider-${i}`"
          class="pa-6"
          cols="12"
        >
          <v-divider/>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
  import { periodTitle } from '../../service/config'
  import messages from '../../locales/en'
  import {
    mapState,
  } from 'vuex'
  import moment from 'moment'
  import { getMainPackages } from '../../service/packages'
  import { executePayWithPaypal } from '../../service/paymentService'
  import { router } from '../../router'

  export default {
    name: 'PurchasePackage',

    components: {
      PagesPlanCard: () => import('./component/PlanCard'),
    },
    data () {
      return {
        messages: messages,
        rules: {
          multiSelRequired: v => v.length > 0 || 'Obbligatorio.',
        },
        plans: [

        ],
      }
    },

    computed: {
      ...mapState(['allGlobalFridges']),
      fridges () {
        return this.$store.state.allGlobalFridges.filter(item => item.active)
      },
    },

    async mounted () {
      try {
        this.$store.commit('SHOW_OVER_LAY', true);
        let token = localStorage.getItem('token');
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let uID = currentUser._id;
        let res = await getMainPackages({
          token,
          uID,
        });
        let mainPackages = res.data.data.packages;
        let curPackage = res.data.data.curPackage;
        let trialFinished = res.data.data.trialFinished;
        console.log('trialFinished ==> ', trialFinished)
        let tmp = [];
        mainPackages.forEach(pItem => {
          let tmpItem = {
            heading: pItem.packageName,
            icon: 'mdi-fan-plus',
            title: pItem.price + '€',
            text: pItem.numberFridges + ' Frighi/Celle ' + pItem.periodQty + ' ' + periodTitle[pItem.periodUnit],
            btn: 'Acquista',
            type: pItem.type,
            _id: pItem._id,
            trialFinished,
          };
          if (curPackage) tmpItem.best = pItem._id === curPackage.pID;
          tmp.push(tmpItem)
        });
        this.plans = tmp;
        this.$store.commit('SHOW_OVER_LAY', false)
      } catch (e) {
        console.log(e);
        this.$store.commit('SHOW_OVER_LAY', false)
      }
    },

    methods: {
      onClick (plan) {
        console.log('plan ===> ', plan)
        // router.push('/dashboard/checkout/' + plan._id)
      },

    },
  }
</script>
