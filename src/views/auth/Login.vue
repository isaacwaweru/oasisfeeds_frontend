<template>
    <v-app>
        <v-container class="card">
          <v-row
          justify="space-around"
          :class="{'ml-0': $vuetify.breakpoint.smAndDown, 'mr-0': $vuetify.breakpoint.smAndDown}"
          >
                <v-card elevation="1" width="400">
                    <form @submit.prevent="login">
                    <v-container>  
                       <h3>Login</h3>
                    </v-container>
                    <v-container>
                        Email
                        <v-text-field
                        class="input-class"
                        label="Email"
                        placeholder="Email"
                        outlined
                        v-model="email"
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
                        Don't have an account yet? <router-link to="/signup">Register now</router-link>
                    </v-container>
                    <v-btn
                        type="submit"
                        color="blue darken-1"
                        dark
                        >
                        Login
                        </v-btn>
                    </v-container>
                    </form>
                </v-card>
          </v-row>
      </v-container>
    </v-app>
</template>

<style>
.input-class {
    min-height: 10px;
}
a {
  text-decoration: none;
}
</style>

<script>
  export default {
    data(){
      return {
        email : "",
        password : ""
      }
    },
    methods: {
      login: function () {
        let email = this.email
        let password = this.password
        this.$store.dispatch('login', { email, password })
       .then(() => this.$router.push('/dashboard'))
       .catch(err => console.log(err))
      }
    }
  }
</script>