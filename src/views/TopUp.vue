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
          <v-chip
          class="ma-2"
          color="blue darken-1"
          label
          text-color="white"
        >
          <v-icon left>
            flaticon-wallet-filled-money-tool
          </v-icon>
          KES {{ getApp.amount }}
        </v-chip>
        </v-col>
      </v-row>
      </v-container>

      <v-container :class="{'ml-0': $vuetify.breakpoint.smAndDown, 'ml-12': $vuetify.breakpoint.mdAndUp}">
                <h3>Top up App</h3>
      </v-container>

      <v-container class="card">
          <v-row
          justify="space-around"
          :class="{'ml-1': $vuetify.breakpoint.smAndDown, 'mr-1': $vuetify.breakpoint.smAndDown}"
          >
                <v-card elevation="1">
                    <v-img
                    lazy-src="../assets/mpesa.png"
                    max-height="150"
                    max-width="250"
                    src="../assets/mpesa.png"
                    ></v-img>
                    <v-container>  
                       <h4>Payment with mpesa STK push</h4>
                    </v-container>
                     <v-container>
                        Enter your M-PESA registered phone number below and click Pay Now then <br>
                        check your mobile phone handset for an instant payment request from <br>
                        Safaricom M-PESA.
                    </v-container>
                    <v-container>
                        M-PESA Registered Phone Number
                        <v-text-field
                        class="mt-2"
                        label="Phone number"
                        placeholder="Phone number"
                        outlined
                    ></v-text-field>
                      Amount
                    <v-text-field
                        class="mt-2"
                        label="Amount"
                        placeholder="Amount"
                        outlined
                    ></v-text-field>
                    <v-btn
                        color="success"
                        dark
                        >
                        PAY NOW
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
    mounted (){
      
    },
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
      }),
      computed : {
      ...mapGetters(['getProfile', 'isProfileLoaded', 'isAuthenticated', 'getApps', 'getApp']),
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
      }
  }
</script>
<style>
@import "../assets/css/flaticon.css";
</style>