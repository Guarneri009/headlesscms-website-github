<template>
  <div>
    <v-btn v-on:click="goNew" color="deep-purple darken-1">
      記事を書く
    </v-btn>
    <v-btn color="blue-grey" v-on:click="signOut" v-if="isAuthenticated"
      >サインアウト</v-btn
    >
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" text>Support<v-icon>mdi-menu-down</v-icon></v-btn>
      </template>
      <v-list flat>
        <v-subheader>Get help</v-subheader>
        <v-list-item v-for="support in supports" :key="support.name" dense>
          <v-list-item-icon>
            <v-icon>{{ support.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ support.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data() {
    return {
      supports: [
        { name: 'Consulting and suppourt', icon: 'mdi-vuetify' },
        { name: 'Discord community', icon: 'mdi-discord' },
        { name: 'Report a bug', icon: 'mdi-bug' },
        { name: 'Github issue board', icon: 'mdi-github-face' },
        { name: 'Stack overview', icon: 'mdi-stack-overflow' },
      ],
    }
  },
  async created() {},
  computed: {
    isAuthenticated() {
      return this.$store.state.authenticate.authenticated
    },
    loggedInUser() {
      return this.$store.state.authenticate.username
    },
  },
  methods: {
    signOut: function() {
      this.$store.dispatch('authenticate/signOut')
      this.$router.push('/')
    },
    goNew() {
      this.$router.push({ path: '/new' })
    },
  },
}
</script>
