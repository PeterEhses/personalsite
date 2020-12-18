<template>
  <header id="nav">
    <router-link to="/">
      <div id="logo">
        <h2>Peter Ehses</h2>
        <hr />
        <h1>Portfolio</h1>
      </div>
    </router-link>
    <nav>
      <router-link to="/about" class="nav" title="Kontakt">About</router-link>
      <hr />
      <router-link to="/projects" class="nav" title="Projekte">Projekte</router-link>
      <!-- <hr />
      BREAK AT 1300px
      <router-link to="/about" class="nav" title="Blog">Blog</router-link> -->

    </nav>


  </header>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
