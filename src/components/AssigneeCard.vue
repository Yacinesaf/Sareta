<template>
  <div>
    <v-card>
      <v-card-title>
        <v-row justify="space-between" align="center">
          <v-col> Members | {{ assigneeNumber }} </v-col>
          <v-col
            ><v-btn class="float-right">
              <v-icon class="mr-1">mdi-add</v-icon>
              Invite
            </v-btn></v-col
          >
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-chip
          @click:close="deleteAssigneeFromBudget"
          :key="i"
          v-for="(assignee, i) in assignees"
          close
          :color="getRandomColor()"
          class="ma-1"
          >{{ assignee ? assignee : "YUUU" }}</v-chip
        >
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    assigneeNumber() {
      return this.assignees.length;
    },
  },
  methods: {
    deleteAssigneeFromBudget() {
      this.$emit("deleteAssignee");
    },
    getRandomColor() {
      var o = Math.round,
        r = Math.random,
        s = 255;
      return "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + "," + 0.6 + ")";
    },
  },
  props: {
    assignees: Array,
  },
};
</script>
