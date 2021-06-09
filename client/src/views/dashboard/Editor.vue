<template>
  <v-container class="error-page fill-height" tag="section">
    
    <v-row>
      <v-col cols="12" md="12">
        <div id="emailtoken">
          <h2>Email Token</h2>
          <p>
            <textarea
              v-if="hidden == false"
              style="width: 100%"
              id="editor-editor"
              class="source-editor"
              v-model.lazy="emailtoken"
            ></textarea>
          </p>
          <label>Subject:</label>
          <input class="" type="text" v-model="emailtokenSubject" />
          <ckeditor
            class="editor-instance"
            v-model.lazy="emailtoken"
          ></ckeditor>
          <v-btn
            color="success"
            class="mr-0"
            @click="changeEmailData('emailtoken')"
            >Save</v-btn
          >
          <!-- {{ emailtoken }} -->
        </div>
      </v-col>
      <!-- </v-row>

    <v-row> -->
      <v-col cols="12" md="12">
        <div id="welcomeEmail">
          <h2>Welcome Email</h2>
          <br />
          <p>
            <textarea
              v-if="hidden == false"
              style="width: 100%"
              id="editor-editor"
              class="source-editor"
              v-model.lazy="welcomeEmail"
            ></textarea>
          </p>
          <p>
            <label>Subject:</label>
            <input class="" type="text" v-model="welcomeEmailSubject" />
          </p>

          <ckeditor class="editor-instance" v-model="welcomeEmail"></ckeditor>
          <v-btn
            color="success"
            class="mr-0"
            @click="changeEmailData('welcomeEmail')"
            >Save</v-btn
          >
          <!-- {{ welcomeEmail }} -->
        </div>
      </v-col>
      <!-- </v-row>

    <v-row> -->
      <v-col cols="12" md="12">
        <div id="forgotPassword">
          <h2>Forgot Password</h2>
          <br />
          <p>
            <textarea
              v-if="hidden == false"
              style="width: 100%"
              id="editor-editor"
              class="source-editor"
              v-model.lazy="forgotPassword"
            ></textarea>
          </p>
          <p>
            <label>Subject:</label>
            <input class="" type="text" v-model="forgotPasswordSubject" />
          </p>
          <ckeditor class="editor-instance" v-model="forgotPassword"></ckeditor>
          <v-btn
            color="success"
            class="mr-0"
            @click="changeEmailData('forgotPassword')"
            >Save</v-btn
          >
          <!-- {{ forgotPassword }} -->
        </div>
      </v-col>
      <!-- </v-row>

    <v-row> -->
      <v-col cols="12" md="12">
        <div id="resetPassword">
          <h2>Reset Password</h2>
          <br />
          <p>
            <textarea
              v-if="hidden == false"
              style="width: 100%"
              id="editor-editor"
              class="source-editor"
              v-model.lazy="resetPassword"
            ></textarea>
          </p>
          <p>
            <label>Subject:</label>
            <input class="" type="text" v-model="resetPasswordSubject" />
          </p>
          <ckeditor class="editor-instance" v-model="resetPassword"></ckeditor>
          <v-btn
            color="success"
            class="mr-0"
            @click="changeEmailData('resetPassword')"
            >Save</v-btn
          >
          <!-- {{ resetPassword }} -->
        </div>
      </v-col>

      <v-col cols="12" md="12">
        <div id="genericTemplate">
          <h2>Generic Template</h2>
          <br />
          <p>
            <textarea
              v-if="hidden == false"
              style="width: 100%"
              id="editor-editor"
              class="source-editor"
              v-model.lazy="genericTemplate"
            ></textarea>
          </p>
          <p>
            <label>Subject:</label>
            <input class="" type="text" v-model="genericTemplateSubject" />
          </p>
          <ckeditor
            class="editor-instance"
            v-model="genericTemplate"
          ></ckeditor>
          <v-btn
            color="success"
            class="mr-0"
            @click="changeEmailData('genericTemplate')"
            >Save</v-btn
          >
          <!-- {{ genericTemplate }} -->
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { async } from "rxjs";
import {
  getAllEmailTemplates,
  getEmailTemplatesByName,
  updateEmailTemplate, createEmailTemplate
} from "../../service/users";
// CKEDITOR.replace( 'editor1', {
//     filebrowserBrowseUrl: '/browser/browse.php',
//     filebrowserUploadUrl: '/uploader/upload.php'
// });
// import Vue from 'vue'
// new Vue({
//   el: '...',
//   data: {
//     editorData: any
//   }
// })
export default {
  // el: '#emailtoken',
  data() {
    return {
      emailtokenId: "",
      emailtokenSubject: "Hello {{name}}! Activation your account",
      emailtoken:
        "<p>Hello {{name}},<br /> <br /> Thank you for joining! We&#39;re glad to have you as community member, and we&#39;re stocked for you to start exploring our service.<br /> All you need to do is activate your account:<br /> {{emailToken}}<br /> <br /> Thanks and Best Regards!</p>",
      welcomeEmailId: "",
      welcomeEmailSubject: "Hi {{name}}! Getting Started with Our Service",
      welcomeEmail:
        "<p>Hello {{name}}!<br /> <br /> Congratulations!<br /> <br /> You have successfully signed up for our service.<br /> You have got a trial package, starting today.<br /> We hope you enjoy this package! We love to hear from you,<br /> <br /> Thanks and Best Regards!</p>",
      forgotPasswordId: "",
      forgotPasswordSubject: "Hi {{name}}! Request for new Password",
      forgotPassword:
        "<p>Hi {{name}}!<br /> <br /> Somebody (hopefully you) requested a new password for your account.<br /> No changes have been made to your account yet.<br /> <br /> Your&nbsp;New Password is below:<br /> <strong>{{newPassword}}</strong><br /> <br /> If you did not request a password reset, no further action is required.<br /> <br /> Thanks and Best Regards!</p>",
      resetPasswordId: "",
      resetPasswordSubject: "Hi {{name}}! Password Reset",
      resetPassword:
        "<p>Hi {{name}}!<br /> <br /> Somebody (hopefully you) requested a new password for your account.<br /> No changes have been made to your account yet.<br /> <br /> You can reset your password by using code code below:<br /> <strong>{{emailToken}}</strong><br /> <br /> If you did not request a password reset, no further action is required.<br /> <br /> Thanks and Best Regards!</p>",
      genericTemplateId: "",
      genericTemplateSubject: "Hi {{name}}! ",
      genericTemplate: "<p>Hi {{name}}!</p> <p>this is generic template</p>",

      AllEmailTemplates: [],
      hidden: true,
    };
  },
  beforeMount() {
    this.asd();
  },
  mounted() {},
  methods: {
    async asd() {
      await getAllEmailTemplates().then((res) => {
        this.loading = false;
        this.AllEmailTemplates = res.data.data;
        this.AllEmailTemplates.forEach((element) => {
          if (element.name == "emailtoken") {
            this.emailtokenId = element._id;
            this.emailtokenSubject = element.subject;
            this.emailtoken = element.code;
          }
          if (element.name == "welcomeEmail") {
            this.welcomeEmailId = element._id;
            this.welcomeEmailSubject = element.subject;
            this.welcomeEmail = element.code;
          }
          if (element.name == "forgotPassword") {
            this.forgotPasswordId = element._id;
            this.forgotPasswordSubject = element.subject;
            this.forgotPassword = element.code;
          }
          if (element.name == "resetPassword") {
            this.resetPasswordId = element._id;
            this.resetPasswordSubject = element.subject;
            this.resetPassword = element.code;
          }
          if (element.name == "genericTemplate") {
            this.genericTemplateId = element._id;
            this.genericTemplateSubject = element.subject;
            this.genericTemplate = element.code;
          }
        });
        // console.log(this.AllEmailTemplates);
        // this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
      });
      // .catch((err) => {
      //   this.loading = false;
      //   let snackbarVal = {
      //     snackbar: true,
      //     // text: messages.failed,
      //     type: "error",
      //   };
      //   this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
      // });
    },
    async changeEmailData(name) {
      let objCode =
        name == "emailtoken"
          ? this.emailtoken
          : name == "welcomeEmail"
          ? this.welcomeEmail
          : name == "forgotPassword"
          ? this.forgotPassword
          : name == "resetPassword"
          ? this.resetPassword
          : this.genericTemplate;
      let objId =
        name == "emailtoken"
          ? this.emailtokenId
          : name == "welcomeEmail"
          ? this.welcomeEmailId
          : name == "forgotPassword"
          ? this.forgotPasswordId
          : name == "resetPassword"
          ? this.resetPasswordId
          : this.genericTemplateId;
      let objSubject =
        name == "emailtoken"
          ? this.emailtokenSubject
          : name == "welcomeEmail"
          ? this.welcomeEmailSubject
          : name == "forgotPassword"
          ? this.forgotPasswordSubject
          : name == "resetPassword"
          ? this.resetPasswordSubject
          : this.genericTemplateSubject;
      var obj = {
        _id: objId,
        name: name,
        // code: JSON.stringify(this.emailtoken),
        code: objCode,
        subject: objSubject,
      };
      // console.log('obj.name', obj.name)
      // getEmailTemplatesByName(obj.name).then((resp) => {
      // (obj._id = resp.data._id), obj.code;
      if (obj._id == "") {
        var newObj = {
          name: name,
          code: objCode,
          subject: objSubject,
        };
        createEmailTemplate(newObj).then((res) => {
          let a = res.data;
          this.openSnackbar(res, false)
           this.asd();
        });
      } else {
        updateEmailTemplate(obj).then((res) => {
          let a = res.data;
          this.openSnackbar(res, true)
           this.asd();
        });
      }

      // });
    },

    openSnackbar(res, isUpdate) {
     var message = isUpdate == false ? 'save' : 'update';
      if (res.status == 200 ) {
        let snackbarVal = {
          snackbar: true,
          text: message + ' ' + 'Successfully',
          type: "success",
        };
        this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
      } else {
        let snackbarVal = {
          snackbar: true,
          text: message + ' ' + 'Error',
          type: "error",
        };
        this.$store.commit("SHOW_SNACK_BAR", snackbarVal);
      }
    },
  },
};
</script>

<style lang="css">
input {
  border: 1px solid #d3cece;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
}
.newclass {
  color: blue;
}
</style>