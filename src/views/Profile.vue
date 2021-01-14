<template>
  <v-container>

      <v-row justify="center">
    <v-dialog v-model="$store.state.loginDialog" persistent max-width="600px">

      <v-card>
        <v-card-title>
          <span class="headline">Log in to access your profile :)</span>
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
          <v-btn color='orange' text small @click='resetPassword()'>Forgot password? Click here to reset</v-btn>
        </v-card-text>
        <v-card-actions>

          <v-btn color='blue darken-1' @click='$router.push("/register")'>Register</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" @click="close()">Close</v-btn>
          <v-btn color="green darken-1" @click="logIn()">Log In</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
    <v-data-table
      :headers="headers"
      :items="profile.seedBank"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
              <v-toolbar-title v-if='!loggedIn'>{{profile.name}}: {{(profile.email)}}</v-toolbar-title>
              <v-toolbar-title v-if='loggedIn'>{{profile.name}}'s hoard <small>({{profile.email}})</small></v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-btn class='blue' medium @click.prevent='share'>Share Profile</v-btn>
                <!-- <div class="fb-share-button" data-href="fbLink" data-layout="button" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fseedrs.netlify.app%2F%23%2Fuser%2Fusername&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div> -->
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" @click='newUUID()'
                >Add item</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field
                      disabled
                        v-model="editedItem.id"
                        label="ID *auto generated*"
                      ></v-text-field>
                    </v-col> -->
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                        autofocus
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.quantity"
                        label="Quantity"
                        type='number'
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.location"
                        label="Location (State)"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.contact"
                        label="Contact"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-checkbox
                        v-model="editedItem.available"
                        label="Available (public)"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-textarea
                        auto-grow
                        row-height="1"
                        v-model="editedItem.notes"
                        label="Notes"
                        hint='seeds/plant/variety'
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template @click="editItem(item)" v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
            <p v-if='profile.seedBank.length === 0'>There are no seeds in your collection. Click the "Add Item" button to start your horde!</p>
            <v-progress-circular
              :size='35'
              color="green"
              indeterminate
              v-if='profile.seedBank.length === []'
            ></v-progress-circular>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { uuid } from 'vue-uuid'
import { dbUserRef, dbSeedBank, dbPublicUserRef, fbAuth } from '../services/firebase'
// import firebase from 'firebase/app'
import 'firebase/firestore'
// import Login from '@/components/Login.vue';

export default {
  name: 'Profile',
  components: {
    // Login
    },
  data: () => {
  return {
    email: '' ,
    password: '' ,
    dialog: false,
    snack: false,
    snackColor: '' ,
    snackText: '' ,
    max25chars: (v) => v.length <= 25 || 'Input too long!',
    pagination: {},
    headers: [
      {
        text: 'name',
        value: 'name',
      },
      { text: 'quantity', value: 'quantity' },
      { text: 'location', value: 'location' },
      { text: 'available', value: 'available' },
      { text: 'notes', value: 'notes' },
      { text: 'actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    // editedItem: {
    //   id: uuid.v1(),
    //   name: '',
    //   quantity: null,
    //   notes: '',
    //   location: this.$store.state.profile.location,
    //   contact: this.$store.state.profile.email,
    //   available: true,
    //   keeper: this.$store.state.profile.name
    // },
    editedItem: {
      id: null,
      name: '',
      quantity: null,
      notes: '',
      location: 'loading location',
      contact: 'loading contact',
      available: true,
      keeper: 'loading keeper'
    },
    uuid: '',
        }},
  computed: {
    ...mapState(['user', 'profile', 'loginDialog', 'loggedIn']),
    formTitle() {
      return this.editedIndex === -1 ? 'Add item' : 'Edit Item'
    },
    defaultItem() {
        return {
      id: '' ,
      name: '',
      quantity: null,
      notes: '',
      location: this.$store.state.profile.location,
      contact: this.$store.state.profile.email,
      available: true,
      keeper: this.$store.state.profile.name
        }
    },
    fbLink() {
      // return `https://seedrs.netlify.app/#/user/${this.profile.name}`
      return encodeURIComponent(this.profile.name)
    }
  },
  created() {
    this.$store.dispatch('getProfile')
    
    this.editedItem.id = uuid.v1()
  },
  methods: {
    test() {
      console.log(this.profile.name)
      console.log(this.$store.state.profile)
      // this.$store.commit('SET_SEED_BANK')
    },
    share() {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fseedrs.netlify.app%2F%23%2Fuser%2F${this.fbLink}&amp;src=sdkpreparse`);
    },
    newUUID() {
      console.log('meow')
      this.uuid = uuid.v1()
      this.editedItem.id = uuid.v1()
        this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        })
      // this.defaultItem.id = uuid.v1()
      // console.log(uuid.v1())
    },
    cancel() {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    open() {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    editItem(item) {
      this.editedIndex = this.profile.seedBank.indexOf(item)
      
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.profile.seedBank.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.$store.state.profile.seedBank.splice(index, 1)
        this.$store.dispatch('updateDB')
    },
    close() {
      this.$store.state.loginDialog = false
      this.dialog = false
      this.$nextTick(() => {
        
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.$store.state.profile.seedBank[this.editedIndex], this.editedItem)
      } else {
        console.log(this.$store.state.profile)
        this.$store.state.profile.seedBank.push(this.editedItem)
        
        this.defaultItem.id = uuid.v1()
        
        this.editedItem.id = uuid.v1()
      }
      
      this.close()
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Data saved'

      this.$store.dispatch('updateDB')
      console.log(this.$store.state.profile.name)
    },
    logIn() {
    fbAuth.signInWithEmailAndPassword(this.email, this.password).then(
        user => {
            console.log(user)
            this.$store.state.loginDialog = false
            // this.dialog = false
            this.$store.state.loggedIn = true
            
            dbUserRef.doc(user.user.email).get().then(doc => {
              this.profile = doc.data()
            })
        }
    )
    .catch(error => {
        alert(`Error logging in: ${error}`)
    })
    },
    resetPassword() {
        fbAuth.sendPasswordResetEmail(this.profile.email).then(() => {
            alert(`Password reset email has been sent to ${this.profile.email}. Please also check your junk folder :)`)
        // Email sent.
        }).catch(function(error) {
            alert(error)

        });
    }
  },
  // watch: {
  //   dialog(val) {
  //     val || this.close()
  //   },
  // },
}
</script>

<style></style>
