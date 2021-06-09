<template>
  <v-container
    id="register"
    class="fill-height justify-center"
    tag="section"
  >
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-slide-y-transition appear>
          <v-card class="pa-3 pa-md-5 mx-auto bg-trans m-0" light>
            <v-row>
              <v-col class="d-md-block" cols="12" md="4">
                <!-- <pages-heading class="display-3 text-white">
                  Semplifica con
                </pages-heading> -->
                <img
                  :src="require(`@/assets/SemplificaconCRIOON_White.png`)"
                  alt="logo"
                  class="reg-logo"
                />

                <v-row no-gutters>
                  <v-col v-for="(section, i) in sections" :key="i" cols="12">
                    <v-list-item three-line>
                      <v-list-item-icon class="mr-4 mt-5 mt-md-4">
                        <v-icon
                          :large="$vuetify.breakpoint.mdAndUp"
                          :color="section.iconColor"
                          v-text="section.icon"
                          class="text-white"
                          style="margin-top: 10px !important;"
                        />
                      </v-list-item-icon>

                      <v-list-item-content style="padding: 0">
                        <v-list-item-title
                          class="mt-4 text-white fon-bold"
                          v-text="section.title"
                        />

                        <v-list-item-subtitle
                          v-text="section.text"
                          class="text-white mb-0 "
                        />
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12" md="8">
                <div class="text-center form-box">
                  <!-- <v-btn
                    v-for="(social, i) in socials"
                    :key="i"
                    :color="social.iconColor"
                    class="my-2 mr-1"
                    dark
                    depressed
                    fab
                    small
                  >
                    <v-icon v-text="social.icon" />
                  </v-btn> -->

                  <div class="my-2" />

                  <div class="text-center grey--text body-1 font-weight-light down-none">
                    Semplice, affidabile, utile. Provala!
                  </div>

                  <v-text-field
                    v-model="name"
                    :rules="[rules.required]"
                    color=""
                    label="Nome.."
                  />
                    <!-- prepend-icon="mdi-face" -->

                  <v-text-field
                    v-model="email"
                    :rules="[rules.required, rules.email]"
                    color=""
                    label="Email..."
                  />
                    <!-- prepend-icon="mdi-email" -->

                  <v-text-field
                    v-model="password"
                    :rules="[rules.required, rules.min]"
                    hint="Minimo 6 caratteri"
                    class=""
                    type="password"
                    color=""
                    label="Password..."
                  />
                    <!-- prepend-icon="mdi-lock-outline" -->

                  <v-checkbox :input-value="true" color="">
                    <template v-slot:label>
                      <span class="text-no-wrap ff-mon-t text-green model-a" @click="dialog = true"
                        >Accetto i: &nbsp; Termini e le Condizioni-Privacy
                        Policy.
                      </span>

                      <!-- <a class="ml-6 ml-sm-0 text-black ff-mon-t model-a" @click="dialog = true">
                        Termini e le Condizioni-Privacy Policy. </a >. -->
                    </template>
                  </v-checkbox>

                  <div class="col-md-12 text-right">
                    <pages-btn
                      color="success"
                      :loading="loading"
                      v-on:click="onRegister"
                      style="margin-right: 0"
                    >
                      Iniziare
                    </pages-btn>
                  </div>
                </div>
              </v-col>
              <!-- <v-col
                class="d-lg-none d-xl-none d-md-none d-sm-block"
                cols="12"
                md="6"
              > -->
                <!-- <v-row no-gutters>
                  <v-col v-for="(section, i) in sections" :key="i" cols="12">
                    <v-list-item three-line>
                      <v-list-item-icon class="mr-4 mt-5 mt-md-4">
                        <v-icon
                          :large="$vuetify.breakpoint.mdAndUp"
                          :color="section.iconColor"
                          v-text="section.icon"
                        />
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title
                          class="font-weight-light mb-4 mt-3"
                          v-text="section.title"
                        />

                        <v-list-item-subtitle v-text="section.text" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row> -->
              <!-- </v-col> -->
            </v-row>
          </v-card>
        </v-slide-y-transition>
      </v-col>
    </v-row>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          width="600px"
          style="background: white !important"
          light
        >
          <v-card style="background: white !important">
            <v-card-title>
              <span>Privacy Policy</span>
            </v-card-title>
            <v-card-text>
              Ai sensi dell'articolo 13 del codice della D.Lgs. 196/2003, vi
              rendiamo le seguenti informazioni. Noi di www.crioon.com riteniamo
              che la privacy dei nostri visitatori sia estremamente importante.
              Questo documento descrive dettagliatamente i tipi di informazioni
              personali raccolti e registrati dal nostro sito e come essi
              vengano utilizzati.
            </v-card-text>
            <v-card-title>
              <span>File di Registrazione (Log Files)</span>
            </v-card-title>
            <v-card-text>
              Come molti altri siti web, il nostro utilizza file di log. Questi
              file registrano semplicemente i visitatori del sito - di solito
              una procedura standard delle aziende di hosting e dei servizi di
              analisi degli hosting. Le informazioni contenute nei file di
              registro comprendono indirizzi di protocollo Internet (IP), il
              tipo di browser, Internet Service Provider (ISP), informazioni
              come data e ora, pagine referral, pagine d'uscita ed entrata o il
              numero di clic. Queste informazioni vengono utilizzate per
              analizzare le tendenze, amministrare il sito, monitorare il
              movimento degli utenti sul sito e raccogliere informazioni
              demografiche. Gli indirizzi IP e le altre informazioni non sono
              collegate a informazioni personali che possono essere
              identificate, dunque
              <b> tutti i dati sono raccolti in forma assolutamente anonima.</b>
            </v-card-text>
            <v-card-title>
              <span>Questo sito web utilizza i Cookies</span>
            </v-card-title>
            <v-card-text>
              Questo sito utilizza cookies, anche di terze parti, per
              migliorarne l’esperienza di navigazione, consentire a chi naviga
              di usufruire di eventuali servizi online e monitorare la
              navigazione nel sito.
            </v-card-text>
            <v-card-title>
              <span>Cookie Policy</span>
            </v-card-title>
            <v-card-text>
              Questo sito utilizza cookies, anche di terze parti, per
              migliorarne l’esperienza di navigazione, consentire a chi naviga
              di usufruire di eventuali servizi online e monitorare la
              navigazione nel sito.
            </v-card-text>
            <v-card-title>
              <span>Come disabilitare i Cookies</span>
            </v-card-title>
            <v-card-text>
              E’ possibile disabilitare i cookies direttamente dal browser
              utilizzato, accedendo alle impostazioni (preferenze oppure
              opzioni): questa scelta potrebbe limitare alcune funzionalità di
              navigazione del sito.
            </v-card-text>
            <v-card-title>
              <span>Gestione dei Cookies</span>
            </v-card-title>
            <v-card-text>
              I cookies utilizzati in questo sito possono rientrare nelle
              categorie descritte di seguito.
              <ul>
                <li>Attività strettamente necessarie al funzionamento</li>
                Questi cookies hanno natura tecnica e permettono al sito di
                funzionare correttamente. Ad esempio, mantengono l’utente
                collegato durante la navigazione evitando che il sito richieda
                di collegarsi più volte per accedere alle pagine successive.
              </ul>
              <ul>
                <li>Attività di salvataggio delle preferenze</li>
                Questi cookies hanno natura tecnica e permettono al sito di
                funzionare correttamente. Ad esempio, mantengono l’utente
                collegato durante la navigazione evitando che il sito richieda
                di collegarsi più volte per accedere alle pagine successive.
              </ul>
              <ul>
                <li>
                  Attività Statistiche e di Misurazione dell’audience (es:
                  Google Analytics)
                </li>
                Questi cookie ci aiutano a capire, attraverso dati raccolti in
                forma anonima e aggregata, come gli utenti interagiscono con i
                siti internet fornendo informazioni relative alle sezioni
                visitate, il tempo trascorso sul sito, eventuali
                malfunzionamenti. Questo aiuta a migliorare la resa dei siti
                internet.
              </ul>
              <ul>
                <li>Cookie di social media (es: Facebook)</li>
                Questi cookie di terza parte vengono utilizzati per integrare
                alcune diffuse funzionalità dei principali social media e
                fornirle all’interno del sito. In particolare permettono la
                registrazione e l’autenticazione sul sito tramite facebook e
                google connect, la condivisione e i commenti di pagine del sito
                sui social, abilitano le funzionalità del “mi piace” su Facebook
                e del “+1″ su G+.
              </ul>
            </v-card-text>
            <v-card-title>
              <span>Fornitori di terze parti</span>
            </v-card-title>
            <v-card-text>
              I fornitori di terze parti, tra cui Google, utilizzano cookie per
              pubblicare annunci in base alle precedenti visite di un utente su
              questo sito. L'utilizzo dei cookie per la pubblicità consente a
              Google e ai suoi partner di pubblicare annunci per gli utenti di
              questo sito (e su altri siti) in base ai dati statistici raccolti
              su questo sito e sui siti web dei partner Google. Gli utenti
              possono scegliere di disattivare la pubblicità personalizzata,
              visitando la pagina Impostazioni annunci. Visitando la pagina
              www.aboutads.info potrai disattivare i cookies dei fornitori di
              terze parti.
            </v-card-text>
            <v-card-title>
              <span>Finalità del trattamento</span>
            </v-card-title>
            <v-card-text>
              I dati possono essere raccolti per una o più delle seguenti
              finalità:
              <ul>
                <li>
                  fornire l'accesso ad aree riservate del Portale e di
                  Portali/siti collegati con il presente e all'invio di
                  comunicazioni anche di carattere commerciale, notizie,
                  aggiornamenti sulle iniziative di questo sito e delle società
                  da essa controllate e/o collegate e/o Sponsor.
                </li>
                <li>
                  eventuale cessione a terzi dei suddetti dati, sempre
                  finalizzata alla realizzazione di campagne di email marketing
                  ed all'invio di comunicazioni di carattere commerciale.
                </li>
                <li>eseguire gli obblighi previsti da leggi o regolamenti;</li>
                <li>gestione contatti;</li>
              </ul>
            </v-card-text>
            <v-card-title>
              <span>Modalità del trattamento</span>
            </v-card-title>
            <v-card-text>
              I dati verranno trattati con le seguenti modalità:
              <ul>
                <li>
                  raccolta dati con modalità single-opt, in apposito database;
                </li>
                <li>
                  registrazione ed elaborazione su supporto cartaceo e/o
                  magnetico;
                </li>
                <li>
                  organizzazione degli archivi in forma prevalentemente
                  automatizzata, ai sensi del Disciplinare Tecnico in materia di
                  misure minime di sicurezza, Allegato B del Codice della
                  Privacy.
                </li>
              </ul>
            </v-card-text>
            <v-card-title>
              <span
                >Soggetti a cui dati potranno essere comunicati i dati
                personali</span
              >
            </v-card-title>
            <v-card-text>
              I dati raccolti potranno essere comunicati a:
              <ul>
                <li>
                  società e imprese per usi di direct mailing o attività
                  analoghe;
                </li>
                <li>
                  associazioni e fondazioni intenzionate ad acquistare spazi
                  pubblicitari sulle liste o sul sito e/o collegate alla
                  fornitura di un particolare servizio.
                </li>
                <li>
                  soggetti che debbano avere accesso ai dati, come da norme di
                  legge o di normative secondarie e/o comunitarie.
                </li>
              </ul>
            </v-card-text>
            <v-card-title>
              <span>Diritti dell'interessato</span>
            </v-card-title>
            <v-card-text>
              Ai sensi ai sensi dell'art. 7 (Diritto di accesso ai dati
              personali ed altri diritti) del Codice della Privacy, vi
              segnaliamo che i vostri diritti in ordine al trattamento dei dati
              sono:
              <ul>
                <li>
                  conoscere, mediante accesso gratuito l'esistenza di
                  trattamenti di dati che possano riguardarvi;
                </li>
                <li>
                  essere informati sulla natura e sulle finalità del trattamento
                </li>
                <li>
                  ottenere a cura del titolare, senza ritardo:
                  <ul>
                    <li>
                      la conferma dell'esistenza o meno di dati personali che vi
                      riguardano, anche se non ancora registrati, e la
                      comunicazione in forma intellegibile dei medesimi dati e
                      della loro origine, nonché della logica e delle finalità
                      su cui si basa il trattamento; la richiesta può essere
                      rinnovata, salva l'esistenza di giustificati motivi, con
                      intervallo non minore di novanta giorni;
                    </li>
                    <li>
                      la cancellazione, la trasformazione in forma anonima o il
                      blocco dei dati trattati in violazione di legge, compresi
                      quelli di cui non è necessaria la conservazione in
                      relazione agli scopi per i quali i dati sono stati
                      raccolti o successivamente trattati;
                    </li>
                    <li>
                      l'aggiornamento, la rettifica ovvero, qualora vi abbia
                      interesse, l'integrazione dei dati esistenti;
                    </li>
                    <li>
                      opporvi in tutto o in parte per motivi legittimi al
                      trattamento dei dati personali che vi riguardano ancorché
                      pertinenti allo scopo della raccolta;
                    </li>
                  </ul>
                </li>
              </ul>
              Vi segnaliamo che il titolare del trattamento ad ogni effetto di
              legge è:
              <ul>
                <ul>
                  <li>walter Codice Fiscale: bttwtr71m13a757n</li>
                  <li>via sala, 3</li>
                  <li>32100 - BELLUNO (BELLUNO)</li>
                  <li>E-mail: walter-6[at]libero.it</li>
                </ul>
              </ul>
              Per esercitare i diritti previsti all'art. 7 del Codice della
              Privacy ovvero per la cancellazione dei vostri dati dall'archivio,
              è sufficiente contattarci attraverso uno dei canali messi a
              disposizione. Tutti i dati sono protetti attraverso l'uso di
              antivirus, firewall e protezione attraverso password.
            </v-card-text>
            <v-card-title>
              <span>Informazioni per i bambini</span>
            </v-card-title>
            <v-card-text>
              Riteniamo importante assicurare una protezione aggiunta ai bambini
              online. Noi incoraggiamo i genitori e i tutori a trascorrere del
              tempo online con i loro figli per osservare, partecipare e/o
              monitorare e guidare la loro attività online. Noi non raccogliamo
              dati personali di minori. Se un genitore o un tutore crede che il
              nostro sito abbia nel suo database le informazioni personali di un
              bambino, vi preghiamo di contattarci immediatamente (utilizzando
              la mail fornita) e faremo di tutto per rimuovere tali informazioni
              il più presto possibile. Questa politica sulla privacy si applica
              solo alle nostre attività online ed è valida per i visitatori del
              nostro sito web e per quanto riguarda le informazioni condivise
              e/o raccolte. Questa politica non si applica a qualsiasi
              informazione raccolta in modalità offline o tramite canali diversi
              da questo sito web.
            </v-card-text>
            <v-card-title>
              <span>Consenso</span>
            </v-card-title>
            <v-card-text>
              Usando il nostro sito web, acconsenti alla nostra politica sulla
              privacy e accetti i suoi termini. Se desideri ulteriori
              informazioni o hai domande sulla nostra politica sulla privacy non
              esitare a contattarci.
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" text @click="dialog = false"> OK </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { router } from "../../router";
import { checkExist } from "../../service/auth";
import message from "../../locales/en";

