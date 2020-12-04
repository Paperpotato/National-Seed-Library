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
          Terms of Use
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Terms of Use</v-card-title>
        <v-card-text text='meow'>
          Hi there! 
          Thanks for checking us out. We're an open-source repository of seeds, populated by seed-savers all across Australia. By signing up, you agree that: 1. You will abide by your state's quarantine laws. 2. Information you share will be publicly viewable by those who peruse this site. Your information will not be used by the creator of this site for nefarious reasons, ever. 3. This is a community-driven initiative. Any reports of abuse will result in termination of your account.
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
  }
</script>