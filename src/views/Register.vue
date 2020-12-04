<template >

<v-card max-width='400px' class="mx-auto pa-7">

    <v-card-title align='center' justify='center'>
    Register
  </v-card-title>
  <!-- eslint-disable-next-line -->
  <ValidationObserver ref="observer" v-slot="{ validate, reset }">
    <form>
      <ValidationProvider v-slot="{ errors }" name="Username/Name" rules="required|max:25">
        <v-text-field
          prepend-icon="mdi-account"
          v-model="name"
          :counter="20"
          :error-messages="errors"
          label="Name"
          required
          hint='Please think of a unique, one-word name :)'
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="E-mail" rules="required|email">
        <v-text-field
          prepend-icon="mdi-mail"
          v-model="email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="E-mail" rules="required|email">
        <v-text-field
          prepend-icon="mdi-mail"
          v-model="email2"
          :error-messages="errors"
          label="Please confirm your E-mail"
          required
        ></v-text-field>
      </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Password" rules="required|max:25">
        <v-text-field
          prepend-icon="mdi-cat"
          v-model="password"
          :counter="20"
          :error-messages="errors"
          label="Password"
          required
          type='password'
        ></v-text-field>
      </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Password" rules="required|max:25">
        <v-text-field
          prepend-icon="mdi-cat"
          v-model="password2"
          :counter="20"
          :error-messages="errors"
          label="Please confirm your password"
          required
          type='password'

        ></v-text-field>
      </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Location" rules="required|max:25">
        <v-text-field
          prepend-icon="mdi-map"
          v-model="location"
          :counter="10"
          :error-messages="errors"
          label="Location (state)"
          required
        ></v-text-field>
      </ValidationProvider>
      <!-- <ValidationProvider v-slot="{ errors }" name="select" rules="required">
        <v-select
          v-model="select"
          :items="items"
          :error-messages="errors"
          label="Select"
          data-vv-name="select"
          required
        ></v-select>
      </ValidationProvider> -->
      <!-- eslint-disable-next-line -->
      <ValidationProvider v-slot="{ errors, valid }" rules="required" name="checkbox">
        <v-checkbox
          v-model="checkbox"
          :error-messages="errors"
          value="1"
          label="I agree to the Terms of Use"
          type="checkbox"
          required
        ></v-checkbox>
      </ValidationProvider>
      <v-card-actions>
        <TermsModal />
        <v-spacer />
        <v-btn class='green darken-7' @click="register">Register</v-btn>
      </v-card-actions>
    

    </form>
  </ValidationObserver>


</v-card>



</template>

<script>
  import { required, email, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import TermsModal from '@/components/TermsModal.vue';
import { fbAuth, dbUserRef } from '../services/firebase'

  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  export default {

    components: {
      ValidationProvider,
      ValidationObserver,
      TermsModal
    },
    data: () => ({
      loading: false,
      name: '',
      email: '',
      email2: '',
      password: '',
      password2: '',
      location: '',
      checkbox: null,
    }),
    computed: {
      trimmedEmail() {
        return this.email.trim()
      }
    },
    methods: {
      register() {
        this.loading = true
         this.$refs.observer.validate()
         if(this.email === this.email2 && this.password === this.password2) {
        fbAuth.createUserWithEmailAndPassword(this.trimmedEmail, this.password).catch(function(error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage)
            // ...
        })
        .then(meow => {
            dbUserRef.doc(this.trimmedEmail).set({name: this.name, email: this.trimmedEmail, location: this.location})

            fbAuth.currentUser.sendEmailVerification().then(() => {
              console.log(meow) 
              alert(`Welcome, ${this.name}!\nPlease check your email (and junk folder) to verify your email :)`)
              this.$router.push('/')
              // Email sent.
            }).catch(function(error) {
              alert(error)
              // An error happened.
            });

        })
        } else if (this.email !== this.email2) {
          alert('Please check that your emails match')
        } else {
          alert('Please check that your passwords match')
        }

      },
      clear () {
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$refs.observer.reset()
      },
    },
  }
  //client ID
  //360847296911-4kn6l1escii3hp3634tqet628gd643a9.apps.googleusercontent.com

</script>