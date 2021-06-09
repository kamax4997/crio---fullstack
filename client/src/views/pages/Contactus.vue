<template>
  <div class="contact-main">
    <h1>Contatti</h1>
    <p>
      Stai affrontando un problema, hai un suggerimento?<br />
      Potete raggiungerci facilmente! Vedi sotto :)<br />
    </p>
    <div class="row">
      <div class="col-md-4">
        <div class="contact-card">
          <div class="icon">
            <span class="mdi mdi-email-open"></span>
          </div>
          <div class="text-box">
            <h4><a href="http://https://support.crioon.com/">Pagina di supporto</a></h4>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="contact-card">
          <div class="icon">
          
            <span class="mdi mdi-thumb-up"></span>
          </div>
          
          <div class="text-box">
            <h4><a href="https://www.facebook.com/crioonapp">Facebook</a>  <a href="https://www.instagram.com/crioonapp/">Instagram</a></h4>
          </div> 
        </div>
      </div>

      <div class="col-md-4">
        <div class="contact-card">
          <div class="icon">
            <span class="mdi mdi-map-marker-circle"></span>
          </div>
          <div class="text-box">
            <h4>
             Fiera di Primiero, Trentino-Alto Adige, Italy</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="text-right mb-4">
      <button style="color: white !important;" > <a href="https://support.crioon.com/index.php?a=add" style="color: white !important; text-decoration:none;">Invia il biglietto</a> </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { router } from "../../router";
import { loginApi, authenticationService } from "../../service/auth";
import messages from "../../locales/en";
import { mdiPhoneMessageOutline } from "@mdi/js";
import { mdiEmailVariant } from '@mdi/js';
import { mdiMapMarkerCircle } from '@mdi/js';
export default {
  name: "PagesContactus",

  components: {
    PagesBtn: () => import("./components/Btn"),
    CustomSnackbar: () => import("../../components/base/CustomSnackbar"),
  },

  data: () => ({}),

  methods: {},
};
</script>
<style lang="scss">
.contact-main {
  width: 90%;
  margin: auto;
  h1 {
    text-align: center;
    font-family: "montserrat";
    font-size: 35px;
  }
  p {
    font-family: "montserrat";
    text-align: center;
    padding: 0px 40px;
  }
  .contact-card {
    background: white;
    padding: 11px 0px;
    border-radius: 8px;
    box-shadow: -1px 0px 20px 2px #0000004f;
    text-align: center;
    span {
      color: #777777;
      font-size: 46px;
    }
    h4 {
      color: #777777;
      font-size: 20px;
    }
  }
  button {
    background: green;
    padding: 13px 33px;
    font-size: 16px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid green;
    transition: 0.5s;
    &:hover {
      background: white;
      border: 1px solid green;
      color: green;
      cursor: pointer;
    transition: 0.5s;

    }
  }
}
</style>