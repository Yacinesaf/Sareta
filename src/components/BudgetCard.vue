<template>
  <v-card style="cursor: pointer" class="rounded-lg">
    <img :src="budget.imgUrl" width="100%" height="250px" />
    <v-card-title>
      <div class="text-h6" style="font-weight: 700; color: #21331d">{{ budget.name }}</div>
    </v-card-title>
    <v-card-text>
      <div style="max-height: 60px; max-width: 280px" class="mb-8 ellipsis">{{ budget.description }}</div>
      <v-row class="mx-0" justify="space-between">
        <div>
          <div class="text-end text-h6">{{ dateFormater(budget.date) }}</div>
        </div>
        <div class="d-flex">
          <v-dialog transition="scroll-y-reverse-transition" v-model="isConfirmationDialogOpen" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon><v-icon>mdi-trash-can</v-icon></v-btn>
            </template>
            <v-card>
              <div class="pa-6">
                <div class="text-h5 pb-12" style="font-weight: 600">Are you sure you want to delete this budget?</div>
                <v-row justify="end">
                  <v-btn text class="mr-3" @click="closeDialog" color="gray">Cancel</v-btn>
                  <v-btn style="color: white" @click="deleteBudget" color="red">Confirm</v-btn>
                </v-row>
              </div>
            </v-card>
          </v-dialog>
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { dateFormater } from "../helper/functions";
export default {
  props: {
    budget: Object,
  },
  data() {
    return {
      dateFormater: dateFormater,
      isConfirmationDialogOpen: false,
    };
  },
  methods: {
    deleteBudget() {
      this.$emit("deleteBudget", this.budget.docId);
      this.closeDialog();
    },
    closeDialog() {
      this.isConfirmationDialogOpen = false;
    },
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
