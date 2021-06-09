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
  import { router } from '../../router'
  import { setPlayerId, setStatus } from '../../service/common'

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
      // ...mapState(['snackBar', 'overlay']),
      ...mapState(['overlay', 'notificationMsgs']),
      notifyMsg: {
        get(){
          return this.$store.state.notificationMsgs
        },
        set(val){
          this.$store.commit('SET_NOTIFY_MSG', val)
        }
      },
      snackBar: {
        get () {
          return this.$store.state.snackBar
        },
        set (val) {
          this.$store.commit('SHOW_SNACK_BAR', val)
        },
      },
    },

    created () {
      let token = localStorage.getItem('token');
      if (token) {
        getCurrentUser(token).then((res) => {
          // console.log('current user ===> ', res.data.data)
          let data = res.data.data;
          if (data.error) {
            localStorage.clear();
            router.push('/')
          } else {
            localStorage.setItem('currentUser', JSON.stringify(res.data.data.currentUser));
            this.$store.commit('SET_CURRENT_USER', res.data.data.currentUser);
            // router.push('/dashboard')
            this.onesignalListener();
          }
        }).catch(e => {
          localStorage.clear();
          router.push('/')
        })
      } else {
        localStorage.clear();
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

      onesignalListener(){
        //////////One Signal
        let token = localStorage.getItem('token');
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let uID = currentUser._id;
        OneSignal.push(function() {
          OneSignal.getUserId(function(userId) {
            // console.log("OneSignal User ID:", userId);
            let data = {
              uID,
              playerID: userId,
            };
            setPlayerId({
              token,
              data,
            }).then((res) => {
              // console.log(res)
            }).catch(e => {
            })
            // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316
          });
        });
        let that = this;
        OneSignal.push(() => {
          OneSignal.on('subscriptionChange', (isSubscribed) => {
            // console.log('subscriptionChange', isSubscribed)
            OneSignal.getUserId().then(function (userId) {
              // console.log('OneSignal User ID:', userId)
              let data = {
                uID,
                playerID: userId,
                registered: isSubscribed,
              };
              setStatus({
                token,
                data,
              }).then((res) => {
                // console.log(res)
              }).catch(e => {
              })
              // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316
            });
            if (!isSubscribed) {
              new window.Notification('Hello', {
                body: 'Le notifiche sono ora disattivate!',
                icon: '/icons/android-chrome-192x192.png',
              })
            } else {
              new window.Notification('Hello', {
                body: 'Le notifiche sono ora attivate!',
                icon: '/icons/android-chrome-192x192.png',
              })
            }
          });

          OneSignal.on('notificationDisplay', function (event) {
            // console.log('OneSignal notification displayed==> :', event, event.content)
            let tmp = that.notifyMsg || [];
            tmp.push(event.content);
            that.notifyMsg = tmp;
            // console.log(that.notificationMsgs)
          })
        })
        //////////One Signal
      }
    },
  }
</script>