export default {
  name: "PagesRegister",

  components: {
    PagesBtn: () => import("./components/Btn"),
    PagesHeading: () => import("./components/Heading"),
  },

  data: () => ({
    message: message,
    loading: false,
    name: "",
    email: "",
    password: "",
    token: "",
    rules: {
      required: (value) => !!value || "Obbligatorio!",
      min: (v) => v.length >= 6 || "Minimo 6 caratteri!",
      email: (e) => /^\S+@\S+\.\S+$/.test(e) || "E-mail non valida!",
      emailMatch: () => "L'e-mail e la password che hai inserito non corrispondono!",
    },
    dialog: false,
    fl: false,
    sections: [
      {
        icon: "mdi-bell-ring",
        iconColor: "green",
        title: "Avviso!",
        text:
          "Notifica personalizzabile per registrare la temperatura delle tue celle.",
      },
      {
        icon: "mdi-file-document-multiple-outline",
        title: "Reports Personalizzabili   ",
        text:
          "Scarica in tempo reale i tuoi reports in formato csv, pdf o excel.",
        iconColor: "#fff",
      },
      {
        icon: "mdi-lock",
        iconColor: "#4286f4",
        title: "Massima sicurezza !",
        text: " I vostri dati sono protetti e al sicuro nei migliori provider.",
      },
    ],
    socials: [
      {
        href: "#",
        icon: "mdi-twitter",
        iconColor: "#1DA1F2",
      },
      {
        href: "#",
        icon: "mdi-dribbble",
        iconColor: "#ea4c89",
      },
      {
        href: "#",
        icon: "mdi-facebook",
        iconColor: "#3B5998",
      },
    ],
  }),

  methods: {
    onRegister() {
      this.loading = true;
      checkExist({
        name: this.name,
        email: this.email,
        password: this.password,
      })
        .then((res) => {
          this.loading = false;
          let data = res.data;
          if (data.statusCode !== 201) {
            this.token = data.data.token;
            router.push(`/verify/${data.data.token}`);
          } else {
            let snackbarVal = {
              snackbar: true,
              text: message.failed,
              type: "error",
            };
            this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
          }
        })
        .catch((e) => {
          this.loading = false;
          let snackbarVal = {
            snackbar: true,
            text: message.failed,
            type: "error",
          };
          this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
        });
    },
  },
};
</script>

<style lang="sass">
#register
  .v-list-item__subtitle
    -webkic-line-clamp: initial
    -webkit-box-orient: initial
</style>
<style lang="css">
@font-face {
  font-family: "montserrat-thin";
  src: url("../../assets/font/Montserrat/Montserrat-Thin.ttf")
    format("truetype");
  src: url("../../assets/font/Montserrat/Montserrat-Bold.ttf")
    format("truetype");
  font-weight: 400;
  font-style: normal;
}
.ff-mon-t {
  font-family: "montserrat-thin";
  font-weight: 400;
}
.fon-bold {
  font-family: "montserrat-thin";
  font-weight: 700 !important;
}
.text-green {
  font-family: "montserrat-thin" !important;
  color: green !important;
}

</style>
