<template>
  <div>
    <h2>
      Expense Claim ::
      <span
        class="is-complete"
        v-bind:class="{'default-data': check}"
      >{{this.reply}}</span>
    </h2>

    <table>
      <tr>
        <th>Name</th>
        <th>Dept</th>
        <th>Rank</th>
        <th>Leaving</th>
        <th>Returning</th>
        <th>Route</th>
        <th>Accomodation</th>
        <th>Flight</th>
        <th>TotalCost</th>
        <th>Purpose</th>
        <th>Dir/Hod</th>
        <th>Audit</th>
        <th>Finance</th>
        <th>View Form</th>
        <th></th>
      </tr>

      <tr v-for="row in userData">
        <td>{{row.StaffName}}</td>
        <td>{{row.Department}}</td>
        <td>{{row.Rank}}</td>
        <td>{{row.Leaving}}</td>
        <td>{{row.Returning}}</td>
        <td>{{row.Route}}</td>
        <td>N{{row.AccomodationCost}}</td>
        <td>N{{row.FlightCost}}</td>
        <td>N{{row.TotalCost}}</td>
        <td>{{row.Purpose}}</td>
        <td>{{row.HodStatus}}</td>
        <td>{{row.AuditStatus}}</td>
        <td>{{row.Finance}}</td>
        <td>
          <router-link :to="{name : 'viewform', params: {id: staffID ,datePublished: row.Published}}">
  <img src="../assets/img/icon/greenarrow.png" height="22px">
          </router-link/>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { isBoolean } from "util";
export default {
  name: "Table",
  data() {
    return {
      staffID: this.$route.params.id,
      userData: [],
      reply: "",
      check: isBoolean
    };
  },
  methods: {
    getData() {
      axios
        .get("http://localhost:3000/api/user/" + this.staffID)
        .then(res => (this.userData = res.data.data))
        .then(() => {
          if (this.userData == "") {
            this.reply = "No Expense Claim Submitted";
            this.check = true;
          } else {
            this.reply = " Data Found: View the Form";
            this.check = false;
          }
        });
    }
  },

  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
table {
  font-family: "Open Sans", sans-serif;
  width: 1500px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475c;
  color: #fff;
  padding: 8px;
  min-width: 30px;
}
table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #d4d8f9;
}

.is-complete {
  color: green;
}

.default-data {
  color: red;
}
</style>
