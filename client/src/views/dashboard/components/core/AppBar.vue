<template>
  <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
    <v-btn
      class="mr-3 hidden-sm-and-down"
      style="display: none"
      elevation="1"
      fab
      small
      @click="
        $vuetify.breakpoint.smAndDown
          ? setDrawer(!drawer)
          : $emit('input', !value)
      "
    >
      <v-icon v-if="value"> mdi-view-quilt </v-icon>

      <v-icon v-else> mdi-view-headline </v-icon>
    </v-btn>

<div class="mobile-header">
      <div class="row">
      <div class="col-md-6 col-sm-6 col-6">
        <img
          :src="require(`@/assets/mobil-logo.png`)"
          alt="logo"
          width="126"
        />
      </div>
      <div class="col-md-6 col-sm-6 col-6 text-right">
          <v-btn
            class="mr-3"
            elevation="1"
            fab
            small
            @click="
              $vuetify.breakpoint.smAndDown
                ? setDrawer(!drawer)
                : $emit('input', !value)
            "
          >
            <v-icon v-if="value"> mdi-view-quilt </v-icon>

            <v-icon v-else> mdi-view-headline </v-icon>
          </v-btn>
      </div>
    </div>
</div>


        
<div class="show-mobil-title">
    <h1><v-toolbar-title
          class="fon-bold"
          style="font-family: 'montserrat' !important; font-weight: 700"
          v-text="$route.name"
        /></h1>
</div>

    <div class="row hidden-sm-and-down">
      <div class="col-md-6 col-sm-6">
        <v-toolbar-title
          class="fon-bold"
          style="font-family: 'montserrat' !important; font-weight: 700"
          v-text="$route.name"
        />
      </div>
      <div class="col-md-6 text-right">
           <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2 hidden-sm-and-down"
          min-width="0"
          text
          @click="notifyMsg = []"
        >
          <v-badge v-if="notifyMsg.length" color="red" overlap bordered>
            <template v-slot:badge>
              <span>{{ notifyMsg.length }}</span>
            </template>

            <v-icon>mdi-bell</v-icon>
          </v-badge>
          <v-icon v-else>mdi-bell</v-icon>
        </v-btn>
      </template>

      <v-list :tile="false" nav>
        <div>
          <app-bar-item v-for="(n, i) in notifyMsg" :key="`item-${i}`">
            <v-list-item-title v-text="n" />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>
        <v-menu
      bottom
      left
      min-width="200"
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2 hidden-sm-and-down"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
        
      </template>

   

      <v-list :tile="false" flat nav>
        <template v-for="(p, i) in profile">
          <v-divider v-if="p.divider" :key="`divider-${i}`" class="mb-2 mt-2" />

          <app-bar-item v-else :key="`item-${i}`" :to="p.to" :index="i">
            <v-list-item-title v-text="p.title" />
          </app-bar-item>
        </template>
      </v-list>
    </v-menu>
      </div>
    </div>


    <!-- <v-text-field
      :label="$t('search')"
      color="secondary"
      hide-details
      style="max-width: 165px;"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field> -->

    <div class="mx-3" />

    <!-- <v-btn
      class="ml-2"
      min-width="0"
      text
    >
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn> -->

 


  </v-app-bar>
</template>

<script>
// Components
import { VHover, VListItem } from "vuetify/lib";

// Utilities
import { mapState, mapMutations } from "vuex";
import { router } from "../../../../router";

export default {
  name: "DashboardCoreAppBar",

  components: {
    AppBarItem: {
      props: ["index"],
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    "black--text": !hover,
                    "white--text secondary elevation-12": hover,
                  },
                  props: {
                    activeClass: "",
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                  on: {
                    click: this.onLogout,
                  },
                },
                this.$slots.default
              );
            },
          },
        });
      },
      methods: {
        onLogout() {
          // console.log("logout", this.index);
          if (this.index === 3) {
            localStorage.clear();
            router.push("/");
          }
        },
      },
    },
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    notifications: [
      "Mike John Responded to your email",
      "You have 5 new tasks",
      "You're now friends with Andrew",
      "Another Notification",
      "Another one",
    ],
    profile: [
      {
        to: "/dashboard/profile",
        title: "PROFILIO",
      },
      {
        to: "/dashboard/edit-password",
        title: "CAMBIA PASSWORD",
      },
      { divider: true },
      { title: "ESCI" },
    ],
  }),

  computed: {
    ...mapState(["drawer"]),
    notifyMsg: {
      get() {
        return this.$store.state.notificationMsgs;
      },
      set(val) {
        this.$store.commit("SET_NOTIFY_MSG", val);
      },
    },
  },

  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER",
    }),
  },
};
</script>
