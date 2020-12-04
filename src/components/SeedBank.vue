<template>
  <v-container>
    <v-row class="text-center">
<!-- Add to dev dependencies when ready to reinstall PWA -->
    <!-- "@vue/cli-plugin-pwa": "^4.5.4", -->


      <v-col class="m-1">
        <h2 class=" font-weight-bold mb-3">
          {{ title }}
        </h2>

      </v-col>
    </v-row>
          <v-row>
        <v-col>
          <Instructions />
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
          <Requests />
        </v-col>
        <v-spacer />
        <v-col>
          <Quarantine />
        </v-col>
        <v-spacer />
        <v-col>
          <v-btn class='blue' @click.prevent='share'>Share to facebook</v-btn>
        </v-col>
      </v-row>

    <!-- **dialog (seed request form)** -->

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">

        <v-card>
          <v-card-title>
            <span class="headline">Request Seeds</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field label="Name" disabled v-model='profile.name' required></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    label="Email"
                    v-model='profile.email'
                    disabled
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col>
                                <v-col cols="4" sm="4" md="4">
                  <v-text-field
                    label="Contact"
                    hint="Person to contact for seeds"
                    persistent-hint
                    required
                    disabled
                    v-model='modalEmail'
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="requested seed/plant"
                    required
                    v-model="modalItemName"
                  ></v-text-field>
                </v-col>
                <v-col cols='6'>
                  <v-checkbox label='Include link to My Profile/Collection' required v-model='profileCheckbox'></v-checkbox>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    label="Message"
                    v-model='emailBody'
                    required
                    hint="Consider offering something to swap or postage costs :)"
                    persistent-hint
                    row-height="1"
                    auto-grow
                  ></v-textarea>
                </v-col>

              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
              <v-btn color="orange darken-1" text @click="visitProfile()"
              >Visit Keeper's Profile</v-btn
            >
            <v-spacer></v-spacer>

            <v-btn color="blue darken-1" text @click="dialog = false"
              >Close</v-btn
            >
            <v-btn color='green' @click.prevent='sendEmail()'>Send email</v-btn>

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
      <template>
        <v-card>
          <v-card-title>
            Community Seed Bank
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search/Filter"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
              <v-data-table
                :headers="headers"
                :items="seedList"
                sort-by="name"
                class="elevation-1"
                :items-per-page.sync="itemsPerPage"
                :page="page"
                :search="search"
                :sort-desc="sortDesc"
                hide-default-footer
                v-if='!loading'
              >
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
              <template @click="openModal(item)" v-slot:item.actions="{ item }">
        <v-icon small class="ma-2" @click="openModal(item)">
          mdi-email
        </v-icon>
      </template>
              </v-data-table>
        </v-card>
      </template>

<!-- data iterator -->
      <!-- <v-data-iterator
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
                <v-card-title class="subheading font-weight-bold"><v-icon class='mr-3'>mdi-seed</v-icon> {{
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
                      >{{ item[key] }}</v-list-item-content
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
      </v-data-iterator> -->


    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { dbSeedBank, dbUserRef } from '@/services/firebase';
// import SeedBank from '@/components/SeedBank.vue';
import { fbAuth } from '../services/firebase'
import Instructions from '@/components/Instructions.vue';
import Requests from '@/components/Requests.vue';
import { mapState } from 'vuex';
import Quarantine from '@/components/Quarantine.vue';
// import Login from '@/components/Login.vue';

export default Vue.extend({
  name: "HelloWorld",
  components: {
    Instructions,
    Requests,
    Quarantine
    // Login
  },
  data: () => ({
        headers: [
      {
        text: 'name',
        value: 'name',
      },
      { text: 'quantity', value: 'quantity' },
      { text: 'location', value: 'location' },
      { text: 'keeper', value: 'keeper' },
      { text: 'notes', value: 'notes' },
      { text: 'contact', value: 'actions', sortable: false },
    ],
    // email: '' as string,
    username: '' as string,
    location: '' as string,
    // password: '' as string,
    // loginDialog: false as boolean,
    loading: false as boolean,
    emailBody: '' as string,
    subject: 'Seed request :)' as string,
    modalEmail: 'cheese' as string,
    dialog: false as boolean,
    modalItemName: "" as string,
    modalKeeper: "" as string,
    title: "Seedr: National Seed Library Australia" as string,
    itemsPerPageArray: [250, 500, 1000] as number[],
    itemsPerPage: 250 as number,
    keys: ["name", "quantity", "notes", "location", 'keeper'] as string[],
    search: "",
    filter: {},
    sortDesc: false,
    page: 1,
    sortBy: "name",
    seedList: [] as {}[],
    profileCheckbox: true as boolean
  }),
  computed: {
    ...mapState(['profile']),
    numberOfPages(): number {
      return Math.ceil(this.seedList.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== `Name`);
    },
    encodeSubject() {
      return encodeURIComponent(this.modalItemName)
    },
    encodeBody() {
      return encodeURIComponent(this.emailBody)
    },
    encodeKeeper() {
      return encodeURIComponent(this.modalKeeper)
    },
    profileLink() {
      const encodedUsername = encodeURIComponent(this.profile.name)
      return encodeURIComponent(`\n\nLink to my profile: https://nationalseedlibrary.com/#/user/${encodedUsername}`)
    }
  },
  methods: {
    sendEmail() {
      if(this.profileCheckbox) {
        window.open(`mailto:${this.modalEmail}?&subject=${this.encodeSubject}&body=${this.encodeBody}${this.profileLink}`);
      } else {
        window.open(`mailto:${this.modalEmail}?&subject=${this.encodeSubject}&body=${this.encodeBody}`);
      }
      this.emailBody = ''
    },
    visitProfile() {
      window.open(`https://nationalseedlibrary.com/#/user/${this.encodeKeeper}`)
    },
    share() {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fseedrs.netlify.app%2F%23%2F&amp;src=sdkpreparse`);
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
    openModal(item: { name: string; contact: string; keeper: string }): void {
      console.log(item);
      if(!this.$store.state.loggedIn) {
        this.$store.state.loginDialog = true
      } else {
        this.dialog = true;
        this.modalItemName = item.name;
        this.modalEmail = item.contact;
        this.modalKeeper = item.keeper;
      }


    },
  },
  created() {
    this.$store.dispatch('getProfile')

    this.loading = true

        dbSeedBank.get().then(querySnapshot => {
          const seedArray = [] as {}[]
          querySnapshot.forEach((doc) => {
            const docData = doc.data()

            docData.seedBank.forEach((seed: { id: string; name: string; quantity: number; notes: string; location: string; contact: string; available: boolean; keeper: string }) => {
              
              if (seed.quantity > 0 && seed.available) {
                seedArray.push({
                  id: seed.id,
                  name: seed.name,
                  quantity: seed.quantity,
                  notes: seed.notes,
                  location: seed.location,
                  contact: seed.contact,
                  keeper: seed.keeper
            })
              }
            })
            
          })
          this.seedList = seedArray
          this.loading = false
        })
        .catch(error => {
          console.log('error getting documents: ', error)
        })
    
  }
});
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}</style>
