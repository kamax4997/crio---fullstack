<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-breakpoint="960"
    app
    mini-variant-width="80"
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, ${barColor}`" v-bind="props" />
    </template>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-uppercase font-weight-regular display-2">
          <span class="logo-mini">
            <v-icon v-show="expandOnHover"> mdi-power </v-icon>
          </span>

          <span class="logo-normal">
            <img
              :src="require(`@/assets/drawer-logo.png`)"
              alt="logo"
              class="drawer-logo"
            />
          </span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mb-1" />

    <v-list dense nav>
      <base-item-group :item="profile" :username="username" />
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav>
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group v-if="item.children" :key="`group-${i}`" :item="item">
          <!--  -->
        </base-item-group>

        <base-item v-else :key="`item-${i}`" :item="item" />
      </template>
      <div />
    </v-list>
    <v-divider class="mb-2" />
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-uppercase font-weight-regular display-2">
         
          <span class="logo-normal">
            <div class="text-center btn-main">
    
              <img :src="require(`@/assets/tik.png`)" width="29px" height="29px"  />
              <button @click.stop="showScheduleForm = true">AGGIORNA</button>
              <allokbtn
                :visible="showScheduleForm"
                @close="showScheduleForm = false"
              />
            </div>
            <p class="btn-dis">
              Clicca qui per aggiornare lo stato dei <br />
              frigoriferi con le impostazioni <br /> 
              dell’ultima registrazione.
            </p>
          </span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <span class="logout-btn" @click="onLogout()">
      <img
        :src="require(`@/assets/logout.png`)"
        width="24"
        height="24"
        class="mr-2"
        @click="onLogout()"
      />
      ESCI
    </span>

    <div class="bottom-btn">
      <a href="/dashboard/chisiamo" style="text-decoration: none">
        <p>
          <span>
            <img :src="require(`@/assets/zoom.png`)" 
            width="24"
            height="24" />
          </span>
          CHI SIAMO
        </p>
      </a>
      <a href="/dashboard/contactti" style="text-decoration: none">
        <p>
          <span>
            <img :src="require(`@/assets/env.png`)" width="29" 
            height="29"/>
          </span>
          CONTATTI
        </p>
      </a>
    </div>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState } from "vuex";
import messages from "../../../../locales/en";
import { router } from "../../../../router";
import Allokbtn from "@/views/dashboard/component/Allokbtn.vue";
import { authenticationService } from "../../../../service/auth";
export default {
  name: "DashboardCoreDrawer",
  components: {
    Allokbtn,
  },
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    items: [
      {
        icon: "mdi-view-dashboard",
        title: messages.dashboardMenu,
        to: "/dashboard",
      },
      {
        icon: "mdi-cogs",
        title: messages.fridgeMenu,
        to: "/dashboard/manage",
      },
      {
        icon: "mdi-alarm",
        title: messages.notifyMenu,
        to: "/dashboard/notifications",
      },
      {
        icon: "mdi-file-chart",
        title: messages.reportMenu,
        to: "/dashboard/reports",
      },
      {
        icon: "mdi-package-variant",
        title: messages.purchaseMenu,
        to: "/dashboard/purchase",
      },
      // {
      //   icon: "mdi-comment-question-outline",
      //   title: messages.about,
      //   to: "/dashboard/how-to",
      // },
    ],

    showScheduleForm: false,
  }),

  computed: {
    ...mapState(["barColor", "barImage", "currentUser"]),
    username() {
      return (
        this.$store.state.currentUser.name +
        " " +
        this.$store.state.currentUser.surname
      );
    },
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
    computedItems() {
      return this.items.map(this.mapItem);
    },
    profile() {
      return {
        avatar: true,
        group: "",
        title: this.$t("user_name"),
        children: [
          {
            to: "dashboard/profile",
            title: this.$t("user_profile"),
          },
          {
            to: "dashboard/edit-password",
            title: this.$t("user_change_password"),
          },
        ],
      };
    },
  },

  watch: {
    "$vuetify.breakpoint.smAndDown"(val) {
      this.$emit("update:expandOnHover", !val);
    },
  },

  methods: {
    onLogout() {
      // console.log("logout", this.index);
      localStorage.clear();
      router.push("/");
    },
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title),
      };
    },
  },
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  &.v-navigation-drawer--mini-variant
    .v-list-item
      justify-content: flex-start !important

      .v-list-group--sub-group
        display: block !important

    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
        margin-right: 24px
        margin-left: 12px !important

        +rtl()
        margin-left: 24px
        margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
        padding-left: 8px

        +rtl()
        padding-right: 8px

      .v-list-group__header
        +ltr()
        padding-right: 0

        +rtl()
        padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
          margin-right: 8px

          +rtl()
          margin-left: 8px
</style>
<style lang="css">
@font-face {
  font-family: "montserrat";
  src: url("../../../../assets/font/Montserrat/Montserrat-Regular.ttf")
    format("truetype");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "montserrat";
  src: url("../../../../assets/font/Montserrat/Montserrat-Bold.ttf")
    format("truetype");
  font-weight: 700;
  font-style: normal;
}
.v-list-item__title {
  font-family: "montserrat" !important;
  font-weight: 700 !important;
  font-size: 11px  !important;
}
.btn-main {
  background: #ffffff0f;
  padding: 12px 0px;
  border-radius: 36px;
  text-align: center !important;
  display: inline-flex;
  width: 100%;
  text-align: center !important;
  padding-left: 42px;
}
.btn-main button {
  font-family: "montserrat" !important;
  font-weight: 700 !important;
}
.btn-main img {
  margin-right: 7px;
}
.btn-dis {
  font-size: 9px;
  /* text-align: center; */
  margin-top: 11px;
  line-height: 1.5;
}
.bottom-btn {
  width: 88%;
  margin: auto;
  border-top: 1px solid #ffffff47;
  padding-top: 14px;
}
.bottom-btn img {
  margin-right: 6px;
}
.bottom-btn p {
  display: flex;
  color: white;
  font-family: "montserrat";
}
.bottom-btn p:hover {
  cursor: pointer;
}
.v-application .primary {
  background-color: #ffffff !important;
  border-color: #ffffff !important;
  color: black !important;
  border-radius: 39px ;
}
</style>