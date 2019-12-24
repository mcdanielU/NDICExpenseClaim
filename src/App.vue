<template>
  <div id="app" class="container">
    <Header />
    <div class="menu"></div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Header from "./components/layout/Header.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Form from "./components/Form.vue";

export default {
  name: "app",
  components: {
    HelloWorld,
    Form,
    Header
  }
};
</script>

<style scoped>
.container {
  background-color: honeydew;
}
.menu {
  position: relative;
  top: 200px;
  left: 0px;
  width: 60px;
}

button {
  border: none;
  background: white;
  cursor: pointer;
  border-radius: 20px;
  padding: 6px;
  width: 200px;
  color: Black;
  margin-left: 35px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
}
button:hover {
  -webkit-transform: translateY(-3px);
  -ms-transform: translateY(-3px);
  transform: translateY(-3px);
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.2);
}

.img-style {
  width: 30px;
  padding-top: 32px;
}
.single {
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  display: inline-block;
  width: 30px;
  height: 30px;
}
</style>
