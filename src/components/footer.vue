<template>
  <footer id="footer">
    <social/>
    <hr/>
    <p><router-link to="/impressum" class="nav">Impressum</router-link> +
    <router-link to="/datenschutz" class="nav">Datenschutz</router-link></p>


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

  min-height: 2.5rem;
  max-height: 2.7rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url("/img/img-noise-256x256.png");
  background-attachment: local;
  background-blend-mode: lighten;
  background-repeat: repeat;
  background-color: var(--bg);
  border-top: var(--border-width) solid var(--content-color);
  width: 100%;
  padding: 0 1rem;
  a {
    font-size: 1rem;
    color: var(--content-color);
    font-family: var(--body-text-font);
    font-style: var(--body-text-style);
    font-weight: var(--body-text-weight);
    color: var(--content-color);
      &.router-link-exact-active {
          color: var(--accent-color);
      }
  }
}
@media  (max-width: 600px){
  #footer{
    max-height: 5rem;
  }
}
@media  (max-width: 370px){
  hr{
    display: none;
    visibility: hidden;
  }
}
</style>
