<template>
  <div id="emails" class="container">
    <div class="text-center mx-auto mt-2">
      <h1 class="text-center">Emails</h1>
      <div class="row messages">
        <div class="text-center mx-auto mb-5">
          <div v-if="successMessage" class="alert alert-success">
            <p>{{ successMessage }}</p>
          </div>
          <div v-if="errorMessage" class="alert alert-warning">
            <p>{{ errorMessage }}</p>
          </div>
        </div>
      </div>
      <div class="row sendEmail">
        <div class="text-center mx-auto">
          <button
            class="btn btn-primary mr-5"
            @click="SendEmailWithWebuxmailer"
          >Send a Test Email with Webux Mailer</button>
          <button
            class="btn btn-primary mr-5"
            @click="SendEmailWithNodemailer"
          >Send a Test Email with Nodemailer</button>
          <button class="btn btn-secondary mr-5" @click="showInfo = !showInfo">Show Information</button>
          <button class="btn btn-warning" @click="ResetEmails">Reset</button>
        </div>
      </div>
      <hr />
      <div v-if="showInfo" class="showInfo">
        <p
          class="lead"
        >When deployed locally, you can send emails using nodemailer directly to this fake SMTP Server.</p>
        <h2>Using WebuxMailer (A wrapper around Nodemailer)</h2>
        <pre class="text-left border p-3">{{ infoWebuxMail }}</pre>
        <hr />
        <h2>Using Nodemailer Directly</h2>
        <pre class="text-left border p-3">{{ info }}</pre>
      </div>
      <div class="row isLoading" v-if="isLoading">
        <div class="text-center mx-auto mt-2">
          <Loading />
        </div>
      </div>
      <div class="row waitingForEmail" v-if="mails.length === 0">
        <div class="text-center mx-auto mt-2">
          <p class="lead">Waiting for new Emails ...</p>
        </div>
      </div>
      <div class="mails">
        <div class="shadow p-3 mb-5 bg-white rounded" v-for="mail in mails" :key="mail.id">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <div class="d-flex justify-content-between">
                  <h3>{{ mail.subject }}</h3>
                  <p>{{ mail.date }}</p>
                </div>
              </div>
              <div class="card-text">
                <div class="d-flex justify-content-between">
                  <p>
                    From:
                    <span class="small" v-html="mail.sender"></span>
                  </p>
                  <p>
                    To:
                    <span class="small" v-html="mail.recipient"></span>
                  </p>
                  <p v-if="mail.cc">
                    CC:
                    <span class="small" v-html="mail.cc"></span>
                  </p>
                  <p v-if="mail.bcc">
                    BCC:
                    <span class="small" v-html="mail.bcc"></span>
                  </p>
                </div>
                <div class="section">
                  <h2>Content</h2>
                  <p v-if="!mail.html">{{ mail.text }}</p>
                  <hr />
                  <div v-html="mail.html"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading/Page";
import { mapGetters } from "vuex";

export default {
  name: "Mail",
  components: {
    Loading
  },
  data() {
    return {
      showInfo: false,
      info: `
      const nodemailer = require("nodemailer");

      const transporter = nodemailer.createTransport({
        host: "127.0.0.1",
        port: 2525,
        secure: false
      });

      const email = {
        from: "test@here.local",
        to: "test@somewhere.local",
        subject: "This is a test",
        text: "Did you receive my email ?",
        html: "<h1>Hey !</h1><p>Did you receive my email ?</p>",
      };
      transporter.sendMail(email, (err, sent) => {
        if (err) {
          console.error(err);
        }
        console.info(sent);
      });`,
      infoWebuxMail: `
      const WebuxMailer = require("@studiowebux/mailer");

      const opts = {
        isEnabled: true,
        host: "127.0.0.1",
        port: 2525,
        secure: false,
      };

      const webuxMailer = new WebuxMailer(opts);

      // Data structure : https://nodemailer.com/message/
      const data = {
        from: "test@from.local",
        to: ["test1@to.local", "test2@to.local"],
        cc: ["test3@cc.local", "test5@cc.local", "test6@cc.local"],
        subject: "Testing the webux mailer",
        html: "<p>Hello World !</p>",
        text: "Hello World !",
      };

      webuxMailer
        .Sendmail(data)
        .then((info) => {
          console.log(info);
        })
        .catch((e) => {
          console.error(e);
        });
      };
      `
    };
  },
  computed: {
    ...mapGetters(["isLoading", "successMessage", "errorMessage", "mails"])
  },
  methods: {
    ResetEmails() {
      this.$store.dispatch("resetEmails");
    },
    SendEmailWithNodemailer() {
      this.$store.dispatch("resetMessages");
      this.$store.dispatch("setLoading");
      this.$socket.client.emit("SendEmailWithNodemailer", callback => {
        if (callback) {
          this.$store.dispatch("setSuccess", "Success !");
        } else {
          this.$store.dispatch("setError", "Error !");
        }
        setTimeout(() => {
          this.$store.dispatch("resetMessages");
        }, 8000);
      });
    },
    SendEmailWithWebuxmailer() {
      this.$store.dispatch("resetMessages");
      this.$store.dispatch("setLoading");
      this.$socket.client.emit("SendEmailWithWebuxmailer", callback => {
        if (callback) {
          this.$store.dispatch("setSuccess", "Success !");
        } else {
          this.$store.dispatch("setError", "Error !");
        }
        setTimeout(() => {
          this.$store.dispatch("resetMessages");
        }, 8000);
      });
    }
  },
  mounted() {
    if (!this.$store.getters.mailInit) {
      this.$store.dispatch("setLoading");
    }
  }
};
</script>
