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
                <h3>Send SMS</h3>
      </v-container>

      <v-container>
          <v-card
           elevation="0"
          >
              <v-row justify="space-around">
                <v-col
                cols="12"
                md="5" 
                >
                    <v-card elevation="1">
                        <v-container>
                            Sending options:
                        </v-container>
                        <v-container>
                            <h4>Individual</h4>
                            <v-text-field
                                v-model="name"
                                :error-messages="nameErrors"
                                :counter="10"
                                label="Phone number"
                                required
                                @input="$v.name.$touch()"
                                @blur="$v.name.$touch()"
                                ></v-text-field>
                                <v-btn
                                    class="mx-1"
                                    small
                                    dark
                                    color="indigo"
                                    >
                                    <v-icon dark>
                                        mdi-plus
                                    </v-icon>
                                </v-btn>
                        </v-container>
                        <v-divider></v-divider>
                        <v-container>
                            <h4>Import CSV(Excel)</h4>
                            <v-file-input
                                accept="excel/*"
                                label="File input"
                            ></v-file-input>
                        </v-container>
                        <v-divider></v-divider>
                        <v-container>
                            <h4>Contacts</h4>
                            <v-chip
                            class="ma-2"
                            color="blue darken-1"
                            label
                            text-color="white"
                            >
                            <v-icon left>
                                flaticon-contact-book
                            </v-icon>
                            Select from Contacts
                            </v-chip>
                        </v-container>
                    </v-card>
                </v-col>
                <v-col
                cols="12"
                md="5" 
                >
                <v-card elevation="0">
                    <v-container>
                        Type your message
                    </v-container>
                    <v-textarea
                    outlined
                    name="input-7-4"
                    label="Messaage..."
                    ></v-textarea>
                    <v-row justify="center">
                        <v-col
                        >
                            <div class="my-2">
                            <v-btn
                            color="blue"
                            dark
                            >
                            <v-icon left>
                                mdi-send
                            </v-icon>
                            Send Now
                            </v-btn>
                        </div>
                        </v-col>
                        <v-col
                        >
                            <div class="my-2">
                            <v-btn
                            color="orange darken-2"
                            dark
                            >
                            <v-icon left>
                                mdi-calendar
                            </v-icon>
                            Schedule
                            </v-btn>
                        </div>
                        </v-col>
                    </v-row>
                </v-card>
                </v-col>
              </v-row>
          </v-card>
      </v-container>
    </v-app>
</template>

<script>
  export default {
    data: () => (
      { drawer: null,
        message: '',
        phone: '',
        api_key: '',
        username: '',
        sender_id: '',
        user_id: '',
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
    sendSms(){
      let data = {
          mesaage: this.message,
          phone: this.phone,
          api_key: this.api_key,
          username: this.username,
          sender_id: this.sender_id,
          user_id: this.user_id,
        }
      this.$store.dispatch('sendSingle', data)
       .then(() => this.$router.push('/single'))
       .catch(err => console.log(err))
    }
      }
  }
</script>
<style>
@import "../assets/css/flaticon.css";
</style>