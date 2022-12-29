<template>
  <v-data-table
    @click:row="handleRowClick"
    :headers="headers"
    :items="songs"
    :items-per-page="6"
    :hide-default-footer="hidePagination"
    class="row-pointer"
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
    hidePagination: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'Song name',
          align: 'start',
          sortable: true,
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

<style lang="css" scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
