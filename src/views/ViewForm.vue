<template>
  <div id="printMe" style="background-color: honeydew;">
    <div class="container" style="background-color: honeydew;">
      <!--div class="container" style="text-align: center;"-->

      <h2 class="main-heading">
        <strong>EXPENSES CLAIM FORM</strong>
      </h2>
      <!-- span helps to vertically allign an image and text-->

      <div class="main-body" v-for="row in data">
        <div class="row">
          <div class="col col-md-8">
            <label for="frm" style="color:blue;">FROM</label>
            <u>
              <h4>{{row.Rank}} ({{row.Department}})</h4>
            </u>
          </div>
          <br />
          <br />
          <div class="col col-md-4">
            <label for="dte" style="color:blue;">DATE</label>
            <h4>{{row.Published.substring(0,10)}}</h4>
          </div>
        </div>
        <br />

        <div class="row">
          <div class="col col-md-12">
            <label for="thro" style="color:blue;">THROUGH</label>
            <u>
              <h4>D ({{row.Department}})</h4>
            </u>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col col-md-12">
            <label for="to">
              <h4>
                <b>To Director Of Finance</b>
              </h4>
            </label>
            <br />
            <br />
            <label for="pay" style="color:blue;">Please pay the sum of &#8358;</label>
            <h4 style="color: green">{{letter}} Naira only</h4>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col col-md-8">
            <label for="mr" style="color:blue;">To Mr(s)</label>
            <h4>{{row.StaffName}}</h4>
          </div>
          <div class="col col-md-4">
            <label for="id" style="color:blue;">ID no</label>
            <h4>{{row.StaffID}}</h4>
            <br />
            <br />
          </div>
        </div>

        <div class="row">
          <div class="col col-md-12">
            <label for="for" style="color:blue;">For expenses incurred on</label>
            <h4>{{row.Purpose}} ({{row.Leaving}} TO {{row.Returning}})</h4>
          </div>
        </div>
        <!--<div align="center" style="vertical-align:bottom"><This is placed here to ensure that our table is in the centre of our page-->
        <table class="table main-table">
          <!--Note COLUMNSPAN aka colspan and rowspan help to expand a particular row or column to expand or to be the same length as the row or column beneath it-->
          <thead>
            <tr>
              <th style="width: 500px;">(EXPENSES)</th>
              <th style="width: 250px;">&#8358;</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Accomodation (X{{row.NumberOfDays}} Nights)</td>
              <td style="color:green;">&#8358;{{row.AccomodationCost}}</td>
            </tr>

            <tr>
              <td>Flight ({{row.Route}})</td>
              <td style="color:green">&#8358;{{row.FlightCost}}</td>
            </tr>

            <tr>
              <td>~</td>
              <td>~</td>
            </tr>

            <tr>
              <td>~</td>
              <td>~</td>
            </tr>

            <tr>
              <td>~</td>
              <td>~</td>
            </tr>

            <tr>
              <td>~</td>
              <td>~</td>
            </tr>

            <tr>
              <td>
                <h3 style="color: orange; ">Total</h3>
              </td>
              <td>
                <h3 style="color: orange; ">&#8358;{{row.TotalCost}}</h3>
              </td>
            </tr>
          </tbody>
        </table>

        <p>Attach all relevant receipts</p>

        <div class="row main-sign">
          <div class="col col-md-6">
            <div class="border">
              <p>CLAIMANT SIGNATURE</p>
            </div>
          </div>
          <div class="col col-md-6">
            <div class="top">
              <p>HOD/ED/MD</p>
            </div>
          </div>
        </div>
      </div>&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;
    </div>
    <button @click="print">PRINT FORM</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "viewform",
  data() {
    return {
      StaffId: this.$route.params.id,
      date: this.$route.params.datePublished,
      data: [],
      letter: "",
      cssText: `@import url("../assets/css/bootstrap.min.css");

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.kiki-logo {
  height: 150px;
  width: 180px;
  float: left;
  margin-right: 10px;
}

.navbarcustom {
  height: 160px;
  background-color: transparent !important;
}
.main-body {
  margin-top: 150px;
}
.main-heading {
  color: darkblue;
  text-decoration: underline;
  text-align: center;
  margin-top: 80px;
}

.main-table {
  vertical-align: bottom;
  margin: 30px 5px 0px;
}

.main-sign {
  margin-top: 40px;
}
/*div
	{
	width: 500px; 
	margin: 0 auto; 
	padding: 0;// padding is the space between your content and 
	the borders inorder to get rid of it, you should always set your padding to zero
	}*/

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  height: 100%;
}

input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid blue;
}

table {
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid blue;
}

.border {
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-top: 2px solid blue;
}
.top {
  float: right;
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-top: 2px solid blue;
}`
    };
  },
  methods: {
    getData() {
      axios
        .get(
          "http://localhost:3000/api/dataform/" +
            this.StaffId +
            "/" +
            this.date
        )
        .then(res => (this.data = res.data.data));
    },
    getData2() {
      axios
        .get(
          "http://localhost:3000/api/dataform/" +
            this.StaffId +
            "/" +
            this.date
        )
        .then(res => (this.letter = res.data.letter));
    },

    print() {
      this.$htmlToPaper("printMe");
    }
  },

  mounted() {
    this.getData();
    this.getData2();
  }
};
</script>

<style scoped>
@import url("../assets/css/bootstrap.min.css");

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.kiki-logo {
  height: 150px;
  width: 180px;
  float: left;
  margin-right: 10px;
}

.navbarcustom {
  height: 160px;
  background-color: transparent !important;
}
.main-body {
  margin-top: 150px;
}
.main-heading {
  color: darkblue;
  text-decoration: underline;
  text-align: center;
  margin-top: 80px;
}

.main-table {
  vertical-align: bottom;
  margin: 30px 5px 0px;
}

.main-sign {
  margin-top: 40px;
}
/*div
	{
	width: 500px; 
	margin: 0 auto; 
	padding: 0;// padding is the space between your content and 
	the borders inorder to get rid of it, you should always set your padding to zero
	}*/

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  height: 100%;
}

input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid blue;
}

table {
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid blue;
}

.border {
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-top: 2px solid blue;
}
.top {
  float: right;
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-top: 2px solid blue;
}
</style>


