<template>
    <v-app>
        <v-container class="mt-4">
        <v-row justify="space-around">
        <v-col
          cols="12"
          md="3" 
        >
          <div>
           Good {{getGreetingTime(moment()) }} <strong>{{this.$store.state.user.firstname}}</strong>
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
          KES 2,000
        </v-chip>
        </v-col>
      </v-row>
      </v-container>

      <v-container :class="{'ml-0': $vuetify.breakpoint.smAndDown, 'ml-12': $vuetify.breakpoint.mdAndUp}">
                <h3>Dashboard</h3>
      </v-container>

        <v-container class="mt-2">
        <v-row justify="space-around">
        <v-col
          cols="12"
          md="3" 
        >
          <v-card
            height="100"
          >
            <v-container>
                <v-row justify="center">
                <v-list-item-icon>
                    <v-icon>flaticon-paper-plane</v-icon>
                </v-list-item-icon>
                </v-row>
            </v-container>
            <v-container>
                <v-row justify="center">
                <h4>Send SMS</h4>
                </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="3" 
        >
          <v-card
            height="100"
          >
            <v-container>
                <v-row justify="center">
                <v-col>
                    <v-list-item-icon>
                    <v-icon>flaticon-paper-plane</v-icon>
                </v-list-item-icon>
                </v-col>
                <v-list-item-icon>
                    <v-icon>flaticon-paper-plane</v-icon>
                </v-list-item-icon>
                </v-row>
            </v-container>
            <v-container>
                <v-row justify="center">
                <h4>Send SMS</h4>
                </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="3" 
        >
          <v-card
            height="100"
          >
            <div>
              Outbox
        </div>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="3" 
        >
          <v-card
            height="100"
          >
            <div>
          Drafts
        </div>
          </v-card>
        </v-col>
      </v-row>
      </v-container>
    </v-app>
</template>

<script>
  export default {
      mounted(){
    this.greeting()
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
        greeting: ""
      }),
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
    }
      },
  }
</script>
<style>
@import "../assets/css/flaticon.css";
</style>