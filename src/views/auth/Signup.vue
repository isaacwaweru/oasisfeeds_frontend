<template>
    <v-app>
        <v-container class="card">
          <v-row
          justify="space-around"
          :class="{'ml-0': $vuetify.breakpoint.smAndDown, 'mr-0': $vuetify.breakpoint.smAndDown}"
          >
                <v-card elevation="1" width="500">
                    <form @submit.prevent="register">
                    <v-container>  
                       <h3>Register</h3>
                    </v-container>
                    <v-container>
                        First name
                        <v-text-field
                        class="input-class"
                        label="Full name"
                        placeholder="Full name"
                        outlined
                        v-model="firstname"
                    ></v-text-field>
                    Last name
                        <v-text-field
                        class="input-class"
                        label="Last name"
                        placeholder="Last name"
                        outlined
                        v-model="lastname"
                    ></v-text-field>
                        Email
                        <v-text-field
                        class="input-class"
                        label="Email"
                        placeholder="Email"
                        outlined
                        v-model="email"
                    ></v-text-field>
                        Phone number
                        <v-text-field
                        class="input-class"
                        label="Phone number"
                        placeholder="Phone number"
                        outlined
                        v-model="phonenumber"
                    ></v-text-field>
                        Password
                        <v-text-field
                        class="input-class"
                        label="Password"
                        placeholder="Password"
                        outlined
                        v-model="password"
                    ></v-text-field>
                    <v-container>
                        Already have login and password? <router-link to="/login">Sign in</router-link>
                    </v-container>
                    <v-btn
                        type="submit"
                        color="blue darken-1"
                        dark
                        >
                        Sign up
                        </v-btn>
                    </v-container>
                    </form>
                </v-card>
          </v-row>
      </v-container>
    </v-app>
</template>

<script>
  export default {
    data(){
      return {
        firstname : "",
        lastname : "",
        email : "",
        phonenumber : "",
        password : "",
      }
    },
     methods: {
      register: function () {
        let data = {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          phone: this.phonenumber,
          password: this.password,
          role: "Customer",
          status: false,
          location: "Kenya",
          apps: [
            {
            app_name: "Free Trial",
            icon: "flaticon-app",
            api_key: "608d86be73ea8",
            username: "yote",
            sender_id: "22136"
            }
          ]
        }
        this.$store.dispatch('register', data)
       .then(() => this.$router.push('/login'))
       .catch(err => console.log(err))
      }
    }
  }
</script>

<style>
.input-class {
    min-height: 10px;
}
a {
  text-decoration: none;
}
</style>