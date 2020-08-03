<template>
  <footer id="footer">
    <social/>
    <hr/>
    <router-link to="/about" class="nav">Impressum und Datenschutz</router-link>
  </footer>
</template>

<script>
import social from "@/components/social.vue"
export default {
  name: "footerBoi",
components:{

  social
  },
}
</script>

<style lang="scss" scoped>
#footer{
  flex-grow: 0;
  flex-shrink: 0;

  height: 2.5rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg);
  border-top: var(--border-width) solid var(--content-color);
  width: 100%;
  padding: 0 1rem;
  a {
    font-size: 1rem;
    color: var(--content-color);
    font-family: heimat-sans, sans-serif;
      &.router-link-exact-active {
        font-family: heimat-sans, sans-serif;
          color: var(--accent-color);
      }
  }
}
</style>
