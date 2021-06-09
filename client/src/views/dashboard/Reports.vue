<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row>
      <v-dialog v-model="expiredModal" persistent max-width="370">

        <v-card>
          <v-card-title class="headline">Opss...</v-card-title>
          <v-card-text
          >Il vostro free test è scaduto. Clicca su Attiva Nuovo per acquistare il pacchetto desiderato.
          </v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="clickOk()"> Attiva Nuovo</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-col cols="12" sm="6">
        <!-- //example with dialog -->
        <v-dialog v-model="dialog" max-width="400px" :persistent="loadingBtn">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              style="
                background: white !important;
                color: black !important;
                border: 1px solid black !important;
              "
              outlined
              color="cut-btn"
              dark
              @click="openEmailDlg"
            >
              {{ messages.sendEmail }}
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ messages.sendReportEmail }}</span>
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <!--<v-file-input
                        v-model="reportFile"
                        :rules="[rules.required]"
                        :label="messages.importReportFile"
                        prepend-icon="mdi-file"
                        chips
                      />-->
                      <v-select
                        v-model="filetype"
                        :items="filetypes"
                        :rules="[rules.required]"
                        :label="messages.filetype"
                        outlined
                        required
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="emailAddress"
                        :rules="[rules.required, rules.email]"
                        :label="messages.email"
                        prepend-icon="mdi-email"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <!-- <small>*indicates required field</small> -->
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="blue darken-1" text @click="dialog = false">
                {{ messages.cancel }}
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="sendEmail"
                :loading="loadingBtn"
              >
                {{ messages.sendEmail }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col/>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="4">
        <div class="shadow-box">
          <base-material-card icon="mdi-calendar-search" color="blue">
            <template v-slot:after-heading>
              <div class="card-title mt-2">GENERA REPORTS</div>
            </template>

            <v-form v-model="valid" ref="form" lazy-validation>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="selectedFridges"
                      :items="allFridges"
                      item-text="name"
                      item-value="_id"
                      :rules="[rules.counter]"
                      :menu-props="{ top: true, offsetY: true }"
                      chips
                      label="Frigoriferi"
                      multiple
                      outlined
                    >
                      <template v-slot:prepend-item>
                        <v-list-item ripple @click="toggle">
                          <v-list-item-action>
                            <v-icon
                              :color="
                              selectedFridges.length > 0
                                ? 'indigo darken-4'
                                : ''
                            "
                            >
                              {{ icon }}
                            </v-icon>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title
                            >Tutti i frigoriferi
                            </v-list-item-title
                            >
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider class="mt-2"/>
                      </template>
                    </v-select>
                  </v-col>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="dateRangeText"
                        label="Intervallo data selezionato"
                        prepend-icon="mdi-calendar"
                        hint="YYYY/MM/DD "
                        :show-current="datess"
                        disabled
                      />
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-date-picker
                        v-model="dates"
                        range
                        :selected-items-text="messages.dateSelected"
                        locale="it-it"
                        :min="minDate"
                        :allowed-dates="disablePastDates"
                      />
                    </v-col>
                  </v-row>
                  <v-col cols="12" class="text-right">
                    <v-btn color="blue" class="mr-0 roudi" @click="loadHistory">
                      GENERA REPORT
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </base-material-card>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <div class="shadow-box">
          <base-material-card
            color="blue"
            icon="mdi-clipboard-text"
            inline
            class="px-5 py-3"
          >
            <!--<template v-slot:after-heading>
              <div class="display-2 font-weight-light">
                Frigo 1 Belluno Rapporti
              </div>
              <v-btn class="mx-2" fab dark small color="pink">
                <v-icon dark>mdi-heart</v-icon>
              </v-btn>
            </template>-->

            <template v-slot:after-heading>
              <v-row>
                <v-col cols="12" md="6">

                  <div
                    class="display-2"
                    style="
                    font-family: 'montserrat' !important;
                    font-weight: 700 !important;
                  "
                  >
                    Frigo Reports
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  class="d-flex justify-end"
                  style="padding: 0 !important"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        outlined
                        color="success"
                        v-bind="attrs"
                        v-on="on"
                        @click="exportCSV"
                      >
                        <v-icon dark>mdi-file-excel-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ messages.exportCSV }}</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        outlined
                        color="pink"
                        v-bind="attrs"
                        v-on="on"
                        @click="exportPDF"
                      >
                        <v-icon dark>mdi-file-pdf-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ messages.exportPDF }}</span>
                  </v-tooltip>

                </v-col>
              </v-row>
            </template>

            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              class="ml-auto"
              label="Search"
              hide-details
              single-line
              style="max-width: 250px"
            />

            <v-divider class="mt-3"/>

            <v-data-table
              :headers="headers"
              :items="tableRows"
              :search.sync="search"
              :sort-desc="[false, true]"
              :hide-default-header="true"
              :disable-sort="false"
              :must-sort="true"
              :footer-props="{ itemsPerPageOptions: [10, 20, 31] }"
            >

              <template v-slot:header>
                <thead>
                <tr>
                  <th v-for="(item, i) in dynamicHeaders1" :key="i">
                    {{ item }}
                  </th>
                </tr>
                <tr>
                  <th v-for="(item, i) in dynamicHeaders2" :key="i">
                    {{ item }}
                  </th>
                </tr>
                </thead>
              </template>
              <template v-slot:body="{ items }">
                <tbody class="tbody">
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ item.DATE }}</td>
                  <td v-for="(f, i) in selectedFridgeItems" :key="i">
                    {{ item[f.name] }}
                  </td>
                </tr>
                </tbody>
              </template>
            </v-data-table>
          </base-material-card>
        </div>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  import messages from "../../locales/en";
  import {getFridgeHistory, sendReportByEmail} from "../../service/analytics";
  import {getAllFridges} from "../../service/fridge";
  import {getMainPackages} from "../../service/packages";
  import jsPDF from "jspdf";
  import * as FileSaver from "file-saver";
  import * as XLSX from "xlsx";
  import "jspdf-autotable";
  import moment from "moment";

  export default {
    //
    name: "Reports",
    // data(){

    //       return{
    //           isExpired: false,
    //           expiredModal: true,
    //           subscriptionDate: "",
    //           expireDate: "",
    //     }
    // },
    data: () => ({
      minDate: "2020-10-01",
      isExpired: false,
      expiredModal: false,
      subscriptionDate: "",
      expireDate: "",
      messages: messages,
      rules: {
        counter: (value) => value.length <= 8 || messages.reportMax,
        email: (e) => /^\S+@\S+\.\S+$/.test(e) || messages.invalidEmail,
        required: (value) => !!value || messages.validRequired,
      },
      // valid: false,
      headers: [
        {
          text: "Data",
          // value: 'date1',
        },
        {
          text: "Name",
          // value: 'name1',
        },
        {
          text: "Note",
          // value: 'note1',
        },
        {
          text: "Status",
          // value: 'status1',
        },
      ],

      dynamicHeaders1: [""],
      dynamicHeaders2: ["DATA"],
      tableRows: [],

      search: undefined,
      allFridges: [],
      history: [],
      // selectedFridges: [],
      // dates: [new Date().toISOString().substr(0, 10)],
      dates: [moment().format("YYYY-MM-DD").substr(0, 10)],
      datess: ["yyyy/mm/dd", "yyyy/mm/dd"],

      // dates1 : retdaterange(),
      // date: new Date().toISOString().substr(0, 10),
      date: moment().format("YYYY-MM-DD").substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      items: [
        /*'Frigo1Belluno',
          'Frigo2Dolomitti',
          'FrigoBelluno',
          'Frigo4Belluno',
          'Frigo5Dolomitti',
          'Frigo6FDolomiti',
          'Frigo7Belluno',
          'Frigo8Dolomitti'*/
      ],
      selectedFridges: [],
      selectedFridgeItems: [],
      reportFile: null,
      emailAddress: "",
      dialog: false,
      valid: false,
      loadingBtn: false,
      pdfFile: null,
      csvFile: null,
      filetypes: ["CSV", "PDF"],
      filetype: null,
      filename: "",
      base64Img:
        "data:image/png;base64,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",
    }),

    computed: {
      dateRangeText() {
        let tmp = [];
        this.dates.forEach((pItem) => {
          tmp.push(moment(pItem).format("DD/MM/YYYY"));
        });
        return tmp.join(" ~ ");
        // return this.dates.join(' ~ ')
      },
      likesAllFruit() {
        return this.selectedFridges.length === this.allFridges.length;
      },
      likesSomeFruit() {
        return this.selectedFridges.length > 0 && !this.likesAllFruit;
      },
      icon() {
        if (this.likesAllFruit) return "mdi-close-box";
        if (this.likesSomeFruit) return "mdi-minus-box";
        return "mdi-checkbox-blank-outline";
      },
    },

    async mounted() {
      // getFridgeHistory()
      this.$store.commit("SHOW_OVER_LAY", true);
      try {
        let token = localStorage.getItem("token");
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let uID = currentUser._id;
        let res = await getAllFridges({
          token,
          uID,
        });
        this.allFridges = res.data.data;
        // console.log(res.data.data)
        /*this.selectedFridges.push(this.allFridges[0]._id);
        let data = {
          dates: this.dates,
          fridges: this.selectedFridges,
          uID: uID,
        };
        res = await getFridgeHistory({
          token,
          data,
        });
        this.history = res.data.data;
        this.makeFormattedHistory();*/
        this.$store.commit("SHOW_OVER_LAY", false);
      } catch (e) {
        this.$store.commit("SHOW_OVER_LAY", false);
      }
      //  this is where checking of the package is done
      let token = localStorage.getItem("token");
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let uID = currentUser._id;
      let res1 = await getMainPackages({
        token,
        uID,
      });
      let mainPackages = res1.data.data.packages;
      let curPackage = res1.data.data.curPackage;
      // console.log(res);

      this.subscriptionDate = moment(curPackage.createdAt).format("YYYY/MM/DD");
      this.expireDate = moment(curPackage.endDate).format("YYYY/MM/DD");

      let a = new Date(Date.now());
      a = moment(a).format("YYYY/MM/DD");
      // console.log('today: ' +a );
      // console.log("package ends at :"+ this.expireDate);


      if (a >= this.expireDate) {
        this.isExpired = true;

      }
      //console.log(this.isExpired)
      this.expiredModal = this.isExpired;


    },

    methods: {
      disablePastDates(val) {

        return val <= new Date().toISOString().substr(0, 10)

      },
      clickOk() {
        this.expiredModal = true;
        this.$router.push("purchase");
      },
      toggle() {
        this.$nextTick(() => {
          // console.log(this.selectedFridges.length)
          if (this.selectedFridges.length) {
            this.selectedFridges = [];
          } else {
            // this.selectedFridges = this.allFridges.slice()
            let tmp = this.allFridges.slice();
            tmp.forEach((item) => {
              this.selectedFridges.push(item._id);
            });
          }
        });
      },

      async loadHistory() {
        this.$refs.form.validate();
        if (!this.$refs.form.validate()) {
          return false;
        }
        this.$store.commit("SHOW_OVER_LAY", true);
        try {
          let token = localStorage.getItem("token");
          let currentUser = JSON.parse(localStorage.getItem("currentUser"));
          let uID = currentUser._id;
          let data = {
            dates: this.dates,
            fridges: this.selectedFridges,
            uID: uID,
          };
          // console.log(data);
          let res = await getFridgeHistory({
            token,
            data,
          });
          this.history = res.data.data;
          this.makeFormattedHistory();
          this.$store.commit("SHOW_OVER_LAY", false);
        } catch (e) {
          this.$store.commit("SHOW_OVER_LAY", false);
        }
      },

      makeFormattedHistory() {
        let fridgeHistory = this.history;
        let aFridges = this.getSelectedFridges(this.selectedFridges);
        this.selectedFridgeItems = this.getSelectedFridges(this.selectedFridges);
        if (!aFridges) return;
        let i = 0;
        let formattedHistory = [];
        while (i < fridgeHistory.length) {
          let tmp = {};
          tmp["DATE"] = fridgeHistory[i].date;
          aFridges.forEach((f) => {
            tmp[f.name] = fridgeHistory[i].status;
            i++;
          });
          formattedHistory.push(tmp);
        }
        this.tableRows = formattedHistory;
        let tmpHeader1 = [""];
        let tmpHeader2 = ["DATE"];
        aFridges.forEach((f) => {
          tmpHeader1.push(f.name);
          tmpHeader2.push(f.typeTitle);
        });
        this.dynamicHeaders1 = tmpHeader1;
        this.dynamicHeaders2 = tmpHeader2;
      },

      exportCSV() {
        let fridgeHistory = this.history;
        let aFridges = this.getSelectedFridges(this.selectedFridges);
        if (!aFridges) return;
        let i = 0;
        let formattedHistory = [];
        // console.log(fridgeHistory.length);
        while (i < fridgeHistory.length - 1) {
          let tmp = {};
          tmp["DATE"] = fridgeHistory[i].date;
          aFridges.forEach((f) => {
            // console.log(i, fridgeHistory[i]);
            tmp[f.name] = fridgeHistory[i].status;
            i++;
          });
          formattedHistory.push(tmp);
        }
        // console.log(formattedHistory)
        let fileName = "Report  " + this.dateRangeText;
        this.filename = fileName;
        let fileType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let fileExtension = ".csv";
        const ws = XLSX.utils.json_to_sheet(formattedHistory);
        // console.log(fridgeHistory, ws)
        const wb = {
          Sheets: {data: ws},
          SheetNames: ["data"],
        };
        const excelBuffer = XLSX.write(wb, {
          bookType: "csv",
          type: "array",
        });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
        this.csvFile = data;
      },

      exportPDF() {
        /////////
        let fridgeHistory = this.history;
        // let aFridges = this.selectedFridges;
        let aFridges = this.getSelectedFridges(this.selectedFridges);
        if (!aFridges) return;
        let i = 0;
        let formattedHistory = [];
        while (i < fridgeHistory.length) {
          let tmp = {};
          tmp["DATA"] = fridgeHistory[i].date;
          aFridges.forEach((f) => {
            tmp[f.name] = fridgeHistory[i].status;
            i++;
          });
          formattedHistory.push(tmp);
        }
        let tmpHeader1 = [""];
        aFridges.forEach((f) => {
          tmpHeader1.push(f.name);
        });
        let tmpHeader2 = ["DATA"];
        aFridges.forEach((f) => {
          tmpHeader2.push(f.typeTitle);
        });
        /////////

        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Report  " + this.dateRangeText;
        this.filename = title;
        // const headers = [['Date', 'Name', 'Note', 'Status']]
        const headers = [tmpHeader1, tmpHeader2];

        // const data = this.history.map(elt => [elt.date, elt.name, elt.note, elt.status])
        const data = formattedHistory.map((elt) => {
          let tmp = [elt["DATA"]];
          aFridges.forEach((f) => {
            tmp.push(elt[f.name]);
          });
          return tmp;
        });

        var f1 = `La spunta "ATTIVO" registra là conformità con il range di temperatura ideale indicato.`;
        var f2 = `Temperature limite, limiti critici e azioni correttive eventuali sono riportati sul piano di autocontrollo aziendale.`;
        var f3 = `La dicitura "RIORDINO/PULIZIA" non prevede una variazione delle temperature di riferimento,`;
        var f4 = `non si prevedono perciò azione correttive.`;
        let content = {
          startY: 50,
          head: headers,
          body: data,
          //  headStyles: { fillColor: [155, 89, 182] }, // Purple
          didDrawPage: function (data) {
            // Header
            doc.setFontSize(13);
            doc.setTextColor(82, 81, 81);
            // doc.text(title, data.settings.margin.right + 95, 42);

            doc.setFontSize(10);

            // jsPDF 1.4+ uses getWidth, <1.4 uses .width
            var pageSize = doc.internal.pageSize;
            var pageHeight = pageSize.height
              ? pageSize.height
              : pageSize.getHeight();
            //   var splitTitle = doc.splitTextToSize(f1, 180);
            // doc.text(150, 20, splitTitle, pageHeight - 40);
            doc.text(f1, data.settings.margin.left, pageHeight - 50);
            doc.text(f2, data.settings.margin.left, pageHeight - 40);
            doc.text(f3, data.settings.margin.left, pageHeight - 30);
            doc.text(f4, data.settings.margin.left, pageHeight - 20);
          },
          margin: {top: 30},
        };
        if (this.base64Img) {
          doc.addImage(this.base64Img, "JPEG", marginLeft, 25, 100, 20);
        }
        doc.text(title, 155, 45);

        doc.autoTable(content);

        // doc.addPage();
        // doc.autoTable(content)
        let fileName = "Report  " + this.dateRangeText + ".pdf";
        doc.save(fileName);

        this.pdfFile = doc.output("blob");
        // this.reportFile = new Blob([doc.output('blob')], {type: 'application/pdf'});
      },

      openEmailDlg() {
        this.dialog = true;
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.emailAddress = currentUser.email;
      },

      async sendEmail() {
        try {
          // console.log(typeof this.reportFile, this.emailAddress)
          this.$refs.form.validate();
          if (!this.$refs.form.validate()) {
            return false;
          }

          // let file = this.reportFile

          let file = null;
          if (this.filetype === "PDF") {
            this.generatePDFFile('email');
            file = this.pdfFile;
          }
          if (this.filetype === "CSV") {
            this.generateCSVFile('email');
            file = this.csvFile;
          }
          if (!file) {
            let snackbarVal = {
              snackbar: true,
              text: messages.requireReport,
              type: "info",
            };
            this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
            return;
          }
          let email = this.emailAddress;
          let data = new FormData();
          data.append("report", file);
          data.append("email", email);
          data.append("type", this.filetype);
          data.append("filename", this.filename);
          let token = localStorage.getItem("token");
          this.loadingBtn = true;
          await sendReportByEmail({
            token,
            data,
          });
          let snackbarVal = {
            snackbar: true,
            text: messages.success,
            type: "success",
          };
          this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
          this.loadingBtn = false;
          this.dialog = false;
        } catch (e) {
          console.log(e);
          this.loadingBtn = false;
          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: "error",
          };
          this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
        }
      },

      getSelectedFridges(ids) {
        let allFridges = this.allFridges;
        if (ids.length === 0 || allFridges.length === 0) return null;
        return allFridges.filter((f) => ids.includes(f._id));
      },

      generateCSVFile(type) {
        let fridgeHistory = this.history;
        let aFridges = this.getSelectedFridges(this.selectedFridges);
        if (!aFridges) return;
        let i = 0;
        let formattedHistory = [];
        // console.log(fridgeHistory.length);
        while (i < fridgeHistory.length - 1) {
          let tmp = {};
          tmp["DATA"] = fridgeHistory[i].date;
          aFridges.forEach((f) => {
            // console.log(i, fridgeHistory[i]);
            tmp[f.name] = fridgeHistory[i].status;
            i++;
          });
          formattedHistory.push(tmp);
        }
        // console.log(formattedHistory)
        let fileName = "Report " + this.dateRangeText;
        this.filename = fileName;
        let fileType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let fileExtension = ".csv";
        const ws = XLSX.utils.json_to_sheet(formattedHistory);
        // console.log(fridgeHistory, ws)
        const wb = {
          Sheets: {data: ws},
          SheetNames: ["data"],
        };
        console.log('data ==> ', ws, XLSX.utils.sheet_to_csv(wb))
        // if (type !== 'email')
        const excelBuffer = XLSX.write(wb, {
          bookType: "csv",
          type: "array",
        });
        this.csvFile = new Blob([excelBuffer], {type: fileType});
      },

      generatePDFFile(type) {

        let fridgeHistory = this.history;
        // let aFridges = this.selectedFridges;
        let aFridges = this.getSelectedFridges(this.selectedFridges);
        if (!aFridges) return;
        let i = 0;
        let formattedHistory = [];
        while (i < fridgeHistory.length) {
          let tmp = {};
          tmp["DATA"] = fridgeHistory[i].date;
          aFridges.forEach((f) => {
            tmp[f.name] = fridgeHistory[i].status;
            i++;
          });
          formattedHistory.push(tmp);
        }
        let tmpHeader1 = [""];
        aFridges.forEach((f) => {
          tmpHeader1.push(f.name);
        });
        let tmpHeader2 = ["DATA"];
        aFridges.forEach((f) => {
          tmpHeader2.push(f.typeTitle);
        });
        /////////

        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Report  " + this.dateRangeText;
        this.filename = title;
        // const headers = [['Date', 'Name', 'Note', 'Status']]
        const headers = [tmpHeader1, tmpHeader2];

        // const data = this.history.map(elt => [elt.date, elt.name, elt.note, elt.status])
        const data = formattedHistory.map((elt) => {
          let tmp = [elt["DATA"]];
          aFridges.forEach((f) => {
            tmp.push(elt[f.name]);
          });
          return tmp;
        });

        var f1 = `La spunta "ATTIVO" registra là conformità con il range di temperatura ideale indicato.`;
        var f2 = `Temperature limite, limiti critici e azioni correttive eventuali sono riportati sul piano di autocontrollo aziendale.`;
        var f3 = `La dicitura "RIORDINO/PULIZIA" non prevede una variazione delle temperature di riferimento,`;
        var f4 = `non si prevedono perciò azione correttive.`;
        let content = {
          startY: 50,
          head: headers,
          body: data,
          //  headStyles: { fillColor: [155, 89, 182] }, // Purple
          didDrawPage: function (data) {
            // Header
            doc.setFontSize(13);
            doc.setTextColor(82, 81, 81);
            // doc.text(title, data.settings.margin.right + 95, 42);

            doc.setFontSize(10);

            // jsPDF 1.4+ uses getWidth, <1.4 uses .width
            var pageSize = doc.internal.pageSize;
            var pageHeight = pageSize.height
              ? pageSize.height
              : pageSize.getHeight();
            //   var splitTitle = doc.splitTextToSize(f1, 180);
            // doc.text(150, 20, splitTitle, pageHeight - 40);
            doc.text(f1, data.settings.margin.left, pageHeight - 50);
            doc.text(f2, data.settings.margin.left, pageHeight - 40);
            doc.text(f3, data.settings.margin.left, pageHeight - 30);
            doc.text(f4, data.settings.margin.left, pageHeight - 20);
          },
          margin: {top: 30},
        };
        if (this.base64Img) {
          doc.addImage(this.base64Img, "JPEG", marginLeft, 25, 100, 20);
        }
        doc.text(title, 155, 45);

        doc.autoTable(content);

        // doc.addPage();
        // doc.autoTable(content)
        let fileName = "Report  " + this.dateRangeText + ".pdf";
        // doc.save(fileName);

        this.pdfFile = doc.output("blob");
      },
    },
  };
</script>
<style lang="css">
  .cut-btn {
    background: white !important;
    color: black !important;
    border: 1px solid black !important;
  }

  .ml-6 {
    width: 63% !important;
    font-family: "montserrat";
    font-weight: 700;
  }

  .roudi {
    border-radius: 20px;
  }

  .v-application .pa-7 {
    border-radius: 50%;
  }

  .via-email {
    color: green !important;
    font-size: 13px;
    margin-top: 15px;
  }

  @media (max-width: 500px) {
    .via-email {
      font-size: 11px;
    }
  }

  .via-email:hover {
    cursor: pointer;
  }

  .v-date-picker-table--date .v-btn {
    border-radius: 50% !important;
    height: 34px !important;
    width: 34px !important;
  }

  .ml-6 {
    width: 63% !important;
    font-family: "montserrat";
    font-weight: 700;
  }

  .roudi {
    border-radius: 20px;
  }

  .via-btn {
    border: 1px solid black;
    padding: 5px;
    color: black;
    border-radius: 4px;
    font-weight: 100;
  }

  .via-btn:hover {
    cursor: pointer;
  }
</style>
