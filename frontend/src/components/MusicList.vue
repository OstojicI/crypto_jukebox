<template>
  <v-data-table
    @click:row="handleRowClick"
    :headers="headers"
    :items="songs"
    :items-per-page="10"
    class="elevation-1 blue lighten-2"
    :dark="true"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
    </template>
  </v-data-table>

</template>

<script>
export default {
  name: 'music-list',
  props: {
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'Song name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {text: 'Author', value: 'author'},
        {text: 'Length', value: 'length'},
      ],
    }
  },

  methods: {
    handleRowClick(item) {
      this.$emit('openModal', item)
    },
  }
}
</script>
