<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="400">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="orange"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Community Requests
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Community Requests</v-card-title>
        <v-card-text text='meow'>
          Hi there! You can click on the items to check out the user's collection and see if they have anything that might interest you. This will open a tab for you to send an email :)
        </v-card-text>
      <v-list
        nav
        dense
      >
        <v-list-item-group v-model="item" color="primary">
          <v-list-item
            v-for="(item, i) in wishlist"
            :key="i"
            @click='profileLink(item.user, item.contact, item.name, item.location)'
          >
            <v-list-item-icon>
              <v-icon>mdi-seed-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
              <v-list-item-subtitle>{{item.user}}: {{item.location}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { dbWishlist } from '@/services/firebase'
  export default {
    data () {
      return {
        dialog: false,
        item: 0,
        wishlist: []
      }
    },
    computed: {
      // wishlist() {
      //   return 'meow'
      // }
    },
    methods: {
      profileLink(username, contact, itemName, location) {
        const encodedUsername = encodeURIComponent(username)
        const encodedSubject = encodeURIComponent(`${itemName}: ${location}`)
        window.open(`https://nationalseedlibrary.com/#/user/${encodedUsername}`)
        window.open(`mailto:${contact}?&subject=${encodedSubject}`);
      },
    },
    created() {
          dbWishlist.get().then(querySnapshot => {
          const seedArray = []
          querySnapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data())
            const docData = doc.data()

            docData.wishlist.forEach((seed) => {
            
                seedArray.push({
                  user: docData.user,
                  name: seed.name,
                  contact: seed.contact ? seed.contact : '',
                  location: seed.location
            })
              
            })
            
          })
          this.wishlist = seedArray
          // this.loading = false
        })
        .catch(error => {
          console.log('error getting documents: ', error)
        })
    }
  }
</script>