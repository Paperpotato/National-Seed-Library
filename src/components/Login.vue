<template>
  <v-row justify="center">
    <v-dialog v-model="$store.state.loginDialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="teal"
          dark
          v-bind="attrs"
          v-on="on"
          v-if='!loggedIn'
          rounded
        >
          Log In
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Log in :)</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md='6'>
                <v-text-field prepend-icon="mdi-mail" label="Email" required v-model='email'></v-text-field>
              </v-col>
              <v-col cols="12" md='6'>
                <v-text-field prepend-icon="mdi-cat" label="Password" type="password" v-model='password' required></v-text-field>
              </v-col>

            </v-row>
          </v-container>
          <v-btn text color='orange' @click='resetPassword()'>Reset Password</v-btn>
        </v-card-text>
        <v-card-actions>

          <v-btn color='blue darken-1' @click='register()'>Register</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" @click="$store.state.loginDialog = false">Close</v-btn>
          <v-btn color="green darken-1" @click="logIn()">Log In</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {fbAuth} from '../services/firebase'
import { mapState } from 'vuex'
  export default {
    data: () => ({
      // dialog: false,
      email: '',
      password: ''
    }),
    computed: {
      ...mapState(['loggedIn']),
      trimmedEmail() {
        return this.email.trim()
      }
    },
    methods: {
        logIn() {
            fbAuth.signInWithEmailAndPassword(this.trimmedEmail, this.password).then(
                meow => {
                    console.log(meow)
                    this.dialog = false
                    this.$store.state.loggedIn = true
                }
            )
            .catch(error => {
                alert(`Error logging in: ${error}`)
            })
        },
        resetPassword() {
            fbAuth.sendPasswordResetEmail(this.trimmedEmail).then(function() {
                alert(`Password reset email has been sent to ${this.trimmedEmail}. Please check also check your junk folder :)`)
            // Email sent.
            }).catch(function(error) {
                alert(error)

            });
        },
        register() {
          this.dialog = false
          this.$router.push('/register')
        }
    }
  }
</script>