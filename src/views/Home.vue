<template>
  <div class="home tileContainer" v-if="picdata !== undefined">
    <div  class="tile" v-for="idx in numSegments" :key="idx" :style="{width: tileDimension}">
      <gradiator gradType="conic" :gradAngle="((baseSegments%(idx))+idx*baseRows*69)%360" :resolution="Math.round(Math.random()*4+2)" :quality="10" :imageUrl="randImgs[idx-1]" :style="{height: '100%'}">

      </gradiator>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import gradiator from "@/components/gradiator.vue";
export default {

  components: {
    gradiator
  },
    data: function(){
    return {
      baseSegments: 16,
      baseRows: 2,
      picdata: undefined,
      innerWidth: (window.innerWidth > 0) ? window.innerWidth : screen.width
    }
  }, computed: {
    tileDimension: function(){
      let dim = "calc(100% / "
      dim += Math.round(this.numSegments/this.baseRows)
      dim += " )"
      return dim
    },
    numSegments: function(){
      let numS = 0;
      let width = this.innerWidth;
      let baseWidth = (1900/this.baseSegments)
      numS = Math.round(width / baseWidth / this.baseRows) * this.baseRows
      return numS
    },
    randImgs: function() {
      let URLs = []
      if(this.picdata.length >= this.numSegments){
        let ranNum = Math.round(Math.random()*(this.picdata.length-this.numSegments))
        for(let i = 0; i < this.numSegments; i++){
          //console.log(ranNum+i)
          let url = this.picdata[ranNum+i].download_url
          url = url.split("/").slice(0,-2).join("/")+"/512"
            URLs.push(url);
        }
      }

      //console.log(URLs)
      return URLs;
    },
    // backgrounds: function(){
    //   let bgcol = [];
    //   for(let i = 0; i < this.numSegments; i++){
    //
    //     let theCol = Math.random()*360;
    //     gbcol.append(theCol)
    //   }
    //   return bgcol;
    // }
  },
  methods: {

    getImgsAsync() {
      let that = this;
      this.axios.get("https://picsum.photos/v2/list?limit=100").then((response) => {
        //console.log(response)
        that.picdata = response.data
  } );
},
myEventHandler(){
  this.innerWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width
}
  },


  mounted: function() {
    this.getImgsAsync()
}, created: function () {
  window.addEventListener("resize", this.myEventHandler);
},
destroyed: function () {
  window.removeEventListener("resize", this.myEventHandler);
},
}
</script>

<style lang="scss" scoped>
  .tileContainer{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    align-items: stretch;
  }
  .tile,
  .tileContainer{
  }
</style>
