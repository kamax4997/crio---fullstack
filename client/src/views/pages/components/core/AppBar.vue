<template>
  <v-app-bar
    absolute
    color="transparent"
    flat
    height="85"
  >
    <v-container class="text-right d-flex align-center p-2">
      <!-- <v-toolbar-title
        class="font-weight-light hidden-xs-only"
        v-text="title"
      />
      <v-icon medium>
        mdi-power
      </v-icon>
      <v-toolbar-title
        class="font-weight-light hidden-xs-only"
        v-text="on"
      /> -->
      <div class="p-3 mobile-hide">
        <a href="/">
          <img 
            :src="require(`@/assets/untitled-white.png`)"
            alt="logo"
            width="133"
          >
        </a>
      </div>
      <v-spacer />

      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        min-height="40"
        min-width="40"
        text
      >
        <v-icon
        class="nav-icon"
          :left="$vuetify.breakpoint.mdAndUp"
          size="20"
          v-text="item.icon"
        />

        <span
          class="hidden-sm-and-down nav-item "
          style="padding-top: 2px"
          v-text="item.text"
        />
      </v-btn>
    </v-container>



  </v-app-bar>
</template>

<script>
  export default {
    name: 'PagesCoreAppBar',

    data: () => ({
      criohead: '/',
      items: [
        {
          icon: 'mdi-home',
          text: 'Prodoti e Servizi',
          to: '/',
        },
        // {
        //   icon: 'mdi-view-dashboard',
        //   text: 'Panello di Contollo',
        //   to: '/dashboard',
        // },
        {
          icon: 'mdi-information-outline',
          text: 'Chi Siamo',
          to: '/chisiamo',
        },
             {
          icon: 'mdi-email',
          text: 'Contatti',
          to: '/contactti',
        },
        {
          icon: 'mdi-account-multiple-plus',
          text: 'Registrati',
          to: '/register',
        },
        {
          icon: 'mdi-fingerprint',
          text: 'Login',
          to: '/login',
        },
        //   {
        //   icon: 'mdi-email',
        //   text: 'contact us',
        //   to: '/Contactus',
        // },
        //  {
        //   icon: 'mdi-information-outline',
        //   text: 'Aboutus',
        //   to: '/Aboutus',
        // },
        // {
        //   icon: 'mdi-lock-open-outline',
        //   text: 'Lock',
        //   to: '/pages/lock',
        // },
      ],
      titles: {
        '/login': 'Crio',
        '/home': 'Crio',
        '/register': 'Crio',
      },
      on: 'n',
    }),

    computed: {
      title () {
        return this.titles[this.$route.path]
      },
    },
  }
</script>
<style lang="css">

@font-face { 
    font-family: 'montserrat'; 
    src: url("../../../../assets/font/Montserrat/Montserrat-Bold.ttf") format('truetype');
    font-weight: 700;
    font-style: normal;
}

.nav-item{
  /* color: black; */
  font-family: "montserrat";
  font-style: normal;
  font-weight: 700;
}
.v-btn--active{
  background: white;
}
.v-btn--active .nav-item{
color: #50af47;
} 
.v-btn--active .nav-icon{
color: #50af47 !important;
} 

</style>