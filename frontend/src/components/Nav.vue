<template>
  <v-list color="transparent" class="d-flex justify-start"
          :class="{
    'justify-start': this.vertical,
    'justify-end': !this.vertical
  }">
    <v-list-item-group class='d-flex'
                       :class="{
      'flex-column': this.vertical
    }">
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
</template>

<script>
export default {
  name: "Nav",
  props: {
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
