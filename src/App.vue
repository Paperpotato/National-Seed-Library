<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <!-- <div class="d-flex align-center">
        <v-icon>mdi-seed</v-icon>

        <h2>Seedr</h2>
      </div> -->


      <!-- <v-spacer></v-spacer> -->
      <!-- Welcome, {{user.nwame}} -->
      <!-- <Settings /> -->
      <!-- <Lookup /> -->
          <NavDrawer />
        <v-btn v-if='$route.name !== "Profile"' class="blue darken-3" rounded @click="$router.push('/profile')"
        >Profile</v-btn>
                <v-btn v-if='$route.name === "Profile"' class="blue darken-3" rounded @click="$router.push('/')"
        >Home</v-btn>
      <Login class='mx-2' v-if='!loggedIn' />

      <v-btn v-if='loggedIn' class='mx-2 red darken-3' @click='signOut' rounded>Log Out</v-btn>

    </v-app-bar>

    <v-main>
      <!-- <HelloWorld /> -->
      <!-- <Profile /> -->
    <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import Login from '@/components/Login.vue';
// import HelloWorld from './components/HelloWorld.vue'
// import Profile from './views/Profile.vue'
import { fbAuth } from './services/firebase'
// import Settings from './components/Settings.vue'
import NavDrawer from '@/components/NavDrawer.vue';
// import Lookup from '@/components/Lookup.vue';
// import VueSession from 'vue-session'

export default Vue.extend({
  name: "App",

  components: {
    Login,
    // Settings,
    NavDrawer,
    // Lookup
    // HelloWorld,
    // Profile,
  },

  data: () => ({
    //
  }),
  computed: {
    ...mapState(["user", 'loggedIn']),
  },
  created() {
    //@ts-expect-error
    this.$session.clear()
  },
  methods: {
    signOut() {
      fbAuth.signOut()
      this.$store.commit('SIGN_OUT')
      console.log('signed out')
    }
  }
});
</script>
