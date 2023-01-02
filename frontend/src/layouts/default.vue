<template>
  <v-app dark>
    <v-main class="bg-img">
      <v-app-bar
        color="transparent"
        dark
      >
        <v-app-bar-nav-icon v-if="isMobile" @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-container v-if="!isMobile">
          <Nav></Nav>
        </v-container>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary>
        <Nav :vertical="isMobile"></Nav>
      </v-navigation-drawer>
      <v-container>
        <Nuxt/>
      </v-container>
      <div class="pa-5 d-flex flex-column flex-sm-row justify-center align-center col-12 col-sm-4 ma-auto">
        <v-btn
          target="_blank"
          href="https://github.com/OstojicI/crypto_jukebox"
          class="mx-5"
          outlined
          large
          height="60"
          width="100%"
        >
          <strong>SOURCE CODE</strong>
        </v-btn>
        <v-btn
          target="_blank"
          href="https://ivanostojic.medium.com/open-source-jukebox-accepting-crypto-payments-stellar-xlm-node-js-a0a00994cf90"
          outlined
          large
          height="60"
          width="100%"
        >
          <strong>MEDIUM ARTICLE</strong>
        </v-btn>
      </div>

    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      group: null
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xs;
    }
  },
  // watch: {
  //   group () {
  //     this.drawer = false
  //   },
  // },
}
</script>

<style scoped>
.bg-img {
  background: #0798ec;
  background-size: cover;
}
</style>
