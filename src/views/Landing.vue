<template>
    <v-app>
        <v-app-bar elevation="1" app>
        <v-toolbar-title>oasisFeeds</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-app-bar-nav-icon v-bind="attrs"
              v-on="on"></v-app-bar-nav-icon>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title><div>{{this.$store.state.user.firstname}}</div></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title><span v-if="isLoggedIn"><a @click="logout">Logout</a></span></v-list-item-title>
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
            flaticon-add-button
          </v-icon>
          New App
        </v-chip>
        </v-col>
      </v-row>
      </v-container>

    <v-card
      class="mx-auto"
      min-width="400"
      tile
    >
    <v-list
    >
      <v-subheader>Apps</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.app_name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
    </v-app>
</template>

<script>
  export default {
    data: () => ({
      selectedItem: 1,
    }),
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
      items: function(){ return this.$store.state.user.apps }
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
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
    }
    },
  }
</script>