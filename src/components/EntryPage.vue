<template>
  <div class="d-flex justify-center px-3" style="align-items: center; height: 100vh; width: 100%">
    <!-- <v-row style="height: 100vh" align="center" justify="center">
    <v-col cols="11" sm="9" md="6" lg="4">
      <v-card style="border: 3px #404b3b solid; min-height: 500px; z-index: 2; border-radius: 16px">
        <v-card-text> </v-card-text>
      </v-card>
      <v-row class="mx-0">
        <v-col class="px-0 shadowCard"></v-col>
      </v-row>
    </v-col>
  </v-row> -->
    <v-row style="position: absolute; z-index: 2; width: 100%" justify="center">
      <v-col cols="11" sm="9" md="6" lg="4">
        <v-card style="border: 3px #404b3b solid; min-height: 500px;">
          <v-row justify="center">
            <v-col cols="11">
              <div class="pa-6">
                <div class="text-h4 text-center mb-16" style="font-weight: 700">
                  {{ isLoggingIn ? "Login" : "Sign up" }}
                </div>
                <v-text-field
                  class="py-3"
                  style="border-radius: 6px"
                  label="Filled"
                  placeholder="Placeholder"
                  outlined
                ></v-text-field>
                <v-text-field
                  class="py-3"
                  style="border-radius: 6px"
                  label="Filled"
                  placeholder="Placeholder"
                  outlined
                ></v-text-field>
                <v-btn>{{ isLoggingIn ? "Login" : "Sign up" }}</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      v-show="$vuetify.breakpoint.smAndUp"
      class="mx-0"
      style="position: absolute; z-index: 1; width: 100%"
      justify="center"
    >
      <v-col class="shadowCard px-0" cols="10" sm="9" md="6" lg="4"> </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.shadowCard {
  background-color: #404b3b;
  min-height: 500px;
  border-radius: 16px;
  transform: translateY(20px) translateX(-30px);
}
</style>
