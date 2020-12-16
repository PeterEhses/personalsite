<template>
  <!-- TODO: add support for hyperlinking through chips, general intearctivity for search / filter-->
  <div class="chip">
    <p><slot></slot></p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.chip{
  font-size: calc(1em / var(--font-scalar));
  background-color: var(--bg);
  background-image: linear-gradient(rgb(0, 155, 164) -7000%, rgba(0, 0, 0, 0) 1000%);
  margin: .25em;
  padding: .5em 1em;
  border-radius: 1em;
  height: 2em;
  p{
    margin: 0;
    padding: 0;
  }
}
</style>
