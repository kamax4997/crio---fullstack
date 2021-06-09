<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <!--<base-v-component
      heading="Data Tables"
      link="components/data-tables"
    />-->
    <div class="justify-end d-flex">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="success"
            fab
            x-large
            dark
            v-bind="attrs"
            v-on="on"
            @click="createDialog = true"
          >
            <v-icon>mdi-account-multiple-plus-outline</v-icon>
          </v-btn>
        </template>
        <span>Add User</span>
      </v-tooltip>

    </div>

    <base-material-card
      color="success"
      icon="mdi-account-multiple-outline"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          {{messages.adminTableTitle}}
        </div>
      </template>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Search"
        hide-details
        single-line
        style="max-width: 250px;"
      />

      <v-divider class="mt-3"/>

      <v-data-table
        :headers="headers"
        :items="items"
        :search.sync="search"
        :hide-default-header="true"
        :disable-sort="false"
        :must-sort="true"
      >
        <template v-slot:header>
          <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Company</th>
            <th>Email</th>
            <th>Country</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
            <th>Enable/Disable</th>
          </tr>
          </thead>
        </template>
        <template v-slot:body="{ items }">
          <tbody>
          <tr v-for="item in items" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.company }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.nation }}</td>
            <td>{{ item.phoneNumber }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.createdAt }}</td>
            <td>
              <v-tooltip bottom v-for="(action, i) in actions">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    :key="i"
                    class="px-2 ml-1"
                    :color="action.color"
                    min-width="0"
                    small
                    v-bind="attrs"
                    v-on="on"
                    @click="doAction(item, action.type)"
                  >
                    <v-icon
                      small
                      v-text="action.icon"
                    />
                  </v-btn>
                </template>
                <span>{{action.tooltip}}</span>
              </v-tooltip>
            </td>
            <td>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-switch
                    v-model="item.status"
                    value
                    :input-value="item.status"
                    v-on="on"
                    @change="changeStatus(item)"
                  />
                </template>
                <span>{{messages.changeStatus}}</span>
              </v-tooltip>
            </td>
          </tr>
          </tbody>
        </template>

        <!--<template v-slot:item.actions="{ item }">
          <v-tooltip bottom v-for="(action, i) in actions">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :key="i"
                class="px-2 ml-1"
                :color="action.color"
                min-width="0"
                small
                v-bind="attrs"
                v-on="on"
                @click="doAction(item, action.type)"
              >
                <v-icon
                  small
                  v-text="action.icon"
                />
              </v-btn>
            </template>
            <span>{{action.tooltip}}</span>
          </v-tooltip>
        </template>
        <template v-slot:item.changeStatus="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-switch
                v-model="item.status"
                value
                :input-value="item.status"
                v-on="on"
                @change="changeStatus(item)"
              />
            </template>
            <span>{{messages.changeStatus}}</span>
          </v-tooltip>
        </template>-->
      </v-data-table>
    </base-material-card>
    <v-dialog v-model="createDialog" class="white" max-width="600">
      <v-card class="pa-5">
        <div class="font-weight-light card-title pa-5 justify-center">
          <v-icon large color="success">mdi-account-multiple-plus-outline</v-icon>
          <span class="body-1">— {{messages.createMsg}}</span>
        </div>

        <v-form>
          <v-container class="py-0">
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="newUser.name"
                  :rules="[rules.required]"
                  class="purple-input"
                  :label="messages.name"
                  outlined
                />
              </v-col>

              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="newUser.surname"
                  :label="messages.surname"
                  :rules="[rules.required]"
                  class="purple-input"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="newUser.email"
                  :rules="[rules.required, rules.email]"
                  label="EMAIL"
                  class="purple-input"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="newUser.password"
                  :rules="[rules.required]"
                  :label="messages.password"
                  class="purple-input"
                  outlined
                />
              </v-col>
              <!--<v-col cols="12">
                <v-text-field
                  v-model="profile.company"
                  label="AZIENDA"
                  class="purple-input"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="profile.city"
                  label="CITTA"
                  class="purple-input"
                  outlined
                />
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="profile.nation"
                  label="NAZIONE"
                  class="purple-input"
                  outlined
                />
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="profile.cap"
                  class="purple-input"
                  label="CAP"
                  outlined
                />
              </v-col>-->

              <v-col
                cols="12"
                class="text-right"
              >
                <v-btn
                  :loading="loadingBtn"
                  color="success"
                  class="mr-0"
                  @click="createUser"
                >
                  {{messages.createUserBtn}}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="changePasswordDlg" class="white" max-width="400">
      <v-card class="pa-5">
        <div class="font-weight-light card-title pa-5 justify-center">
          <v-icon large color="success">mdi-key-chain-variant</v-icon>
          <span class="body-1">— {{messages.changeEmailPassword}}</span>
        </div>

        <v-form>
          <v-container class="py-0">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newEmail"
                  :rules="[rules.email]"
                  :label="messages.email"
                  class="purple-input"
                  outlined
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newPassword"
                  :rules="[rules.required, rules.min]"
                  hint="At least 6 characters!"
                  label="Digitare la nuova password.."
                  class="purple-input"
                  type="password"
                  outlined
                />
              </v-col>

              <v-col
                cols="12"
                class="text-right"
              >
                <v-btn
                  :loading="loadingBtn"
                  color="success"
                  class="mr-0"
                  @click="onChangeEmailPassword"
                >
                  {{messages.update}}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editUserDlg" class="white" max-width="400">
      <v-card class="pa-5">
        <div class="font-weight-light card-title pa-5 justify-center">
          <v-icon large color="success">mdi-pencil</v-icon>
          <span class="body-1">— {{messages.upgradeNumber}}</span>
        </div>

        <v-form>
          <v-container class="py-0">
            <v-row>

              <v-col cols="12">
                <v-text-field
                  v-model="numberFridges"
                  :label="messages.pNumberFridgeTitle"
                  class="purple-input"
                  outlined
                />
              </v-col>

              <v-col
                cols="12"
                class="text-right"
              >
                <v-btn
                  :loading="loadingBtn"
                  color="success"
                  class="mr-0"
                  @click="upgradeNumberFridge"
                >
                  {{messages.upgrade}}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmDialog" persistent max-width="290">
      <v-card>
        <v-card-text class="text-md-center text--primary">{{messages.deleteUserConfirm}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="confirmDialog = false">{{messages.no}}</v-btn>
          <v-btn color="green darken-1" text @click="deleteUser">{{messages.yes}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import moment from 'moment'
  import messages from '../../locales/en'
  import {
    createNewAdmin, deleteAUser,
    getAllAdmins,
    resetEmailPassword,
    setUserStatus,
  } from '../../service/users'
  import { getNumberFridges, upgradePackage } from '../../service/packages'

  export default {
    name: 'ManageAdmins',

    data: () => ({
      rules: {
        required: value => !!value || 'Required!',
        min: v => v.length >= 6 || 'At least 6 characters!',
        confirm: v => v === this.newPassword || 'Password not matched!',
        codeMin: v => v.length === 5 || 'Must be 5 characters!',
        email: e => /^\S+@\S+\.\S+$/.test(e) || 'Invalid Email!',
        emailMatch: () => ('The email and password you entered don\'t match'),
      },
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Address',
          value: 'address',
        },
        {
          text: 'Company',
          value: 'company',
        },
        {
          text: 'Email',
          value: 'email',
        },
        {
          text: 'Country',
          value: 'nation',
        },
        {
          text: 'Phone',
          value: 'phoneNumber',
        },
        {
          text: 'Status',
          value: 'status',
        },
        {
          text: 'Created At',
          value: 'createdAt',
        },
        {
          sortable: false,
          text: 'Actions',
          value: 'actions',
        },
        {
          sortable: false,
          text: 'Enable/Disable',
          value: 'changeStatus',
        },
      ],
      items: [],
      actions: [
        {
          type: 'reset',
          color: 'warning',
          icon: 'mdi-key-chain-variant',
          tooltip: messages.changeEmailPassword,
        },
        {
          type: 'edit',
          color: 'success',
          icon: 'mdi-transfer-up',
          tooltip: messages.upgradeNumber,
        },
        {
          type: 'delete',
          color: 'error',
          icon: 'mdi-delete',
          tooltip: 'Status',
        },
      ],
      search: undefined,
      messages: messages,
      loading: false,
      newUser: {
        name: '',
        surname: '',
        email: '',
        password: '',
      },
      createDialog: false,
      changePasswordDlg: false,
      editUserDlg: false,
      newPassword: '',
      confirmPassword: '',
      loadingBtn: false,
      newEmail: '',
      numberFridges: 0,
      editingUserID: '',
      confirmDialog: false,
      deletingUserID: '',
    }),

    mounted () {
      this.$store.commit('SHOW_OVER_LAY', true)
      let token = localStorage.getItem('token')
      getAllAdmins({ token }).then((res) => {
        let users = res.data.data
        let tmpUsers = []
        users.map(user => {
          let tmp = user
          tmp.createdAt = moment(user.createdAt).format('YYYY-MM-DD')
          tmpUsers.push(tmp)
        })
        this.items = tmpUsers
        this.$store.commit('SHOW_OVER_LAY', false)
      }).catch(e => {
        this.$store.commit('SHOW_OVER_LAY', false)
      })
    },

    methods: {
      doAction (item, actionType) {
        this.editingUserID = item._id
        if (actionType === 'edit') {
          let token = localStorage.getItem('token')
          getNumberFridges({
            token,
            uID: item._id,
          }).then((res) => {
            if (!res.data.data) {
              let snackbarVal = {
                snackbar: true,
                text: messages.notActivePackage,
                type: 'error',
              }
              this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
              return
            }
            this.numberFridges = res.data.data.numberFridges || 0
            // this.newEmail = item.email;
            this.editUserDlg = true
          }).catch(e => {

          })
        } else if (actionType === 'reset') {
          this.newEmail = item.email
          this.newPassword = ''
          this.changePasswordDlg = true
        } else if (actionType === 'delete') {
          this.deletingUserID = item._id
          this.confirmDialog = true
        }
      },

      createUser () {
        this.loadingBtn = true
        let token = localStorage.getItem('token')
        let newAdmin = {
          ...this.newUser,
          role: 'admin',
        }
        let data = {
          token: token,
          newAdmin: newAdmin,
        }
        createNewAdmin({
          token,
          data,
        }).then((res) => {
          let users = res.data.data
          let tmpUsers = []
          users.map(user => {
            let tmp = user
            tmp.createdAt = moment(user.createdAt).format('YYYY-MM-DD')
            tmpUsers.push(tmp)
          })
          this.items = tmpUsers
          this.loadingBtn = false
          let snackbarVal = {
            snackbar: true,
            text: messages.success,
            type: 'success',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
          this.createDialog = false
        }).catch(e => {
          this.loadingBtn = false
          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: 'error',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
        })
      },

      async deleteUser () {
        try {
          let token = localStorage.getItem('token')
          let _id = this.deletingUserID
          let res = await deleteAUser({
            token,
            _id,
          })
          let users = res.data.data
          let tmpUsers = []
          users.map(user => {
            let tmp = user
            tmp.createdAt = moment(user.createdAt).format('YYYY-MM-DD')
            tmpUsers.push(tmp)
          })
          this.items = tmpUsers
          let snackbarVal = {
            snackbar: true,
            text: messages.success,
            type: 'success',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
          this.confirmDialog = false
        } catch (e) {
          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: 'error',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
          this.confirmDialog = false
        }
      },

      onChangeEmailPassword () {
        this.loadingBtn = true
        let token = localStorage.getItem('token')
        let data = {
          newEmail: this.newEmail,
          newPassword: this.newPassword,
          _id: this.editingUserID,
        }
        resetEmailPassword({
          token,
          data,
        }).then(() => {
          this.loadingBtn = false
          let snackbarVal = {
            snackbar: true,
            text: messages.success,
            type: 'success',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
          this.changePasswordDlg = false
        }).catch(e => {
          this.loadingBtn = false
          let snackbarVal = {
            snackbar: true,
            text: messages.failed,
            type: 'error',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
        })
      },

      changeStatus (item) {
        let token = localStorage.getItem('token')
        setUserStatus({
          token,
          status: item.status,
          _id: item._id,
        }).then((res) => {
        })
      },

      upgradeNumberFridge () {
        this.loadingBtn = true
        let token = localStorage.getItem('token')
        upgradePackage({
          token,
          numberFridges: this.numberFridges,
          uID: this.editingUserID,
        }).then((res) => {
          this.loadingBtn = false
          let snackbarVal = {
            snackbar: true,
            text: messages.success,
            type: 'success',
          }
          this.$store.commit('SHOW_SNACK_BAR', snackbarVal)
          this.editUserDlg = false
        }).catch(e => {
          this.loadingBtn = false
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

<style scoped>

</style>
