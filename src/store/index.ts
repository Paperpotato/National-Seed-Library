import Vue from 'vue'
import Vuex from 'vuex'
import { dbSeedBank, fbAuth, dbUserRef, dbPublicUserRef, dbWishlist } from '../services/firebase';
import SeedBank from '@/components/SeedBank.vue';
import { email } from 'vee-validate/dist/rules';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: 'testUserName' as string,
      email: 'testEmail' as string,
      location: 'testLocation' as string,

    },
    profile: {
      name: 'My Hoard' as string,
      email: '' as string,
      location: 'sample location' as string,
      wishlist: [] as { name: string; contact: string; location: string}[],
      seedBank: [] as {
        id: string;
        name: string;
        quantity: number;
        location: string;
        notes: string;
        contact: string;
        available: boolean;
        keeper: string;
      }[]
        },
    seedBank: [{}],
    loggedIn: false as boolean,
    loginDialog: false as boolean
  },
  mutations: {
    SET_SEED_BANK(state) {
      console.log(state)
      dbSeedBank.doc(`?public=${state.user.email}`).get().then(doc => console.log(doc.data()))
      // state.seedBank.push(meow)
    },
    SET_PROFILE(state, docData) {
      console.log(docData)
      state.user.email = docData.email
      state.user.name = docData.name
      state.loggedIn = true
      // state.profile.name = docData.name
      // state.profile.email = docData.email
      // state.profile.location = docData.location
      state.profile.email = docData.email
      state.profile.name = docData.name
      state.profile.location = docData.location
      state.profile.seedBank = docData.seedBank ? docData.seedBank : []
      state.profile.wishlist = docData.wishlist ? docData.wishlist : []
    },
    SIGN_OUT(state) {
      state.loggedIn = false
      state.profile.email = ''
      state.profile.location = ''
      state.profile.name = ''
      state.profile.seedBank = []
      state.profile.wishlist = []
      state.user.email = ''
      state.user.name = ''
    }

  },
  actions: {
    resetPassword() {
      fbAuth.sendPasswordResetEmail(this.state.user.email).then( () => {
        alert(`Email sent to ${this.state.user.email}, please check your junk folder and follow the links to reset your password :)`)
      }).catch(function (error) {
        alert(error)
      });
    },
    getProfile(context) {
      fbAuth.onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
          //@ts-expect-error
          dbUserRef.doc(user.email).get().then(doc => {
            context.commit('SET_PROFILE', doc.data())
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.state.loggedIn = false
          // this.state.loginDialog = true
        }
      });
      
    },
    addToWishlist(context, seed: string) {
      this.state.profile.wishlist.push({ name: seed, contact: this.state.profile.email, location: this.state.profile.location })
      context.dispatch('updateDB')
    },
    updateDB() {
      console.log(this.state.profile.wishlist)
      dbUserRef.doc(this.state.profile.email).set(this.state.profile)
      dbSeedBank.doc(this.state.profile.email).set({user: this.state.profile.name, seedBank: this.state.profile.seedBank})
      dbPublicUserRef.doc(this.state.profile.name).set({ user: this.state.profile.name, seedBank: this.state.profile.seedBank })
      dbWishlist.doc(this.state.profile.name).set({user: this.state.profile.name, wishlist: this.state.profile.wishlist})
    }

  },
  modules: {},
})
