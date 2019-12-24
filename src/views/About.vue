   <template lang="html">
    
   <form  class="form-data">
    
    <div class="input-items">
      <input required v-model="id" type="text" maxlength="4" placeholder="Enter Staff ID"/>
   </div>
  <router-link :to="{name : 'table', params: {id: id}}">
    <button>Submit</button>
   </router-link/>
    </div>
    </form>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      id: ""
    };
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
  margin-left: 65px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
}
button:hover {
  -webkit-transform: translateY(-3px);
  -ms-transform: translateY(-3px);
  transform: translateY(-3px);
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.2);
}
</style>
