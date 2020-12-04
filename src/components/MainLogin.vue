<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="green"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Log In
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Log in to contact users and request seeds :)</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md='6'>
                <v-text-field label="Email*" required v-model='email'></v-text-field>
              </v-col>
              <v-col cols="12" md='6'>
                <v-text-field label="Password*" type="password" v-model='password' required></v-text-field>
              </v-col>

            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="logIn()">Log In (add reset password feature)</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {fbAuth} from '../services/firebase'
  export default {
    data: () => ({
      dialog: false,
      email: '',
      password: ''
    }),
    methods: {
        logIn() {
            fbAuth.signInWithEmailAndPassword(this.email, this.password).then(
                meow => {
                    console.log(meow)
                    this.dialog = false
                    this.$store.state.loggedIn = true
                }
            )
            .catch(error => {
                alert(`Error logging in: ${error}`)
            })
        }
    }
  }
</script>