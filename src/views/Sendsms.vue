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
                                v-model="form.phone"
                                label="Phone number"
                                required
                                ></v-text-field>
                                <v-btn
                                    class="mx-1"
                                    small
                                    dark
                                    color="indigo"
                                    @click.stop="dialog = true"
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
                    v-model="form.message"
                    ></v-textarea>
                    <v-row justify="center">
                        <v-col
                        >
                            <div class="my-2">
                            <v-btn
                            color="blue"
                            dark
                            @click="sendSms"
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
                            @click.stop="dialog2 = true"
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
      <!-- Dialoag -->
      <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="330"
    >
      <v-card>
        <v-card-title class="text-h5">
          Seperate phonenumbers with comma(s) to send to many
        </v-card-title>

        <v-card-text>
          Example 0722******56,0756******67,0789*******89
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Okay
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <!-- Date picker -->
  <v-row justify="center">
    <v-dialog
      v-model="dialog2"
      max-width="330"
    >
      <v-date-picker
      v-model="picker"
      flat
    ></v-date-picker>
    <v-btn
    color="blue darken-2"
    dark
    @click.stop="sendScheduled"
    class="rounded-0"
    >
    Schedule Now
    </v-btn>
    </v-dialog>
  </v-row>
    </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

  export default {
    data: () => (
      { drawer: null,
      dialog: false,
      dialog2: false,
      picker: null,
      form: {
        message: '',
        phone: '',
        api_key: '',
        username: '',
        sender_id: '',
        },
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
    sendSms(){
      this.form.api_key = this.getApp.api_key,
      this.form.username = this.getApp.username,
      this.form.sender_id = this.getApp.sender_id,
      this.$store.dispatch('SEND_SMS', this.form);
    },
    sendScheduled(){
      console.log(this.picker);
    }
      }
  }
</script>
<style>
@import "../assets/css/flaticon.css";
</style>