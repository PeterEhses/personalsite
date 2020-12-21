<template>
  <router-link :to="'/'+$route.meta.collection" class="bo">
  </router-link>
</template>

<script>
export default {
  name:"blockout"
}
</script>

<style lang="scss" scoped>
  .bo{
    z-index: 90002;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    //background-color: var(--bg);
    //background-image: url("/img/img-noise-256x256.png");
    opacity: 1;
    backdrop-filter: blur(10px);
  }
</style>
