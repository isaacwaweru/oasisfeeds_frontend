<template>
    <v-app>
        <v-container class="mt-4">
        <v-row justify="space-around">
        <v-col
          cols="12"
          md="3" 
        >
          <div>
           Good {{getGreetingTime(moment()) }} <strong>{{ profile.firstname}}</strong>
        </div>
        </v-col>
        <v-col
          cols="12"
          md="3" 
        >
        </v-col>
      </v-row>
      </v-container>

      <v-container :class="{'ml-0': $vuetify.breakpoint.smAndDown, 'ml-12': $vuetify.breakpoint.mdAndUp}">
                <h3>Help</h3>
      </v-container>

      <v-container class="card">
          <v-row
          justify="space-around"
          :class="{'ml-1': $vuetify.breakpoint.smAndDown, 'mr-1': $vuetify.breakpoint.smAndDown}"
          >
                <v-card elevation="1" width="400">
                    <v-container>
                        <h5>Need support?</h5> 
                        Submit what you need
                        <v-text-field
                        v-model="phonenumber"
                        class="mt-2"
                        label="Phone number"
                        placeholder="Phone number"
                        outlined
                        type="number"
                    ></v-text-field>
                    <v-textarea
                    v-model="helpmessage"
                    outlined
                    name="input-7-4"
                    label="Messaage..."
                    ></v-textarea>
                    <v-btn
                        color="blue darken-1"
                        dark
                        @click="sendHelp"
                        >
                        Submit
                        </v-btn>
                    </v-container>
                </v-card>
          </v-row>
      </v-container>
    </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

  export default {
    data: () => (
      { drawer: null,
        items: [
          { title: 'Dashboard', icon: 'flaticon-dashboard' },
          { title: 'Send SMS', icon: 'flaticon-paper-plane' },
          { title: 'Sent Messages', icon: 'flaticon-mail' },
          { title: 'Outbox', icon: 'flaticon-outbox' },
          { title: 'Drafts', icon: 'flaticon-chat' },
          { title: 'Top Up', icon: 'flaticon-wallet-filled-money-tool' },
          { title: 'Contacts', icon: 'flaticon-notebook-of-contacts' },
          { title: 'Help', icon: 'flaticon-support' },
        ],
        right: null,
        form: {
          phone: '',
          message: '',
          api_key: '',
          username: '',
          sender_id: '',
        },
        helpmessage: '',
        phonenumber: '',
      }),
      computed : {
      ...mapGetters(['getProfile', 'isProfileLoaded', 'isAuthenticated', 'getApps']),
      ...mapState({ profile: state => state.user.profile })
      },
       methods: {
        getGreetingTime (m) {
      var g = null; //return g
      
      if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.
      
      var split_afternoon = 12 //24hr time to split the afternoon
      var split_evening = 17 //24hr time to split the evening
      var currentHour = parseFloat(m.format("HH"));
      
      if(currentHour >= split_afternoon && currentHour <= split_evening) {
        g = "afternoon";
      } else if(currentHour >= split_evening) {
        g = "evening";
      } else {
        g = "morning";
      }
      
      return g;
    },
    sendHelp: function () {
      this.form.api_key = '608d86be73ea8',
      this.form.username = 'yote',
      this.form.sender_id = '23107',
      this.form.phone = '254742842922',
      this.form.message = this.helpmessage+ ' ' +this.phonenumber+ ' ' +this.getProfile.firstname,
      this.$store.dispatch('SEND_SMS', this.form);
    }
      }
  }
</script>
<style>
@import "../assets/css/flaticon.css";
</style>