<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import 'https://unpkg.com/sanitize.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #a1a1a1;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #a1a1a1;

    &.router-link-exact-active {
      color: #fff;
    }
  }
}
</style>
