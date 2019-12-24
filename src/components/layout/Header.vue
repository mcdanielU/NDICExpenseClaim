<template>
  <header class="header">
    <img src="../../assets/img/logo.png" width="160px" height="50px">
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
.header {
  background: white;
  color: #fff;
  text-align: left;
  padding: 10px;
  height: 60px;
  width: 100%;
  -webkit-box-shadow: 0px 3px 5px rgba(100, 100, 100, 0.49);
  -moz-box-shadow: 0px 3px 5px rgba(100, 100, 100, 0.49);
  box-shadow: 0px 3px 5px rgba(100, 100, 100, 0.49);
}

.header a {
  color: #fff;
  padding-right: 5px;
}

h1 {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>


