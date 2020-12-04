import { dbUserRef } from '../services/firebase';
<template>
  <v-card class='ma-4'> 
    <v-card-title>
      Users
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="name"
        show-expand
        class="elevation-1"
        dense
        items-per-page=1000
    >
        <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">More info about {{ item.name }}</td>
        </template>
    </v-data-table>
  </v-card>
</template>

<script lang='ts'>
import { dbUserRef } from '../services/firebase'
  export default {
    data () {
      return {
        search: '',
        expanded: [],
        singleExpand: false,
        headers: [
        { text: 'name', value: 'name' },
        { text: 'email', value: 'email' },
        { text: 'location', value: 'location' },
        ],
        users: [
          {
            name: 'test name',
            email: 'sample email',
            location: 'sample location'
          },
        ] as { name: string; email: string; location: string }[],
      }
    },
    created() {
        this.$store.dispatch('getProfile')

        dbUserRef.get().then(querySnapshot => {
          const userArray = [] as { name: string; email: string; location: string }[]
        //   console.log(querySnapshot.docs)
          querySnapshot.forEach((doc) => {
            const docData = doc.data()
            console.log(docData)

                userArray.push({
                name: docData.name,
                email: docData.email,
                location: docData.location
              })
              
            
          })
          this.users = userArray

        })
        .catch(error => {
          console.log('error getting documents: ', error)
        })
    }
  }
</script>