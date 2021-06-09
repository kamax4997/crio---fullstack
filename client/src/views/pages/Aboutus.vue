<template>
  <div class="about-main">
    <h1>Chi Siamo</h1>

    <div class="row mt-4">
      <div class="col-md-6">
        <div :style="cssProps" class="about-bg"></div>
      </div>
      <div class="col-md-6">
        <div class="about-content">
          <!-- <h4>Lorem Ipsum</h4> -->
          <p class="para-32"
          style="font-size:17px;">
            BASTA carta e penna per registrare la temperatura della cella frigorifero, BASTA perdere tempo, ma soprattutto BASTA dover ricordare di farlo!
            É così che dall’ intuizione, dalla bravura, da un rapporto di lavoro che dura da anni, Davide e Walter con l’aiuto del programmatore Ermal, hanno creato CRIOON, la Web App che permette di semplificare il lavoro di chiunque abbia una cella frigorifero.Che tu sia titolare di un’azienda o un dipendente crioon ti semplifica il lavoro.
          </p>
        </div>
      </div>
    </div>

 

    <h1>Crioon nasce per semplificare!</h1>
    <div class="row">
      <div class="col-md-4">
        <div :style="pic1" class="vision-songle-box">
          <h1 class="text-white">Quando ebbe inizio…</h1>
          <p class="text-white"
          >
            Davide e Walter danno vita a crioon nel 2019 partendo, come sempre accade in questi casi, dal desiderio di offrire una soluzione innovativa e tecnologica ad un problema che
            hanno molte attivita’.

          </p>
        </div>
      </div>

      <div class="col-md-4">
        <div :style="pic2" class="vision-songle-box">
          <h1 class="text-white">Partiamo dal problema!</h1>
          <p class="text-white"
            > 
           Ogni attivita’ che ha una cella frigo, un frigorifero, una vetrinetta frigo ecc… prevede la registrazione giornaliera della temperatura,

           e quanti la scrivono su dei fogli volanti? Quanti si dimenticano di scriverla quotidianamente? Quanti delegano per non farlo di persona?
          </p>
        </div>
      </div>

      <div class="col-md-4">
        <div :style="pic3" class="vision-songle-box">
          <h1 class="text-white">La soluzione?</h1>
          <p class="text-white"
            style="font-size:15px;">
            Un’applicazione che ti possa avvisare di registrare la temperatura, un’applicazione che tenga in modo sicuro tutti i tuoi dati, Un’applicazione semplice nell’utilizzo,
            un’ applicazione che semplifica il tuo lavoro.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { router } from "../../router";
import { loginApi, authenticationService } from "../../service/auth";
import messages from "../../locales/en";
export default {
  name: "PagesContactus",

  components: {
    PagesBtn: () => import("./components/Btn"),
    CustomSnackbar: () => import("../../components/base/CustomSnackbar"),
  },

  data: () => ({
    cssProps: {
      backgroundImage: `url(${require("@/assets/team.jpeg")})`,
    },
    pic1: {
      backgroundImage: `url(${require("@/assets/how-started.jpeg")})`,
    },
    pic2: {
      backgroundImage: `url(${require("@/assets/writing.jpeg")})`,
    },
    pic3: {
      backgroundImage: `url(${require("@/assets/secure.jpeg")})`,
    },
   
  }),

  methods: {},
};
</script>
<style lang="scss">
@font-face {
  font-family: "montserrat-thin";
  src: url("../../assets/font/Montserrat/Montserrat-Thin.ttf")
    format("truetype");
  src: url("../../assets/font/Montserrat/Montserrat-Bold.ttf")
    format("truetype");
  font-weight: 400;
  font-style: normal;
}
.about-main {
  width: 90%;
  margin: auto;
  h1 {
    text-align: center;
    font-family: "montserrat";
    font-size: 35px;
  }
  .about-bg {
    height: 350px;
    background-size: cover;
    border-radius: 8px;
  }
  .about-content {
    padding: 22px;
    padding-top: 0;
    h4 {
      font-family: "montserrat";
      font-size: 31px;
      margin-bottom: 20px;
    }
    .para-32 {
      //    font-family: 'montserrat';
      //     // font-weight: 400;
      line-height: 1.7;
    }
  }
  .vision-songle-box {
    background-size: cover;
    height: 300px;
    position: relative;
    padding: 20px;
    border-radius: 8px;
    &::before {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      top: 0;
      left: 0;
      border-radius: 8px;
    }
    h1 {
      position: relative;
    }
    p {
      position: relative;
    }
  }
}
</style>