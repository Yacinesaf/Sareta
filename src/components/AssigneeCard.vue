<template>
  <v-card style="border-radius: 8px">
    <v-card-title>
      <v-row justify="space-between" align="center">
        <v-col cols="7"> Members | {{ membersNumber }} </v-col>
        <v-col cols="5">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" v-on="on" class="float-right">
                <v-icon class="mr-1">mdi-add</v-icon>
                Invite
              </v-btn>
            </template>
            <v-card class="pb-8">
              <v-card-title> Add member </v-card-title>
              <v-card-text>
                <v-form lazy-validation ref="addMemberForm">
                  <v-text-field
                    v-model="newMember.name"
                    label="Name"
                    :rules="[rules.required]"
                    outlined
                    type="text"
                    clearable
                  ></v-text-field>
                  <v-btn v-if="isEditing" class="float-right" @click="editMember" color="primary">Update</v-btn>
                  <v-btn v-else class="float-right" @click="addUserMember" color="primary">Confirm</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text v-if="membersNumber" class="pt-3">
      <v-row class="ma-0">
        <v-chip
          :key="i"
          v-for="(member, i) in userMembers"
          :color="member.shipColor"
          class="ma-1"
          ripple
          @click="openDialog(member)"
          style="cursor: pointer"
          >{{ member.name }}</v-chip
        >
      </v-row>
    </v-card-text>
    <v-card-text v-if="!membersNumber" class="text-center pt-3 pb-6">
      <h3>You don't have any member added</h3>
    </v-card-text>
  </v-card>
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
        name: "",
        shipColor: null,
      },
      isEditing: false,
      dialog: false,
      selectedShip: null,
    };
  },
  methods: {
    getRandomColor() {
      var o = Math.round,
        r = Math.random,
        s = 255;
      return "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + "," + 0.6 + ")";
    },
    openDialog(member) {
      this.selectedShip = member;
      this.newMember = { ...member };
      this.dialog = true;
      this.isEditing = true;
    },
    addUserMember() {
      if (this.$refs.addMemberForm.validate()) {
        this.newMember.shipColor = this.getRandomColor();
        const membersList = [...this.userMembers, this.newMember];
        this.$store.dispatch("user/editUserMembers", { membersList: membersList, isDeleting: false }).then(() => {
          this.dialog = false;
        });
      }
    },
    editMember() {
      if (this.$refs.addMemberForm.validate()) {
        if (this.newMember.name == this.selectedShip.name) {
          this.dialog = false;
        } else {
          const membersList = [...this.userMembers];
          const index = membersList.findIndex((el) => el.shipColor == this.newMember.shipColor);
          membersList.splice(index, 1, this.newMember);
          this.$store.dispatch("user/editUserMembers", { membersList: membersList, isDeleting: false }).then(() => {
            this.dialog = false;
          });
        }
      }
    },
    // deleteUserMember(shipName) {
    //   const index = [...this.userMembers].findIndex((el) => el.name === shipName);
    //   const membersList = [...this.userMembers];
    //   membersList.splice(index, 1);
    //   this.$store.dispatch("user/editUserMembers", { membersList: membersList, isDeleting: true });
    // },
  },
  watch: {
    dialog: function (newValue, old) {
      old;
      if (!newValue) {
        this.newMember = {
          name: "",
          shipColor: null,
        };
        this.isEditing = false;
        this.$refs.addMemberForm.reset()
      }
    },
  },
};
</script>
