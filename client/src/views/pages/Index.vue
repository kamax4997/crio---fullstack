<template>
  <v-app>
    <pages-core-app-bar/>

    <pages-core-view/>

    <pages-core-footer/>
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
  </v-app>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import { authenticationService, getCurrentUser } from '../../service/auth'
  import { router } from '../../router'

  export default {
    name: 'PagesIndex',

    components: {
      PagesCoreAppBar: () => import('./components/core/AppBar'),
      PagesCoreFooter: () => import('./components/core/Footer'),
      PagesCoreView: () => import('./components/core/View'),
      CustomSnackbar: () => import('../../components/base/CustomSnackbar'),
    },

    created () {
      this.$vuetify.theme.dark = true
      let token = localStorage.getItem('token')
      if (token) {
        getCurrentUser(token).then((res) => {
          localStorage.setItem('currentUser', JSON.stringify(res.data.data.currentUser))
          this.$store.commit('SET_CURRENT_USER', res.data.data.currentUser)
          if (res.data.data.currentUser === 'admin') {
            if (router.history.current.path === '/') {
              router.push('/admin')
            }
          } else {
            // console.log(router)
            if (router.history.current.path === '/') {
              router.push('/dashboard')
            }
          }
        })
      }
    },

    computed: {
      ...mapState(['snackBar']),
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

    beforeDestroy () {
      this.$vuetify.theme.dark = false
    },
  }
</script>
