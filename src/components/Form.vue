   <template lang="html">
    
   <form @submit="postData" class="form-data">
    
    <div class="input-items">
    <label for="staff_id">Staff_id:&nbsp;</label>&nbsp;&nbsp;
    <input required autocomplete="none" maxlength="5"  id="staff_id" class="textinput-form" placeholder="Input STAFF-ID here"  type="text" v-model="StaffID"/><label for="staff_id"><img v-if="imageload" width="15px" src="..\assets\img\loaders\Bars-1s-200px.gif"/></label>
    <br/>
    <br/>
    
   
    <label for="fullname">Name:     </label> &nbsp;&nbsp;
    <input v-model="StaffName" type="text" class="textinput-form" name="fullname"  disabled/>
    <br/>
    <br/>
    
    <label for="department">Dept:</label> &ensp;
    <input v-model="Department" type="text" class="textinput-form" name="department"  disabled/>
    <br/>
    <br/>
    <span style="padding-right: 60px;">
    <label for="destination">Route from: </label>
 
 
    <select required id="destinationfrom"  v-model="Route" >
    <option disabled value="">Please select route</option>
    <option v-for="state in states" v-bind:value="state.name">
    {{state.name}}
    </option>
    </select>
    </span>
   <br/>
   <br/>
    <span style="padding-right: 20px;">
    <label for="leaving">Leaving</label>
    &nbsp;&nbsp;&nbsp;
    <input required type="date" id="leaving" v-model="LeavingDate"/>
    </span>
     <br/>
   <br/>
   <span style="padding-right: 20px;">
    <label for="returning">Returning</label>
    &nbsp;&nbsp;&nbsp;
    <input required type="date" id="returning" v-model="ReturningDate"/>
    </span>
     <br/>
   <br/>
  
  
    
    <br/>
    <label for="purpose">Purpose: </label>&nbsp;&nbsp;&nbsp;&nbsp;
    <textarea required class="textinput-form" id="purpose" v-model="Purpose"></textarea>
    <br/>
    <br/>
    <!-- <label for="supportdoc">Attach Supporting document (.docx, .doc, .PDF accepted)</label>
    <input type="file" id="supportdoc"/> -->
    <br/>
    <br/>
    <button>Submit</button>
<br/>
<h4>OR</h4>
<br/>

     <router-link to="/about">
        <button style="background-color: purple" type="button">
          
          <br>Check your status
        </button>
      </router-link>
    </div>
    </form>
</template>

<script>
import { setInterval } from "timers";
import axios from "axios";

export default {
  name: "Form",
  data() {
    return {
      states: [
        { name: "Abuja-Lagos" },
        { name: "Abuja-Port-harcourt" },
        { name: "Abuja-Kano" },
        { name: "Abuja-Calabar" },
        { name: "Abuja-Enugu" },
        { name: "Abuja-Kaduna" },
        { name: "Abuja-Maiduguri" },
        { name: "Abuja-Yola" },
        { name: "Abuja-Sokoto" },
        { name: "Abuja-Benin" },
        { name: "Abuja-Ibadan" },
        { name: "Abuja-Warri" },
        { name: "Abuja-Markurdi" },
        { name: "Abuja-Jos" },
        { name: "Abuja-Ilorin" },
        { name: "Abuja-Gombe" },
        { name: "Lagos-Port-harcourt" },
        { name: "Lagos-Yola" },
        { name: "Lagos-Makurdi" },
        { name: "Lagos-Maiduguri" },
        { name: "Lagos-Kaduna" },
        { name: "Lagos-Enugu" },
        { name: "Lagos-Benin" },
        { name: "Lagos-Kano" },
        { name: "Lagos-Jos" },
        { name: "Lagos-Warri" },
        { name: "Lagos-Calabar" },
        { name: "Lagos-Sokoto" },
        { name: "Lagos-Ilorin" },
        { name: "Lagos-Gombe" }
      ],
      details: [],
      StaffID: "",
      StaffName: "",
      Department: "",
      StaffRank: "",
      Route: "",
      LeavingDate: "",
      NumberOfDays: "",
      Purpose: "",
      ReturningDate: "",
      AccomodationCost: "",
      FlightCost: "",
      imageload: false
    };
  },

  watch: {
    StaffID: function(valuce) {
      if (value.length >= 4) {
        this.imageload = false;

        var mydata;
        mydata = this.StaffID;
        axios
          .get("http://localhost:3000/api/staff/" + mydata)

          .then(res => (this.details = res.data.data))
          .then(() => {
            this.details.forEach(element => {
              this.StaffName = element.name;
              this.StaffRank = element.rank;
              this.Department = element.department;
            });
          })
          .then(() => {
            if (this.details == "") {
              alert("No Record Found");
            }
          })

          .catch(err => console.log(err));
      } else if (value.length < 4) {
        this.imageload = true;
        this.StaffName = "";
        this.StaffRank = "";
        this.Department = "";
      }
    },

    Route: function(value) {
      if (value.length != 0) {
        var yearoute;
        yearoute = this.Route;
        axios
          .get(
            "http://localhost:3000/api/accomodation/" +
              this.StaffRank +
              "/" +
              yearoute
          )
          .then(res => (this.AccomodationCost = res.data.data));

        axios
          .get(
            "http://localhost:3000/api/flight/" +
              this.StaffRank +
              "/" +
              yearoute
          )
          .then(res => (this.FlightCost = res.data.data));
      }
    }
  },

  methods: {
    postData(e) {
      e.preventDefault();
      var date1 = new Date(this.LeavingDate);
      var date2 = new Date(this.ReturningDate);
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      this.NumberOfDays = diffDays;
      var totalAccCost = diffDays * this.AccomodationCost;
      var TotalCost = totalAccCost + this.FlightCost;

      axios
        .post("http://localhost:3000/api/UserForm", {
          StaffID: this.StaffID,
          StaffName: this.StaffName,
          Department: this.Department,
          Leaving: this.LeavingDate,
          Returning: this.ReturningDate,
          Purpose: this.Purpose,
          NumberOfDays: this.NumberOfDays,
          Route: this.Route,
          Rank: this.StaffRank,
          AccomodationCost: totalAccCost,
          FlightCost: this.FlightCost,
          TotalCost: TotalCost
        })
        .then(() => {
          alert("Data Sent :: Check your status to print form");
          (this.StaffName = ""),
            (this.StaffID = ""),
            (this.Department = ""),
            (this.LeavingDate = ""),
            (this.ReturningDate = ""),
            (this.Purpose = ""),
            (this.NumberOfDays = ""),
            (this.Route = ""),
            (this.StaffRank = "");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.textinput-form {
  border-radius: 7px;
  font-size: 12px;
}
.input-items {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
}
h1 {
  height: 100px;
  width: 100%;
  font-size: 18px;
  background: #18aa8d;
  color: white;
  line-height: 150%;
  border-radius: 3px 3px 0 0;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.2);
}

form {
  line-height: 30px;
  width: 360px;
  margin: 100px auto 0;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  padding-bottom: 40px;
  border-radius: 3px;
  background-color: #99ccff;
}
form h1 {
  box-sizing: border-box;
  padding: 20px;
}

button {
  border: none;
  background: #0074d9;
  cursor: pointer;
  border-radius: 3px;
  padding: 6px;
  width: 200px;
  color: white;
  margin-left: 25px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
}
button:hover {
  -webkit-transform: translateY(-3px);
  -ms-transform: translateY(-3px);
  transform: translateY(-3px);
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.2);
}
</style>
