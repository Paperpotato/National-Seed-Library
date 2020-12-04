<template>
  <v-container>
    <!-- <v-btn class="primary" @click="test()">test</v-btn> -->
      <v-container>
    <v-row class="text-center">


      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">
          {{ title }}
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ProfileRequest />
      </v-col>
      <v-spacer />
      <v-col>
        <v-btn class='green' @click.prevent='contact()'>Contact</v-btn>
      </v-col>
    </v-row>
    <!-- **dialog** -->

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">
        <!-- <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Open Dialog
          </v-btn>
        </template> -->
        <v-card>
          <v-card-title>
            <span class="headline">Request Seeds</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field label="Name" v-model='profile.name' disabled required></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    label="Email"
                    hint="example of helper text only on focus"
                    v-model='profile.email'
                    disabled
                  ></v-text-field>
                </v-col>
                                <v-col cols="2" sm="4" md="4">
                  <v-text-field
                    label="Contact"
                    hint="Person to contact for seeds"
                    persistent-hint
                    required
                    disabled
                    v-model='modalEmail'
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="requested seed/plant"
                    required
                    v-model="modalItemName"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    label="Message"
                    v-model='emailBody'
                    required
                    hint="Consider offering something to swap or postage costs :)"
                    persistent-hint
                  ></v-textarea>
                </v-col>

              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="blue darken-1" text @click="dialog = false"
              >Close</v-btn
            >
            <v-btn color="blue darken-1" text @click="sendEmail()"
              >Send email</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
<!-- loading circle -->
    <v-container fluid>
        <v-card
    class="mx-auto"
    max-width="400"
    outlined
    v-if='loading'
  >
            <v-progress-circular
              :size='35'
              color="green"
              indeterminate

            ></v-progress-circular>
            Loading: fetching seeds from database
        </v-card>

      <v-data-iterator
        :items="seedList"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
        v-if='!loading'
      >
        <template v-slot:header>
          <v-toolbar dark color="blue darken-3" class="mb-1">
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-sort-alphabetical-ascending"
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn large depressed color="blue" :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn large depressed color="blue" :value="true">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-row>
 
            <v-col
              v-for="(item, i) in props.items"
              :key="i"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >


              <v-card @click="openModal(item)">
                <v-card-title class="subheading font-weight-bold">{{
                  item.name
                }}</v-card-title>

                <v-divider></v-divider>

                <v-list dense>
                  <v-list-item
                    v-for="(key, index) in filteredKeys"
                    :key="index"
                  >
                    <v-list-item-content
                      :class="{ 'blue--text': sortBy === key }"
                      >{{ key }}:</v-list-item-content
                    >
                    <v-list-item-content
                      class="align-end"
                      :class="{ 'blue--text': sortBy === key }"
                      >{{ item[key.toLowerCase()] }}</v-list-item-content
                    >
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
            

        <template v-slot:footer>
          <v-row class="mt-2" align="center" justify="center">
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-spacer></v-spacer>

            <span
              class="mr-4
            grey--text"
            >
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-iterator>


    </v-container>
  </v-container>
  </v-container>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { uuid } from 'vue-uuid'
import { dbUserRef, dbSeedBank, dbPublicUserRef } from '../services/firebase'
import 'firebase/firestore'
import ProfileRequest from '@/components/ProfileRequest.vue';

