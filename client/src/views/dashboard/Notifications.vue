<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row>
      <v-col cols="12" md="12">
        <div class="shadow-box">

          <base-material-card icon="mdi-bell" color="#007ebd">
            <template v-slot:after-heading>
              <div
                class="card-title mt-2"
                style="font-family: 'montserrat'; font-weight: 700"
              >
                PERSONALIZZA LE NOTIFICHE
                <!-- <span class="body-1">— Complete your profile</span> -->
              </div>
            </template>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12">
                    <v-sheet>
                      <v-switch
                        v-model="switch1"
                        inset
                        label="Notifiche Push (Devi accettare per la completa funzionalità dell’applicazione)"
                        @change="changeSubscription"
                      />
                    </v-sheet>
                  </v-col>
                  <v-row v-if="switch1" justify="space-around">
                    <v-col class="lg-offset8 test" md="12" lg="5">
                      <v-time-picker
                        v-model="notifyTime"
                        format="24hr"
                        header-color="#97C0E0"
                      />
                    </v-col>
                    <v-col class="lg-offset8" md="12" lg="7">
                      <v-select
                        v-model="notifyDays"
                        :items="weekdaysConst"
                        :rules="[rules.multiSelRequired]"
                        item-text="title"
                        item-value="index"
                        :label="messages.selectDays"
                        :menu-props="{ top: true, offsetY: true }"
                        outlined
                        multiple
                        required


                      >
                        <template v-slot:prepend-item>
                          <v-list-item ripple @click="toggle">
                            <v-list-item-action>
                              <v-icon
                                :color="
                                notifyDays.length > 0 ? 'indigo darken-4' : ''
                              "
                              >
                                {{ icon }}
                              </v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title
                              >Tutti i Giorni
                              </v-list-item-title
                              >
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider class="mt-2"/>
                        </template>
                      </v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      class="text-right"

                    >
                      <v-btn color="blue" class="mr-0 radius" @click="onSetNotification">
                        {{ messages.ok }}
                      </v-btn>
                    </v-col>
                  </v-row>


                </v-row>
              </v-container>
            </v-form>
          </base-material-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {weekdaysConst} from "../../service/config";
  import messages from "../../locales/en";
  import moment from "moment";
  import momentTZ from "moment-timezone";
  import {getSchedule, setSchedules, setStatus} from "../../service/common";

  export default {
    //
    name: "Notificazioni",
    data() {
      return {
        messages: messages,
        rules: {
          required: (value) => !!value || "Obbligatorio.",
          counter: (value) => value.length <= 35 || "Massimo 35 caratteri",
          singleSelRequired: (v) => typeof v !== "object" || "Obbligatorio.",
          multiSelRequired: (v) => v.length > 0 || "Obbligatorio.",
        },
        profile: {
          name: "",
          surname: "",
          email: "",
          phoneNumber: "",
          address: "",
          company: "",
          city: "",
          nation: "",
          cap: "",
        },
        valid: false,
        switch1: false,
        switch2: true,
        notifyTime: "",
        notifyDays: [],
        weekdaysConst: weekdaysConst,
        playerID: "",
      };
    },

    computed: {
      likesAllFruit() {
        return this.notifyDays.length === this.weekdaysConst.length;
      },
      likesSomeFruit() {
        return this.notifyDays.length > 0 && !this.likesAllFruit;
      },
      icon() {
        if (this.likesAllFruit) return "mdi-close-box";
        if (this.likesSomeFruit) return "mdi-minus-box";
        return "mdi-checkbox-blank-outline";
      },
    },

    async mounted() {
      let token = localStorage.getItem("token");
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.profile = currentUser;
      // this.switch1 = this.profile.email ? true : false;
      //this.switch2 = this.profile.phoneNumber ? true : false;
      let uID = currentUser._id;
      let res = await getSchedule({
        token,
        uID,
      });
      console.log('res ===> ', res)
      if (res.data.data) {
        let curSchedule = res.data.data;
        this.switch1 = curSchedule.status

        this.playerID = curSchedule.playerID;
        this.notifyTime = curSchedule.notifyTime;
        // console.log(curSchedule)
        this.notifyDays = curSchedule.notifyDays;
        /*curSchedule.notifyDays.forEach(t => {
            this.notifyDays.push(weekdaysConst[t]);
          })*/
      }
    },

    methods: {
      toggle() {
        this.$nextTick(() => {
          // console.log(this.selectedFridges.length)
          if (this.notifyDays.length) {
            this.notifyDays = [];
          } else {
            // this.selectedFridges = this.allFridges.slice()
            let tmp = this.weekdaysConst.slice();
            tmp.forEach((item) => {
              this.notifyDays.push(item.index);
            });
          }
        });
      },

      changeSubscription() {
        console.log("=========>", this.switch1);
        console.log("=========>", this.switch2);
        let token = localStorage.getItem("token");
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let uID = currentUser._id;
        let switch1 = this.switch1;
        // let switch2 = this.switch2;
        if (this.switch1) {

          OneSignal.push(() => {
            console.log("subscribed!!!");
            OneSignal.isPushNotificationsEnabled().then((isSubscribed) => {
              console.log("isPushNotificationsEnabled", isSubscribed);
              if (!isSubscribed) {
                OneSignal.registerForPushNotifications();
                OneSignal.setSubscription(true);
              }
            });
          });
        } else {
          OneSignal.getUserId().then(function (userId) {
            console.log('OneSignal User ID:', userId)
            let data = {
              uID,
              playerID: userId,
              registered: false,
              status: false,
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
          OneSignal.push(() => {
            console.log("unsubscribed!!!");
            OneSignal.setSubscription(false);
          });
        }
      },

      async onSetNotification() {
        try {
          this.$refs.form.validate();
          if (!this.$refs.form.validate()) {
            return false;
          }
          this.$store.commit("SHOW_OVER_LAY", true);
          let token = localStorage.getItem("token");
          let currentUser = JSON.parse(localStorage.getItem("currentUser"));
          let uID = currentUser._id;
          let data = {
            uID,
            notifyTime: this.notifyTime,
            notifyDays: this.notifyDays,
          };
          let res = await setSchedules({token, data});
          // console.log(res);
          this.$store.commit("SHOW_OVER_LAY", false);
          let snackbarVal = {
            snackbar: true,
            text: messages.notificationSet,
            type: "success",
          };
          this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
        } catch (e) {
          console.log(e);
          this.$store.commit("SHOW_OVER_LAY", false);
          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: "error",
          };
          this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
        }

        /*new window.Notification('14islands', {
            body: 'Notifications are now turned off.',
            icon: '/icons/android-chrome-192x192.png',
          })*/
      },

      notifyMe() {
        if (!window.Notification) {
          console.log("Il browser non supporta le notifiche!.");
        } else {
          // check if permission is already granted
          if (Notification.permission === "granted") {
            console.log("granted!");
            // show notification here
            var notify = new window.Notification("14islands", {
              body: "How are you doing?",
              // icon: 'https://prnt.sc/u2i1cv',
            });
          } else {
            console.log("not granted!");
            // request permission from user
            Notification.requestPermission()
              .then(function (p) {
                if (p === "granted") {
                  console.log("granted ===> ", p);
                  // show notification here
                  var notify = new Notification("Ciao!", {
                    body: "Come stai?",
                    // icon: 'https://prnt.sc/u2i1cv',
                  });
                } else {
                  console.log("User blocked notifications.");
                }
              })
              .catch(function (err) {
                console.error(err);
              });
          }
        }
      },
    },
  };
</script>

<style scoped>
  .test {
    /* background-color:#97C0E0 !important; */
    color: #97C0E0 !important;
    border-radius: 50%;

  }

  .radius {
    border-radius: 56px;
  }

  .v-application .primary {
    /*background-color: var(--v-primary-base);*/
    background-color: #97C0E0 !important;
    border-color: #97c0e0 !important;
    color: white !important;
    border-radius: 39px !important;
  }

  .v-application .pa-7 {
    border-radius: 50%;
  }
</style>
