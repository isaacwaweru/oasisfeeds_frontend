<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
           <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
           <span class="logo-1">oasis</span>
          <span class="logo-2">Feeds</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            Bulk SMS Engine
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list
        dense
        nav
      >
      <router-link to="/dashboard">
        <v-list-item
        link
        >
          <v-list-item-icon>
            <v-icon>flaticon-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

        <router-link to="/send">
        <v-list-item
        link
        >
          <v-list-item-icon>
            <v-icon>flaticon-paper-plane</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Send SMS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </router-link>

        <router-link to="/sent">
        <v-list-item
        link
        >
          <v-list-item-icon>
            <v-icon>flaticon-mail</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Sent Mesaages</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </router-link>

        <router-link to="/outbox">
        <v-list-item
        link
        >
          <v-list-item-icon>
            <v-icon>flaticon-outbox</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Outbox</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </router-link>

        <!-- <router-link to="/drafts">
        <v-list-item
        link
        >
          <v-list-item-icon>
            <v-icon>flaticon-chat</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Drafts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </router-link> -->
        
        <router-link to="/topup">
          <v-list-item
        link
        >
          <v-list-item-icon>
            <v-icon>flaticon-wallet-filled-money-tool</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Top Up</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        </router-link>
        
        <router-link to="/contacts">
          <v-list-item
        link
        >
          <v-list-item-icon>
            <v-icon>flaticon-notebook-of-contacts</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Contacts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        </router-link>
        
        <router-link to="/help">
          <v-list-item
        link
        >
          <v-list-item-icon>
            <v-icon>flaticon-support</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </router-link>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar elevation="1" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

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

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
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
      }),
       computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
  }
</script>
<style>
@import "../assets/css/flaticon.css";
a {
  text-decoration: none;
}
.logo-1{
  color: #091175;
  font-weight: bold;
  font-size: 25px;
}
.logo-2{
  color: #46f21f;
  font-weight: bold;
  font-size: 25px;
}
</style>