<template>
  <v-container id="pricing" class="fill-height justify-center" tag="section">
    <v-row align="center" class="text-center" justify="center">
      <div class="row">
        <v-col class="col-sm-6 col-12 col-md-4 col-12">
          <img
            :src="require(`@/assets/SemplificaconCRIOON_White.png`)"
            class="home-logo"
          />
        </v-col>
        <v-col class="bo-left cus-p col-sm-6 col-12 col-md-8">
          <pages-heading class="text-left right-heading home-head">
            Scegli
            <span style="font-family: 'montserrat' !important; font-weight: 700"
              >il tuo piano</span
            >
          </pages-heading>

          <span
            class="mobile-show"
            style="font-family: 'montserrat' !important; font-weight: 700"
          >
            <span style="font-weight: 300">Scegli</span> il tuo piano</span
          >

          <div
            class="display-1 font-weight-light grey--text text--lighten-2 text-left home-log-bot"
            style="font-family: 'montserrat' !important"
          >
            Tutto automatizzato, digitale e sicuro.
            <br class="hidden-sm-and-down" />Attiva le notifiche per ricordarti
            di aggiornare lo stato delle tue <br />
            celle e scarica i reports con tutti i dati aggiornati.
          </div>
        </v-col>
      </div>

    
      <div class="service-main">
        <div class="row mt-5">
          <div class="col-md-4 col-sm-6 col-12">
            <div class="service-box">
              <div class="service-header">
                <h1 style="font-family: 'montserrat'">Free Test</h1>
              </div>
              <div class="service-body">
                <h2 style="font-family: 'montserrat'">
                  PROVALO <span style="font-weight: 100">ORA!</span>
                </h2>
                <p style="font-family: 'montserrat'" class="para-1">
                  3 frighi/celle
                </p>
                <p style="font-family: 'montserrat'" class="para-2">
                  Gratis per 1 mese
                </p>
                <div class="mt-6">
                  <a href="/login" class="active-btn">Attiva</a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-sm-6 col-12">
            <div class="service-box-2">
              <div class="service-header bg-black">
                <h1 style="font-family: 'montserrat'">
                  4,99 €
                  <span style="font-size: 14px; font-weight: 400"
                    >/ all’anno</span
                  >
                </h1>
              </div>
              <div class="service-body">
                <h2 style="font-family: 'montserrat'">
                  <span style="font-weight: 100">Formula</span> Base
                </h2>
                <p style="font-family: 'montserrat'" class="para-1">
                  Ideale per la gestione
                </p>
                <p style="font-family: 'montserrat'" class="para-2">
                  fino a 3 frighi / celle
                </p>
                <div class="mt-6 text-left pl-7">
                  <a href="/login" class="active-btn bg-black">Attiva</a>
                </div>
                <img :src="require(`../../assets/offer.png`)" width="270" />
              </div>
            </div>
          </div>

          <div class="col-md-4 col-sm-6 col-12">
            <div class="service-box-3">
              <div class="service-header">
                <h1 style="font-family: 'montserrat'">
                  8,99 €
                  <span style="font-size: 14px; font-weight: 400"
                    >/ all’anno</span
                  >
                </h1>
              </div>
              <div class="service-body">
                <h2 style="font-family: 'montserrat'">
                  <span style="font-weight: 100">Formula</span> Standard
                </h2>
                <p style="font-family: 'montserrat'" class="para-1">
                  Ideale per la gestione
                </p>
                <p style="font-family: 'montserrat'" class="para-2">
                 fino a 8 frighi / celle
                </p>
                <div class="mt-6 text-left pl-7">
                  <a href="/login" class="active-btn">Attiva</a>
                </div>
                <img :src="require(`../../assets/offer.png`)" width="270" />
              </div>
            </div>
          </div>

          <div class="col-md-4 col-sm-6 col-12">
            <div class="service-box-3">
              <div class="service-header">
                <h1 style="font-family: 'montserrat'">15,99 €  <span style="font-size: 14px; font-weight: 400"
                    >/ all’anno</span
                  ></h1>
              </div>
              <div class="service-body">
                <h2 style="font-family: 'montserrat'">
               <span style="font-weight: 100">Formula</span>   Pro
                </h2>
                <p style="font-family: 'montserrat'" class="para-1">
                  Ideale per la gestione
                </p>
                <p style="font-family: 'montserrat'" class="para-2">
                  fino a 15 frighi / celle
                </p>
                <div class="mt-6 text-left pl-7">
                  <a href="/login" class="active-btn">Attiva</a>
                </div>
                <img :src="require(`../../assets/offer.png`)" width="270" />
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 col-12">
            <div class="service-box-3">
              <div class="service-header">
                <h1 style="font-family: 'montserrat'">28,99 € <span style="font-size: 14px; font-weight: 400"
                    >/ all’anno</span
                  ></h1>
              </div>
              <div class="service-body">
                <h2 style="font-family: 'montserrat'">
                    <span style="font-weight: 100">Formula</span> Pro XL
                </h2>
                <p style="font-family: 'montserrat'" class="para-1">
                  Ideale per la gestione
                </p>
                <p style="font-family: 'montserrat'" class="para-2">
                 fino a 30 frighi / celle
                </p>
                <div class="mt-6 text-left pl-7">
                  <a href="/login" class="active-btn">Attiva</a>
                </div>
                <img :src="require(`../../assets/offer.png`)" width="270" />
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 col-12">
            <div class="service-box-3">
              <div class="service-header">
                <h1 style="font-family: 'montserrat'">49,99 € <span style="font-size: 14px; font-weight: 400"
                    >/ all’anno</span
                  ></h1>
              </div>
              <div class="service-body">
                <h2 style="font-family: 'montserrat'">
                  <span style="font-weight: 100">Formula</span> Super
                </h2>
                <p style="font-family: 'montserrat'" class="para-1">
                  Ideale per la gestione
                </p>
                <p style="font-family: 'montserrat'" class="para-2">
                  oltre i 30 frighi / celle
                </p>
                <div class="mt-6 text-left pl-7">
                  <a href="/login" class="active-btn">Attiva</a>
                </div>
                <img :src="require(`../../assets/offer.png`)" width="270" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row" no-gutters>
        <v-col
          v-for="(section, i) in sections"
          :key="i"
          class="col-md-4 col-sm-6 col-12"
        >
          <v-list-item three-line>
            <v-list-item-icon class="mr-4 mt-5 mt-md-4">
              <v-icon
                :large="$vuetify.breakpoint.mdAndUp"
                :color="section.iconColor"
                v-text="section.icon"
                class="text-white"
                style="margin-top: 15px !important"
              />
            </v-list-item-icon>

            <v-list-item-content
              style="padding-bottom: 0"
              class="text-left ff-mon"
            >
              <v-list-item-title
                class="font-weight-light mt-3 text-white ff-mon"
                v-text="section.title"
                style="font-size: 20px; font-weight: 700 !important"
              />

              <v-list-item-subtitle
                v-text="section.text"
                class="text-white mb-0 ff-mon"
              />
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomePage",

  components: {
    PagesHeading: () => import("./components/Heading"),
    PagesPlanCard: () => import("./components/PlanCard"),
  },

  data: () => ({
    plans: [
      {
        heading: "Avviamento",
        icon: "mdi-fan-chevron-down",
        title: "2.99€",
        text: "Ideale per piccoli negozi con un massimo di 3 frigoriferi",
        btn: "Prova 1 mese gratis",
      },
      {
        best: true,
        heading: "Formula Bronzo",
        icon: "mdi-fan-plus",
        title: "4,99€",
        text: "Ideale per negozi medi da con 3 frigoriferi.",
        btn: "Scegliere il Bronzo",
      },
      {
        heading: "Formula Argento",
        icon: "mdi-fan-speed-1",
        title: "8,99€",
        text: "Ideale per grandi negozi da 4 a 8 frigoriferi.",
        btn: "Scegliere il Argento",
      },
      {
        heading: "Formula Oro",
        icon: "mdi-fan-speed-2",
        title: "15,99€",
        text: " Ideale per negozi extra large da 6 a 31 frigoriferi.",
        btn: "Scegliere il Oro",
      },
      {
        heading: "Formula Platinium",
        icon: "mdi-fan-speed-3",
        title: "35.99€",
        text: "Catene, Supermercati, Franchising con più di 31 frigoriferi",
        btn: "Scegliere il Platinium",
      },
    ],
    sections: [
      {
        icon: "mdi-bell-ring",
        iconColor: "green",
        title: "NOTIFICHE!",
        text:
          "Notifica personalizzabile per registrare la temperatura delle tue celle.",
      },
      {
        icon: "mdi-file-document-multiple-outline",
        iconColor: "secondary",
        title: "REPORTS ",
        text:
          "Scarica in tempo reale i tuoi reports in formato csv, pdf o excel.",
        iconColor: "#fff",
      },
      {
        icon: "mdi-lock",
        iconColor: "#4286f4",
        title: "MASSIMA SICUREZZA",
        text: " I vostri dati sono protetti e al sicuro nei migliori provider.",
      },
      // {
      //   icon: 'mdi-snowflake-alert',
      //   iconColor: 'cyan',
      //   title: 'Prova gratis!',
      //   text: 'Semplice, affidabile, utile. Provaci!',
      // },
    ],
  }),
};
</script>
<style lang="css">
@font-face {
  font-family: "montserrat";
  src: url("../../assets/font/Montserrat/Montserrat-Regular.ttf")
    format("truetype");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "montserrat";
  src: url("../../assets/font/Montserrat/Montserrat-Bold.ttf")
    format("truetype");
  font-weight: 700;
  font-style: normal;
}
.right-heading {
  font-size: 38px !important;
  font-family: "montserrat" !important;
}
.ff-mon {
  font-family: "montserrat" !important;
  /* font-weight: 700 !important; */
}
</style>