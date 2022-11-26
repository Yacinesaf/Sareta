<template>
  <v-card class="rounded-lg">
    <v-img :src="img" height="200px"></v-img>
    <v-card-title>
      <div class="text-h6" style="font-weight: 700; color: #21331d">{{ name }}</div>
    </v-card-title>
    <v-card-text>
      <div>Description</div>
      <div class="text-h6 mb-8">{{ description }}</div>
      <v-row class="mx-0" justify="space-between">
        <div>
          <div class="text-end text-h6">{{ date }}</div>
        </div>
        <div class="d-flex">
          <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
          <v-btn icon><v-icon>mdi-trash-can</v-icon></v-btn>
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    name: String,
    date: String,
    description: String,
    img: String,
  },
};
</script>

<style scoped>
.shadow {
  border: 1px #404b3b solid;
  /* border-radius: 10px; */
  box-shadow: 0px 15px 0px 0px rgba(33, 51, 29, 1) !important;
  -webkit-box-shadow: 0px 15px 0px 0px rgba(33, 51, 29, 1) !important;
  -moz-box-shadow: 0px 15px 0px 0px rgba(33, 51, 29, 1) !important;
}
</style>
