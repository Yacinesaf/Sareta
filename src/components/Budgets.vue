<template>
  <v-row v-if="data"> </v-row>
  <v-row align="center" justify="center" v-else>
    <v-col class="d-flex justify-center" cols="3">
      <img src="@/assets/emptyState.png" height="200px" width="auto" wid alt="" />
    </v-col>
    <v-col cols="12">
      <div class="text-h5 text-md-h3 text-center">You don't have any budget set up</div>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>
