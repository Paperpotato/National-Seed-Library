<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Instructions
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">How to use</v-card-title>
        <!-- <v-card-subtitle>Hi there!</v-card-subtitle> -->
        <v-card-text text='meow'>
          Welcome to Seedr, a seed swapping platform for gardeners and collectors. To request seeds, simply head to the main seed bank, sign up and click on a seed you wish to request. You can contact the owner via the email link. Please consider offering something in return, whether it be stamp donations or seeds from your own collection!          
        </v-card-text>
        <v-card-text>
          To set up your own collection, head over to your <v-btn color='green' text small @click='$router.push("/profile")'>profile</v-btn> and add your seeds. You can include a link to your profile in your requests to show others what you have on offer, or set up a public wishlist :) 
        </v-card-text>
        <v-card-title>
          I found a seed! What now?
        </v-card-title>
        <v-card-text>
          1. Click on the "Send Email" link, and a new tab will be opened up with a pre-configured request email. You can add to the message if you'd like, please consider offering something in return. If the link doesn't work, you can access the contact email by double-clicking the email in the field, and writing up the email yourself :)
        </v-card-text>
        <v-card-text>
          2. If the person you contacted is willing to swap or give you a seed, they'll give you their postal address to send a self-stamped and addressed envelope. Please be timely when sending your request envelope out of courtesy :) 
        </v-card-text>
        <v-card-text>
          3. Seekers: find seed => send email asking for address => send self-stamped and addressed envelope
        </v-card-text>
        <v-card-text>
          4. Keepers: receive envelope => send seeds
        </v-card-text>
        <v-card-title>
          I can't find what I'm looking for :(
        </v-card-title>
        <v-card-text>
          Go ahead and click on the Wishlist button and add to it! It will be visible to everyone; if someone has that seed, hopefully it'll be added to the bank. Also please consider starting your own profile/collection, someone might be looking for your seeds! :) 
        </v-card-text>
        <v-card-text>
          Seed swapping can be super fun and community-building. Let's grow stuff together! :) 
        </v-card-text>
        <v-card-text>
          - Kevin, Feline Overlord
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