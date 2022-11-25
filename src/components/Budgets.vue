<template>
  <v-row v-if="data"> </v-row>
  <v-row align="center" justify="center" v-else>
    <v-col class="d-flex align-center" style="flex-direction: column" cols="5">
      <img src="@/assets/emptyState.png" height="200px" width="auto" wid alt="" />
      <div class="text-h6 text-md-h4 text-center mt-6">You don't have any budget set up</div>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>
