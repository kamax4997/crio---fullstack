<template>
  <v-app>
    <dashboard-core-app-bar v-model="expandOnHover"/>

    <dashboard-core-drawer :expand-on-hover.sync="expandOnHover"/>

    <dashboard-core-view/>

    <custom-snackbar
      app="true"
      :type="snackBar.type"
      :snackbar="snackBar.snackbar"
      y="top"
      z="center"
      mode="multi-line"
      :text="snackBar.text"
      @close="onCloseSnackbar"
    />
    <v-overlay :value="overlay" z-index="50">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- <dashboard-core-settings v-model="expandOnHover" /> -->
  </v-app>

</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import { getCurrentUser } from '../../service/auth'
  import {router} from '../../router'

  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar'),
      DashboardCoreDrawer: () => import('./components/core/Drawer'),
      DashboardCoreView: () => import('./components/core/View'),
      CustomSnackbar: () => import('../../components/base/CustomSnackbar'),
    },

    data: () => ({
      expandOnHover: false,
    }),

    computed: {
      ...mapState(['snackBar', 'overlay']),
    },

    created () {
      let token = localStorage.getItem('token')
      if (token) {
        getCurrentUser(token).then((res) => {
          // console.log('current user ===> ', res.data.data)
          let data = res.data.data
          if (data.error) {
            localStorage.clear()
            router.push('/')
          } else {
            localStorage.setItem('currentUser', JSON.stringify(res.data.data.currentUser))
            this.$store.commit('SET_CURRENT_USER', res.data.data.currentUser)
            router.push('/admin')
          }
        }).catch(e => {
          localStorage.clear()
          router.push('/')
        })
      } else {
        localStorage.clear()
        router.push('/')
      }
    },

    methods: {
      onCloseSnackbar () {
        this.exitSnackbar({
          snackbar: false,
          text: '',
          type: '',
        })
      },
      ...mapMutations({
        exitSnackbar: 'SHOW_SNACK_BAR',
      }),
    },
  }
</script>
