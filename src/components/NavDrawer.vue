<template>
  <v-container
  >
    <v-container>

        <v-btn
          color="orange"
          dark
          @click.stop="drawer = !drawer"
          rounded
        >Wishlist
        </v-btn>

    </v-container>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      app
    >


      <v-divider></v-divider>
            <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-sprout</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Wish List</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list class='ma-3' dense>
        <v-form>

        <v-row>
          <v-col cols='8'>
        <v-text-field v-model='wish' label='Add to wishlist'></v-text-field>

          </v-col>
          <v-col cols='3'>
        <v-btn class='primary' small @click='addSeed'>Add</v-btn>

          </v-col>
        </v-row>
                </v-form>


        <v-list-item
          v-for="item in profile.wishlist"
          :key="item.name"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-seed-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon @click='remove(item)'>
            <v-icon>mdi-close</v-icon>
          </v-list-item-icon>

        </v-list-item>
      </v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-treasure-chest</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Your seeds</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
              <v-list dense>

        <v-list-item
          v-for="item in profile.seedBank"
          :key="item.name"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-seed</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{item.quantity}} x {{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    data () {
      return {
        drawer: null,
        wish: '',
      }
    },
    computed: {
        ...mapState(['user', 'profile'])
    },
    methods: {
      addSeed() {
        this.$store.dispatch('addToWishlist', this.wish)
        console.log(this.$store.state.profile.wishlist)
        this.wish = ''
      },
      remove(seed) {
        const i = this.$store.state.profile.wishlist.findIndex(meow => meow === seed)
        this.$store.state.profile.wishlist.splice(i, 1)
        this.$store.dispatch('updateDB')
      }
    }
    //
  }
</script>