<template>
  <div>
    <v-card>
      <v-card-title>
        <v-row justify="space-between" align="center">
          <v-col> Members | {{ membersNumber }} </v-col>
          <v-col>
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  @click="openInviteMemberDialog"
                  class="float-right"
                >
                  <v-icon class="mr-1">mdi-add</v-icon>
                  Invite
                </v-btn>
              </template>
              <v-card class="pb-8">
                <v-card-title> Add member </v-card-title>
                <v-card-text>
                  <v-form ref="addMemberForm">
                    <v-text-field
                      v-model="memberName"
                      label="Name"
                      :rules="[rules.required]"
                      outlined
                      type="text"
                      clearable
                    ></v-text-field>
                    <v-text-field
                      v-model="memberEmail"
                      label="Email"
                      outlined
                      type="email"
                      :rules="[rules.required, rules.email]"
                      clearable
                    ></v-text-field>
                    <v-btn
                      class="float-right"
                      @click="confirmed"
                      :disabled="!addMemberFormCompleted"
                      color="primary"
                      >Confirm</v-btn
                    >
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text :key="i" v-for="(member, i) in userMembers">
        <v-chip
          v-if="member"
          @click:close="deleteUserMember(member.memberEmail)"
          close
          :color="getRandomColor()"
          class="ma-1"
          >{{ member.memberName }}</v-chip
        >
        <div v-else class="text-align">You don't have any member added</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import rules from "../rules/rules";
export default {
  computed: {
    ...mapState({
      userMembers: (state) => state.user.dbUser.members,
    }),
    rules() {
      return rules;
    },
    membersNumber() {
      return this.userMembers?.length;
    },
  },
  data() {
    return {
      newMember: {
        memberEmail: "",
        memberName: "",
      },
    };
  },
  methods: {
    getRandomColor() {
      var o = Math.round,
        r = Math.random,
        s = 255;
      return (
        "rgba(" +
        o(r() * s) +
        "," +
        o(r() * s) +
        "," +
        o(r() * s) +
        "," +
        0.6 +
        ")"
      );
    },
    addUserMember() {
      if (this.$refs.addMemberForm.validate()) {
        const membersList = this.userMembers.push(this.newMember);
        console.log(
          "🚀 ~ file: AssigneeCard.vue:115 ~ addUserMember ~ membersList:",
          membersList
        );
        // this.$store.dispatch("user/editUserMembers", membersList);
      }
    },
    deleteUserMember(shipMemberEmail) {
      const index = this.dbUser.members.findIndex(
        (el) => el.memberEmail === shipMemberEmail
      );
      const membersList = this.userMembers.splice(index, 1);

      console.log(
        "🚀 ~ file: AssigneeCard.vue:115 ~ addUserMember ~ membersList:",
        membersList
      );
      // this.$store.dispatch("user/editUserMembers", membersList);
    },
  },
};
</script>
