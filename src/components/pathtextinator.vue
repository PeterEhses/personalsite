<template>
  <div class="pathbox" ref="pathbox">
    <svg>
      <path :d="path" :id="'pathBoi'+_uid" style="display: none"/>
      <text>
        <textPath :href="'#pathBoi'+_uid" dominant-baseline="text-before-edge" text-anchor="middle" startOffset="50%" :font-size="fontscale+'em'">

          <slot> </slot>{{reactiveHack}}
        </textPath>
      </text>
    </svg>
  </div>
</template>

<script>
//{{dimensions}}
export default {
  name: "pathtextinator",
  props: {
    fontscale: {
      default: 1,
    },
  },
  data: function(){
    return{
      dimensions: {w:0,h:0},
      path: "",
    }
  },
  computed: {
    reactiveHack: function(){
      if(this.dimensions.w<1){
        return " "
      } else {
        return ""
      }
    }


  },
  methods: {
    dimGet: function(){
      this.dimensions = {w:this.$el.clientWidth, h:this.$el.clientHeight}
    }
  }, watch: {
    dimensions: function(){
      //
      let pathstr = ""
      let dimsmallest = Math.min(this.dimensions.w, this.dimensions.h)
      // move to 1/2, 0
      pathstr+= "M0,"+(this.dimensions.h/2)+" "
      //if longer side bridge half
      if(this.dimensions.h-dimsmallest>0){
        pathstr += "v-"+((this.dimensions.h-dimsmallest)/2)+" "
      }
      // Draw corner arc clockwise
      pathstr += "a"+dimsmallest/2+","+dimsmallest/2+" 0 0 1 "+dimsmallest/2+","+-dimsmallest/2+" "
      //if longer side bridge
      if(this.dimensions.w-dimsmallest>0) {
        pathstr += "h"+(this.dimensions.w-dimsmallest)+" "
      }
      // Draw corner arc clockwise: radX, radY, endX rel., endY rel.
      pathstr += "a"+dimsmallest/2+","+dimsmallest/2+" 0 0 1 "+dimsmallest/2+","+dimsmallest/2+" "
      //if longer side bridge
      if(this.dimensions.h-dimsmallest>0) {
        pathstr += "v"+(this.dimensions.h-dimsmallest)+" "
      }
      // Draw corner arc clockwise
      pathstr += "a"+dimsmallest/2+","+dimsmallest/2+" 0 0 1 "+-dimsmallest/2+","+dimsmallest/2+" "
      //if longer side bridge
      if(this.dimensions.w-dimsmallest>0) {
        pathstr += "h-"+(this.dimensions.w-dimsmallest)+" "
      }
      // Draw corner arc clockwise
      pathstr += "a"+dimsmallest/2+","+dimsmallest/2+" 0 0 1 "+-dimsmallest/2+","+-dimsmallest/2+" "
      //if longer side bridge half
      if(this.dimensions.h-dimsmallest>0) {
        pathstr += "v-"+((this.dimensions.h-dimsmallest)/2)+" "
      }

      //close path
      pathstr+="z"
      this.path = pathstr;
    }
  },
  mounted: function(){
    this.dimGet();

  },
   created: function () {
    window.addEventListener("resize", this.dimGet);
    window.addEventListener("load", this.dimGet);
  },
  destroyed: function () {
    window.removeEventListener("resize", this.dimGet);
    window.removeEventListener("load", this.dimGet);
  },
}
</script>

<style lang="scss" scoped>
svg{
  width: 100%;
  height: 100%;
}
.pathbox{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.textboi{
  margin: 0;
  padding: 0;
}
</style>
