<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Plant Look-Up
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Plant Look-Up</v-card-title>
        <v-card-text text='meow'>
          Use this to look up plants you're unfamililar with. You may need to do another search from Wikipedia or Google :) 
        </v-card-text>

        <v-text-field v-model='searchTerm' persistent-hint hint='eg. "coconut"' prepend-icon="mdi-magnify" ></v-text-field>
        <v-btn @click='search()' class='green'>Search!</v-btn>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        searchTerm: ''
      }
    },
    computed: {
      trefleURL() {
        return `https://trefle.io/api/v1/plants?token=KbnhY6usaQ2DBPTAc1yJEkCYzC0nHaxaplke0f20dNI&q=${this.searchTerm}`
      } 

    },
    methods: {
      //***** note: Will need to set up glitch server to call the API as per (https://github.com/treflehq/trefle-api/issues/23). Trefle does not allow API calls from client-side only */
      search() {
        console.log(this.trefleURL)
        fetch(this.trefleURL, {method: 'GET'}).then(response => {
          console.log(response)
          response.json()
        })
        .then(data => console.log(data))
      }
    }
  }
</script>