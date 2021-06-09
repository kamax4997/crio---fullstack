<template>
  <v-container
    id="purchase"
    fluid
    tag="section"
    class="pa-5"
  >
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <v-card
          class="v-card--plan mx-auto pt-3 pb-4 px-2 text-center"
          max-width="80%" height="90%"
        >
          <div
            class="body-2 text-uppercase grey--text"
            v-text="plan.heading"
          />

          <v-avatar
            size="130"
          >
            <v-icon
              color="success"
              size="64"
            >
              mdi-fan-plus
            </v-icon>
          </v-avatar>

          <h2
            class="display-2 font-weight-light"
            v-text="plan.title"
          />
          <div style=" max-height: 50px;">
            <v-card-text
              class="body-1 font-weight-light pa-1  "
              v-text="plan.text"
            />
          </div>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <v-card v-if="success" outlined height="90%" class="v-card--plan mx-auto pt-3 pb-4 px-2 text-center"
                max-width="80%">
          <v-card-text class="success white--text text-md-center">{{messages.successPurchase}}</v-card-text>
          <v-list class="transparent">
            <v-list-item
            >
              <div>
                <v-list-item-title>
                  {{resItem.name}}
                </v-list-item-title>
                <v-list-item-subtitle class="mt-2">
                  {{resItem.description}}
                </v-list-item-subtitle>
              </div>
              <v-list-item-subtitle class="text-right">
                €{{resItem.price}}EUR
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list class="transparent" v-if="resVoucher">
            <v-list-item
            >
              <div>
                <v-list-item-title>
                  {{resVoucher.name}}
                </v-list-item-title>
                <v-list-item-subtitle class="mt-2">
                  {{resVoucher.description}}
                </v-list-item-subtitle>
              </div>
              <v-list-item-subtitle class="text-right">
                €{{resVoucher.price}}EUR
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list class="transparent">
            <v-list-item
            >
              <v-list-item-title class="text-right">
                Total
              </v-list-item-title>
              <v-list-item-subtitle class="text-right">
                €{{totalAmount}}EUR
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item class="justify-end">
              <v-btn class="mx-2" fab dark small color="primary" to="/dashboard/purchase">
                <v-icon dark>mdi-keyboard-return</v-icon>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-card>
        <v-row v-else>
          <v-col
            cols="12"
            md="6"
          >
            <v-card-text class="success--text">
              {{messages.payWithPaypal}}
            </v-card-text>
            <v-row>
              <v-col
                cols="12"
                sm="12"
              >
                <v-checkbox
                  v-model="voucherExist"
                  :label="messages.checkVoucher"
                  color="success"
                />
                <v-text-field
                  v-if="voucherExist"
                  :label="messages.voucherCode"
                  color="primary"
                  :error-messages="errorMessage"
                  v-model="voucherCode"
                  @input="invalid = false">
                  <template v-slot:append>
                    <v-btn
                      depressed
                      tile
                      color="primary"
                      class="ma-0"
                      :loading="loadingBtn"
                      @click="applyVoucherCode">
                      {{messages.apply}}
                    </v-btn>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="8"
              >
                <div id="paypal-button"></div>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-card-text class="success--text">
              {{messages.payStripe}}
            </v-card-text>
            <v-row>
              <v-col
                cols="12"
                sm="12"
              >
                <v-checkbox
                  v-model="voucherExist2"
                  :label="messages.checkVoucher"
                  color="success"
                />
                <v-text-field
                  v-if="voucherExist2"
                  :label="messages.voucherCode"
                  color="primary"
                  :error-messages="errorMessage2"
                  v-model="voucherCode2"
                  @input="invalid2 = false">
                  <template v-slot:append>
                    <v-btn
                      depressed
                      tile
                      color="primary"
                      class="ma-0"
                      :loading="loadingBtn2"
                      @click="applyVoucherCode2">
                      {{messages.apply}}
                    </v-btn>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            <form>
              <v-row>
                <v-col
                  cols="12"
                  sm="8"
                >
                  <v-row>
                    <v-col>
                      <div ref="card"></div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-btn class="ma-2" width="100%" @click="payWithStripe" rounded outlined
                             color="success" :loading="loadingStripeBtn">
                        {{messages.payStripe}}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog
      v-model="checkoutDlg"
      persistent
      width="500"
    >
      <v-card outlined height="90%" class="v-card--plan mx-auto pt-3 pb-4 px-2 text-center"
              max-width="100%">
        <!--        <v-card-text class="success white--text text-md-center">{{messages.successPurchase}}</v-card-text>-->
        <v-list class="transparent">
          <v-list-item
          >
            <div>
              <v-list-item-title class="text-left">
                {{plan.heading}}
              </v-list-item-title>
              <v-list-item-subtitle class="mt-2">
                {{plan.text}}
              </v-list-item-subtitle>
            </div>
            <v-list-item-subtitle class="text-right">
              € {{planData.price}}EUR
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list class="transparent">
          <v-list-item
          >
            <div>
              <v-list-item-title class="text-left">
                {{stripeVCode.description}}
              </v-list-item-title>
              <v-list-item-subtitle class="mt-2">
                {{stripeVCode.percentage}} % Off
              </v-list-item-subtitle>
            </div>
            <v-list-item-subtitle class="text-right">
              € -{{(parseFloat(planData.price) * parseFloat(stripeVCode.percentage) / 100).toFixed(2)}}EUR
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list class="transparent">
          <v-list-item
          >
            <v-list-item-title class="text-right">
              Total
            </v-list-item-title>
            <v-list-item-subtitle class="text-right">
              €{{parseFloat(planData.price).toFixed(2) - (parseFloat(planData.price) * parseFloat(stripeVCode.percentage) / 100).toFixed(2)}}EUR
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item class="justify-end">
            <v-btn class="mx-2" dark small color="primary" :loading="checkoutBtn" @click="checkoutWithVCode">
              {{messages.checkout}}
            </v-btn>
            <v-btn class="mx-2" dark small color="error" @click="closeCheckout">
              {{messages.cancel}}
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import { periodTitle, paymentInfo } from '../../service/config'
  import messages from '../../locales/en'
  import {
    mapState,
  } from 'vuex'
  import moment from 'moment'
  import { getMainPackageByID, getMainPackages } from '../../service/packages'
  import {
    createPaymentWithPaypal,
    executePayWithPaypal,
    executePayWithStripe,
    verifyVoucherCode, verifyVoucherCodeStripe,
  } from '../../service/paymentService'
  import { router } from '../../router'

  // let stripe = Stripe(`pk_test_51HDpb6BE9q7fomtlvcHN87GHvMwpDgbT8N1aKLUB5NyExTxkfo6NW9Nc77PzlQBV6sQbWw92HKgyfDXyE8zYBKd900toLJFa79`),
  let stripe = Stripe(paymentInfo.stripeDevAppId),
    elements = stripe.elements(),
    card = undefined

  export default {
    name: 'Checkout',

    components: {
      PagesBtn: () => import('./component/Btn'),
    },
    data () {
      return {
        messages: messages,
        rules: {
          multiSelRequired: v => v.length > 0 || 'Obbligatorio.',
        },
        plan: {
          /*heading: 'Formula Platinium',
          title: '35.99€',
          text: 'Catene, Supermercati, Franchising con più di 31 frigoriferi',*/
        },
        voucherExist: false,
        voucherCode: '',
        invalid: false,
        loadingBtn: false,
        voucherExist2: false,
        voucherCode2: '',
        invalid2: false,
        loadingBtn2: false,
        loadingStripeBtn: false,
        vtoken2: '',
        success: false,
        resItem: {
          name: '',
          description: '',
          price: '',
        },
        resVoucher: null,
        totalAmount: '',

        checkoutDlg: false,
        stripeVCode: {},
        stripeToken: '',
        planData: {},
        checkoutBtn: false,
      }
    },

    computed: {
      ...mapState(['allGlobalFridges']),
      fridges () {
        return this.$store.state.allGlobalFridges.filter(item => item.active)
      },
      errorMessage () {
        return this.invalid ? messages.invalidVoucher : ''
      },
      errorMessage2 () {
        return this.invalid2 ? messages.invalidVoucher : ''
      },
      stripeStyle () {
        let style = {
          base: {
            border: '2px solid red',
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
          },
        }
        return style
      },
    },

    async mounted () {
      try {
        this.renderPaypalBtn()
        card = elements.create('card', this.stripeStyle)
        card.mount(this.$refs.card)

        let pID = router.history.current.params.id
        // console.log(pID)
        this.$store.commit('SHOW_OVER_LAY', true)
        let token = localStorage.getItem('token')
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        let uID = currentUser._id
        let res = await getMainPackageByID({
          token,
          pID,
        })
        let planData = res.data.data
        this.planData = planData;
        // console.log(this.planData)
        let tmpItem = {
          heading: planData.packageName,
          title: planData.price + '€',
          text: planData.numberFridges + ' Frighi/Celle ' + planData.periodQty + ' ' + periodTitle[planData.periodUnit],
          _id: planData._id,
        }
        // console.log(res, tmpItem)
        this.plan = tmpItem
        this.$store.commit('SHOW_OVER_LAY', false)
      } catch (e) {
        console.log(e)
        this.$store.commit('SHOW_OVER_LAY', false)
      }
    },

    beforeDestroy () {
      card.destroy(this.$refs.card)
    },

    methods: {
      async applyVoucherCode () {
        this.loadingBtn = true
        try {
          let token = localStorage.getItem('token')
          let code = this.voucherCode
          let res = await verifyVoucherCode({
            token,
            code,
          })
          this.vtoken = res.data.data
          let snackbarVal = {
            snackbar: true,
            text: messages.success,
            type: 'success',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
          this.loadingBtn = false
        } catch (e) {
          this.loadingBtn = false
          this.invalid = true
        }
      },

      async applyVoucherCode2 () {
        this.loadingBtn2 = true
        try {
          let token = localStorage.getItem('token')
          let code = this.voucherCode2
          let res = await verifyVoucherCodeStripe({
            token,
            code,
          })
          this.vtoken2 = res.data.data.token;
          this.stripeVCode = res.data.data.vCode;
          // console.log(res.data.data, this.stripeVCode)
          let snackbarVal = {
            snackbar: true,
            text: messages.success,
            type: 'success',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
          this.loadingBtn2 = false
        } catch (e) {
          this.loadingBtn2 = false
          this.invalid2 = true
        }
      },

      renderPaypalBtn () {
        let that = this
        paypal.Button.render({
          // Configure environment
          env: 'sandbox',
          client: {
            // sandbox: 'AQ4cbpmlGDKNz3iDpDvFAoiGFhfS73UZJiHBjRBRZ1FLQblD1fBv6R4HYjjjXdrVj-ka39NUXkTUQAvV',
            sandbox: paymentInfo.paypalSandbox,
            production: 'demo_production_client_id',
          },
          // Customize button (optional)
          locale: 'it_IT',
          style: {
            size: 'responsive',
            color: 'white',
            shape: 'pill',
            label: 'pay',
            layout: 'horizontal',
            width: '600px',
          },

          // Enable Pay Now checkout flow (optional)
          commit: true,

          // Set up a payment
          payment: function (data, actions) {
            let token = localStorage.getItem('token')
            let _id = that.plan._id
            let vtoken
            if (that.voucherExist && that.invalid) {
              let snackbarVal = {
                snackbar: true,
                text: messages.invalidVoucher,
                type: 'error',
              }
              that.$store.commit('SHOW_SNACK_BAR', snackbarVal)
              return null
            }
            if (that.voucherExist) {
              vtoken = that.vtoken
            } else {
              vtoken = ''
            }
            // let vtoken = that.vtoken;
            return createPaymentWithPaypal({
              token,
              _id,
              vtoken,
            }).then(res => {
              // console.log(res)
              return res.data.data.id
            })
          },
          // Execute the payment
          onAuthorize: function (data, actions) {
            // console.log(data)
            let token = localStorage.getItem('token')
            let currentUser = JSON.parse(localStorage.getItem('currentUser'))
            let uID = currentUser._id
            let _id = that.plan._id
            let tmpData = {
              ...data,
              uID,
              _id,
            }
            // console.log(tmpData)
            executePayWithPaypal({
              token,
              data: tmpData,
            }).then((res) => {
              // console.log(res.data.data.transactions[0], res.data.data.transactions[1])
              that.totalAmount = res.data.data.transactions[0].amount.total
              that.resItem = res.data.data.transactions[0].item_list.items[0]
              if (that.voucherExist) that.resVoucher = res.data.data.transactions[0].item_list.items[1]
              let snackbarVal = {
                snackbar: true,
                text: messages.success,
                type: 'success',
              }
              that.$store.commit('SHOW_SNACK_BAR', snackbarVal)
              that.success = true
            }).catch(e => {
              let snackbarVal = {
                snackbar: true,
                text: messages.failed,
                type: 'error',
              }
              that.$store.commit('SHOW_SNACK_BAR', snackbarVal)
              console.log(e)
            })
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              alert('Transaction completed by ' + details.payer.name.given_name + '!')
            })
          },
        }, '#paypal-button')
      },

      async payWithStripe () {
        let that = this
        // that.loadingStripeBtn = true
        /*let sessionId = 'cs_test_By3SwshOvMk0bypA0Iwof8wdRAS94YCDk4Rp4OosvDDr58eaegrHNSB4';
        const {error} = await stripe.redirectToCheckout({sessionId});
        console.log(error)*/
        // this.success = true
        // that.checkoutDlg = true;
        if (that.voucherExist2 && that.invalid2) {
          let snackbarVal = {
            snackbar: true,
            text: messages.invalidVoucher,
            type: 'error',
          }
          that.$store.commit('SHOW_SNACK_BAR', snackbarVal)
          return
        }
        that.loadingStripeBtn = true
        stripe.createToken(card).then((result) => {
          // Access the token with result.token
          // console.log(result)
          if (result.error) {
            that.hasCardErrors = true
            that.$forceUpdate() // Forcing the DOM to update so the Stripe Element can update.
            that.loadingStripeBtn = false
            return
          }
          let stripeToken = result.token.id
          // console.log(stripeToken)
          let token = localStorage.getItem('token')
          let currentUser = JSON.parse(localStorage.getItem('currentUser'))
          let uID = currentUser._id
          let _id = that.plan._id
          let vtoken
          if (that.voucherExist2 && !this.invalid2) {
            vtoken = that.vtoken2
            that.stripeToken = stripeToken;
            that.checkoutDlg = true;
          } else {
            vtoken = ''
            that.executeStripe (token,
              stripeToken,
              vtoken,
              _id,
              uID)
          }
          /*executePayWithStripe({
            token,
            stripeToken,
            vtoken,
            _id,
            uID,
          }).then(res => {
            console.log(res)
            let resData = res.data.data;
            that.totalAmount = resData.totalPrice;
            that.resItem = resData.packageItem;
            if(that.voucherExist2) that.resVoucher = resData.voucherItem;
            that.success = true;
            that.loadingStripeBtn = false
            let snackbarVal = {
              snackbar: true,
              text: messages.success,
              type: 'success',
            }
            that.$store.commit('SHOW_SNACK_BAR', snackbarVal)
          }).catch(e => {
            console.log(e)
            that.loadingStripeBtn = false
            let snackbarVal = {
              snackbar: true,
              text: messages.failed,
              type: 'error',
            }
            that.$store.commit('SHOW_SNACK_BAR', snackbarVal)
          })*/
        })
      },

      checkoutWithVCode(){
        let token = localStorage.getItem('token')
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        let uID = currentUser._id
        let _id = this.plan._id
        let vtoken = this.vtoken2;
        let stripeToken = this.stripeToken;
        this.checkoutBtn = true;
        this.executeStripe (token,
          stripeToken,
          vtoken,
          _id,
          uID)
      },

      closeCheckout(){
        this.loadingStripeBtn = false;
        this.checkoutBtn = false;
        this.checkoutDlg = false;
      },

      executeStripe (token,
                     stripeToken,
                     vtoken,
                     _id,
                     uID) {
        executePayWithStripe({
          token,
          stripeToken,
          vtoken,
          _id,
          uID,
        }).then(res => {
          // console.log(res)
          let resData = res.data.data
          this.totalAmount = resData.totalPrice
          this.resItem = resData.packageItem
          if (this.voucherExist2) this.resVoucher = resData.voucherItem
          this.success = true
          this.loadingStripeBtn = false

          this.checkoutBtn = false;
          this.checkoutDlg = false;

          let snackbarVal = {
            snackbar: true,
            text: messages.success,
            type: 'success',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
        }).catch(e => {
          console.log(e)
          this.loadingStripeBtn = false

          this.checkoutBtn = false;
          this.checkoutDlg = false;

          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: 'error',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
        })
      },
    },
  }
</script>

<style lang="sass">
  .v-card--plan
    width: 100%

    .v-avatar
      border-radius: 50%
      border: 1px solid #E5E5E5

    .plan-btn
      width: 100%
</style>

<style scoped>
  .StripeElement {
    box-sizing: border-box;

    height: 40px;

    padding: 10px 12px;

    border: 1px solid transparent;
    border-radius: 4px;
    background-color: white;

    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }

  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  .StripeElement--invalid {
    border-color: #fa755a;
  }

  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }

  .hide {
    visibility: hidden;
  }
</style>
