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
          {{$route.params.username}}'s Wishlist
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">{{$route.params.username}}'s Wishlist</v-card-title>
      <v-list
        nav
        dense
      >
        <v-list-item-group v-model="item" color="primary">
          <v-list-item
            v-for="(item, i) in wishlist"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon>mdi-seed-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
              <!-- <v-list-item-subtitle v-text='item.user'></v-list-item-subtitle> -->
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
import { mapState } from 'vuex';
  export default {
    data () {
      return {
        dialog: false,
        item: 0,
        wishlist: [],
        email: ''
      }
    },
    computed: {
      ...mapState(['profile']),
      decodedUsername() {
        return decodeURIComponent(this.$route.params.username)
      }
    },
    methods: {
      profileLink(username) {
        const encodedUsername = encodeURIComponent(username)
        return window.open(`https://seedrs.netlify.app/#/user/${encodedUsername}`)
      },
    },
    created() {
      this.$store.dispatch('getProfile')
      console.log(this.decodedUsername)
          dbWishlist.doc(this.decodedUsername).get().then(doc => {
          const seedArray = []
          doc.data().wishlist.forEach((seed) => {
            
                seedArray.push({
                  user: this.decodedUsername,
                  name: seed
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