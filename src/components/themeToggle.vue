<template>
  <div
  :class="['themeToggleContainer', visible ? 'visible' : 'hidden']"
  ref="root"
  @mouseenter="addVis"
  @click="switchVis"
  @mouseleave="removeVis"
  >
    <p class="flavor">Theme</p>
    <div
    :class="['day', active == 'day' ? 'active' : '']"
    :key="'day'"
    @click.stop="active = 'day'"
    ></div>
    <div
    :class="['vers', active == 'vers' ? 'active' : '']"
    :key="'vers'"
    @click.stop="active = 'vers'"
    ></div>
    <div
    :class="['night', active == 'night' ? 'active' : '']"
    :key="'night'"
    @click.stop="active = 'night'"
    ></div>
  </div>
</template>

<script>
export default {
  name: "themeToggle",
  data(){
    return{
      visible: false,
      active: 'vers'
    }
  },
  methods: {
    addVis(){
      this.visible = true
    },
    removeVis(){
      this.visible = false
    },
    switchVis(){
      this.visible = !this.visible
    }
  },
  watch: {
    active(){
      window.theme_mode = this.active
      window.updateBG()
    }
  }
}
</script>

<style lang="scss" scoped>
.themeToggleContainer{
  transition: all var(--transition-time);

  position: absolute;
  --button-width: 1rem;
  --half-button: calc(var(--button-width)/2);
  --spacing: .5rem;
  border-radius: var(--half-button);

  z-index: 90002;
  right: calc(var(--button-width) + 7px);
  top: var(--button-width);
  width: var(--button-width);
  height: var(--button-width);
  overflow: hidden;
  //background: blue;
  // display: flex;
  // flex-direction: row;
  // justify-content: space-between;
  .flavor{
    transition: all var(--transition-time), color 0s;
    position: absolute;
    text-align: right;
    right: var(--button-width);
    top: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    font-size: .82rem;
    font-family: var(--accent-text-font);
    font-style: var(--accent-text-style);
    font-weight: var(--accent-text-weight-bold);
  }
  .day{
    background-color: var(--white);
  }
  .vers{
    background: #F09A92;
    background: linear-gradient(90deg, rgba(241,237,220,1) 0%, rgba(240,154,146,1) 50%, rgba(48,48,48,1) 100%);
  }
  .night{
    background-color: var(--dark);
  }
  div{
    cursor: pointer;
    border: var(--border-width) solid var(--content-color);
    transition: all var(--transition-time);
    position: absolute;
    right: 0;
    top: 0;
    flex-shrink: 0;
    flex-grow: 0;
    border-radius: var(--half-button);
    width: var(--button-width);
    height: var(--button-width);
    background: red;
    &.active{
      z-index: 9001;
      &:after{
        border-radius: 50%;
        border: var(--border-width) solid var(--content-color);
        width: 20%;
        height: 20%;
        //background: var(--bg);
        content: "";
        position: absolute;
        right: 50%;
        bottom: 50%;
        transform: translate(50%, 50%);
      }
    }
  }
  &.hidden{
    opacity: .5;
    div{
      pointer-events: none;
    }
  }
  &.visible{
    width: calc(var(--button-width)*3 + var(--spacing) * 2 + 9ch);
    .flavor{
      right: calc(3*var(--button-width) + 3*var(--spacing));
    }
    .day{
      right: calc(2*var(--button-width) + 2*var(--spacing));
    }
    .vers{
      right: calc(var(--button-width) + var(--spacing));
    }
    .night{

    }
  }
}
</style>
