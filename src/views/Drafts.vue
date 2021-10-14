<template>
    <v-app>
        <v-container class="mt-4">
        <v-row justify="space-around">
        <v-col
          cols="12"
          md="3" 
        >
          <div>
           Good evening, Isaac
        </div>
        </v-col>
        <v-col
          cols="12"
          md="3" 
        >
          <v-chip
          class="ma-2"
          color="pink"
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

      <v-container>
          Drafts
      </v-container>
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
  }
</script>
<style>
@import "../assets/css/flaticon.css";
</style>