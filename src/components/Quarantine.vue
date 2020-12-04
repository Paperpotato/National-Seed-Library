<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="710">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Quarantine Rules
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Quarantine Rules</v-card-title>
        <!-- <v-card-subtitle>Hi there!</v-card-subtitle> -->
        <v-card-text text='meow'>
          Please adhere to all relevant quarantine rules, which vary by state in Australia. 
        </v-card-text>
        <v-card-text>
          To check out what you can export and import into WA, use <v-btn color='green' text small @click='toWARules()'>This Link</v-btn>  
        </v-card-text>
        <v-card-text>
          For all other states, please refer to the relevant state <v-btn color='green' text small @click='toOtherRules()'>Here</v-btn>
        </v-card-text>
        <v-card-text>
          It is your responsibility to find out what you can and cannot send in Australia, and may incur heavy fines for breaching biosecurity laws in Australia
        </v-card-text>
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
      }
    },
    methods: {
      toWARules() {
        window.open('https://www.agric.wa.gov.au/organisms')
      },
      toOtherRules() {
        window.open('https://www.agric.wa.gov.au/exporting-animals/quarantine-export-restrictions')
      }
    }
  }
</script>