export default {
  components: {
    ProfileRequest
  },
  name: 'Profile',
  data: () => {
  return {
    loading: false,
    emailBody: '' as string,
    dialog: false as boolean,
    modalItemName: "" as string,
    itemsPerPageArray: [12, 24, 36] as number[],
    itemsPerPage: 12 as number,
    keys: ["name", "quantity", "notes", "location"] as string[],
    search: "",
    filter: {},
    sortDesc: false,
    page: 1,
    sortBy: "name",
    snack: false as boolean,
    snackColor: '' as string,
    snackText: '' as string,
    max25chars: (v: string) => v.length <= 25 || 'Input too long!',
    pagination: {},
    seedList: [] as {}[],
    headers: [
      // { text: 'id', value: 'id' },
      {
        text: 'name',
        value: 'name',
      },
      { text: 'quantity', value: 'quantity' },
      { text: 'location', value: 'location' },
      { text: 'notes', value: 'notes' },
      { text: 'actions', value: 'actions', sortable: false },
    ],
    contactEmail: '' as string,
    uuid: '',
    emailToContact: '' as string,
        }},
  computed: {
    ...mapState(['loggedIn', 'profile']),
    title(): string {
      return `${this.$route.params.username}'s Hoard` as string
    },
    modalEmail(): string {
      return this.profile.email
    },
    codedSubject(): string {
      return encodeURIComponent(this.modalItemName)
    },
    codedEmailBody(): string {
      return encodeURIComponent(this.emailBody)
    },
    numberOfPages(): number {
      return Math.ceil(this.seedList.length / this.itemsPerPage) as number;
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== `Name`);
    },
  },
  created() {
    this.$store.dispatch('getProfile')


    const currentPath = this.$route.params.username
    // console.log(currentPath)

    this.loading = true
        dbPublicUserRef.doc(this.$route.params.username).get().then(doc => {
          const seedArray = [] as {}[]

          //@ts-expect-error
          doc.data().seedBank.forEach((seed: { id: string; name: string; quantity: number; notes: string; location: string; contact: string }) => {
                seedArray.push({
                  id: seed.id,
                  name: seed.name,
                  quantity: seed.quantity,
                  notes: seed.notes,
                  location: seed.location,
                  contact: seed.contact
                })
            })
            this.seedList = seedArray
            this.loading = false

          })

        // .catch(error => {
        //   console.log('error getting documents: ', error)
        // })

        //         dbSeedBank.get().then(querySnapshot => {
        //   const seedArray = [] as {}[]
        //   querySnapshot.forEach((doc) => {
        //     const docData = doc.data()

        //     docData.seedBank.forEach((seed: { id: string; name: string; quantity: number; notes: string; location: string; contact: string; available: boolean; keeper: string }) => {
              
        //       if (seed.quantity > 0 && seed.available) {
        //         seedArray.push({
        //           id: seed.id,
        //           name: seed.name,
        //           quantity: seed.quantity,
        //           notes: seed.notes,
        //           location: seed.location,
        //           contact: seed.contact,
        //           keeper: seed.keeper
        //     })
        //       }
        //     })
            
        //   })
        //   this.seedList = seedArray
        //   this.loading = false
        // })
        // .catch(error => {
        //   console.log('error getting documents: ', error)
        // })
    
  },
  methods: {
    test(): void {
    //   this.$store.commit('SET_SEED_BANK')
    console.log(this.$route.params.username)
            dbPublicUserRef.doc(this.$route.params.username).get().then(doc => console.log(doc.data()))

    },
    contact() {
      console.log(this.contactEmail)
      if(this.loggedIn) {
      dbPublicUserRef.doc(this.$route.params.username).get().then(doc => {
        console.log(doc.data())
        //@ts-expect-error
        if (doc.data().seedBank.length > 0) {
          //@ts-expect-error
          this.contactEmail = doc.data().seedBank[0].contact
          window.open(`mailto:${this.contactEmail}`);
        } else {
          alert('This person cannot be contacted yet :(')
        }
      })
    } else {
      alert('Please log in or register to contact this person')
      this.$store.state.loginDialog = true
    }

      // if(this.loggedIn) {
      //   // console.log(this.codedSubject, this.codedEmailBody)
      //   window.open(`mailto:${this.contactEmail}`);
      // } else {
      //   alert('Please log in to contact this person')
      //   this.$store.state.loginDialog = true
      // }
    },
    newUUID(): void {
      this.uuid = uuid.v1()
    },
    sendEmail(): void {
      this.dialog = false
      window.open(`mailto:${this.modalEmail}?&subject=${this.codedSubject}&body=${this.codedEmailBody}`);
      this.emailBody = ''
    },
    nextPage(): void {
      //@ts-expect-error
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage(): void {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number: number): void {
      this.itemsPerPage = number;
    },
    openModal(item: { name: string; contact: string }): void {
      if(!this.$store.state.loggedIn) {
        this.$store.state.loginDialog = true
      } else {

      this.dialog = true;
      console.log(item);
      this.modalItemName = item.name;
      this.modalEmail = item.contact;
    
      }

    },
  },
  watch: {
    
  },
}
</script>

<style></style>
