<template>
  <div class="christmas">
    <div class="level" :style="levelsStyles[n-1]" v-for="n in levels" :key="n">
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      minLevels: 4,
      maxLevels: 12,
      levels: 6,
      lastRandom: 6,
      aspect: .66,
      levelCalculatorInterval: 2500,
    }
  },
  computed:{
    levelsStyles(){
      let levelsStyles = []
      for(let i = 0; i < this.levels; i++){
        levelsStyles.push({
          "font-size": "calc(var(--height) / " + this.levels + " - 1rem)",
          "height": "calc(var(--height) / " + this.levels + " - 1rem)",
          "width": "calc(var(--height) / " + this.levels + " * " + (i*this.aspect+1) +" - 1rem)",
          "border-radius": "0 calc(var(--height) / " + this.levels + ") 0 calc(var(--height) / " + this.levels + ")",
          "z-index": this.levels-i,
        })
      }
      return levelsStyles

    }

  },
  methods:{
    setLevels(){
      let levelsDifference = this.maxLevels-this.minLevels
      let myRandom
      do {
        myRandom = Math.round(levelsDifference*Math.random())
        console.log(myRandom)
      } while (myRandom == this.lastRandom);
      this.lastRandom = myRandom
      this.levels = myRandom+this.minLevels
    }
  },
  mounted(){
    this.levelCalculator = setInterval(()=>{this.setLevels()}, this.levelCalculatorInterval)
  },
  beforeDestroy() {
  clearInterval(this.levelCalculator)
}
}
</script>

<style lang="scss" scoped>
.christmas{
  --height: calc(100vh - 16rem);
  width: 100%;
  //background: red;


  .level{
    margin: 1rem 0;
    height: 2rem;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    background: var(--accent-color);
    &:not(:first-child):after{
      content: "";
      display: block;
      position: absolute;
      top: 1rem;
      left: .1em;
      width: 1em;
      height: 1em;
      background: var(--content-color); //F09A92
      border: var(--border-width) solid var(--content-color);
      border-radius: 9001px;
    }
    &:nth-child(2n){
      &:after{
        left: auto;
        right: .1em;
      }
    }
  }
}
</style>
