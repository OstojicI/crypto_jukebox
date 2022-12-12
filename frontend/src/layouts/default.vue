<template>
  <v-app dark>
    <v-main class="bg-img">
      <v-container>
        <v-list color="transparent" class="d-flex justify-end">
            <v-list-item-group class="d-flex">
              <v-list-item target="_blank" href="https://www.linkedin.com/in/ivan-ostoji%C4%87-5b29a9189/">
                <v-list-item-icon>
                  <v-icon
                    large
                  >
                    mdi-linkedin
                  </v-icon>
                </v-list-item-icon>
                <h3>Linkedin</h3>
              </v-list-item>
              <v-list-item target="_blank" href="https://github.com/OstojicI">
                <v-list-item-icon>
                  <v-icon
                    large
                  >
                    mdi-github
                  </v-icon>
                </v-list-item-icon>
                <h3>Github</h3>
              </v-list-item>
              <v-list-item target="_blank" href="https://ivanostojic.medium.com/">
                <v-list-item-icon>
                  <img src="@/assets/images/icons8-medium (3).svg" width="36" alt="">
                </v-list-item-icon>
                <h3>Medium</h3>
              </v-list-item>
            </v-list-item-group>
        </v-list>

      </v-container>

      <v-container>
        <Nuxt/>
      </v-container>
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
      title: 'Vuetify.js'
    }
  }
}
</script>

<style scoped>
.bg-img {
  background: #0798ec;
  background-size: cover;
}
</style>
