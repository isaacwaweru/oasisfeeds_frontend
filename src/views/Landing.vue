<template>
    <v-app>
        <v-app-bar elevation="1" app>
        <v-toolbar-title>oasisFeeds</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <!-- <v-app-bar-nav-icon v-bind="attrs"
              v-on="on"></v-app-bar-nav-icon> -->
              <v-icon
              v-bind="attrs"
              v-on="on"
              right
            >
              mdi-account
            </v-icon>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title><div>{{ profile.firstname }}</div></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title><span v-if="isAuthenticated"><a @click="logout">Logout</a></span></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        </v-app-bar>
        <v-container>
            
        </v-container>
        <v-container class="mt-16">
        <v-row justify="space-around">
        <v-col
          cols="12"
          md="3" 
        >
          <div>
          Good {{getGreetingTime(moment()) }} <strong>{{ profile.firstname }}</strong>
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
          @click="toggleDia"
        >
          <v-icon left>
            flaticon-add-button
          </v-icon>
          New App
        </v-chip>
        </v-col>
      </v-row>
      </v-container>

    <v-row justify="center">
      <v-col
      cols="12"
      md="9"
      >
        <v-card
    >
    <v-list
    >
      <v-subheader>Choose App</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
        v-for="(item, i) in getApps"
          :key="i"
      >
       <router-link :to="{ name: 'Dashboard', params: { id: item.api_key } }">
        <v-list-item
        >

            <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.app_name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         </router-link>
      </v-list-item-group>
    </v-list>
  </v-card>
      </v-col>
    </v-row>
    <!-- Dialog here -->
    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h8">Request SenderID</span>
        </v-card-title>
        <v-text-field class="pa-8" label="SenderId" v-model="senderId"></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addApp"
          >
            Request
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
    </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

  export default {
    data: () => ({
      dialog: false,
      selectedItem: 1,
      form: {
      app_name: "",
      icon: "flaticon-app",
      api_key: "",
      username: "xxxxx",
      sender_id: "xxxxxx",
      amount: "0",
      charges: "0.8"
      },
      senderId: ''
    }),
    computed : {
      ...mapGetters(['getProfile', 'isProfileLoaded', 'isAuthenticated', 'getApps']),
      ...mapState({ profile: state => state.user.profile })
    },
    methods: {
      logout: function () {
        this.$store.dispatch('AUTH_LOGOUT')
        .then(() => {
          this.$router.push('/login')
        })
      },
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
    toggleDia() {
      this.dialog = !this.dialog;
    },
    addApp() {
       this.form.app_name = this.senderId
       this.form.api_key = Math.floor(Date.now()/1000).toString();
      this.$store.dispatch('ADD_APP', this.form)
    }
    },
  }
</script>

<style>

</style>
