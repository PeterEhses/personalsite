<template>
  <div class="pathbox" ref="pathbox">
    <svg preserveAspectRatio="xMidYMin meet">
      <path :d="path" :id="'pathBoi'+_uid" style="display: none"/>
      <text>
        <textPath :href="'#pathBoi'+_uid" dominant-baseline="text-before-edge" text-anchor="middle" startOffset="50%" :font-size="fontscale+'em'">

          <slot> </slot>{{updateThing}}
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
      updateThing: "",
    }
  },
  computed: {
  },
  methods: {
    dimGet: function(){

      this.dimensions = {w:this.$el.clientWidth, h:this.$el.clientHeight}
    },
    textUpdate(dimensions){
      //
      //console.log(dimensions)
      let pathstr = ""
      let dimsmallest = Math.min(dimensions.w, dimensions.h)
      // move to 1/2, 0
      pathstr+= "M0,"+(dimensions.h/2)+" "
      //if longer side bridge half
      if(dimensions.h-dimsmallest>0){
        pathstr += "v-"+((dimensions.h-dimsmallest)/2)+" "
      }
      // Draw corner arc clockwise
      pathstr += "a"+dimsmallest/2+","+dimsmallest/2+" 0 0 1 "+dimsmallest/2+","+-dimsmallest/2+" "
      //if longer side bridge
      if(dimensions.w-dimsmallest>0) {
        pathstr += "h"+(dimensions.w-dimsmallest)+" "
      }
      // Draw corner arc clockwise: radX, radY, endX rel., endY rel.
      pathstr += "a"+dimsmallest/2+","+dimsmallest/2+" 0 0 1 "+dimsmallest/2+","+dimsmallest/2+" "
      //if longer side bridge
      if(dimensions.h-dimsmallest>0) {
        pathstr += "v"+(dimensions.h-dimsmallest)+" "
      }
      // Draw corner arc clockwise
      pathstr += "a"+dimsmallest/2+","+dimsmallest/2+" 0 0 1 "+-dimsmallest/2+","+dimsmallest/2+" "
      //if longer side bridge
      if(dimensions.w-dimsmallest>0) {
        pathstr += "h-"+(dimensions.w-dimsmallest)+" "
      }
      // Draw corner arc clockwise
      pathstr += "a"+dimsmallest/2+","+dimsmallest/2+" 0 0 1 "+-dimsmallest/2+","+-dimsmallest/2+" "
      //if longer side bridge half
      if(dimensions.h-dimsmallest>0) {
        pathstr += "v-"+((dimensions.h-dimsmallest)/2)+" "
      }

      //close path
      pathstr+="z"
      this.path = pathstr
      this.updateThing = " " // hack so svg tex talso updates. it doesn't otherwise in cases like windows aero snap resize. this one's on chrome I think
      this.$nextTick(function(){
        this.updateThing = ""
      })

    }

  }, watch: {
    dimensions: {deep: true,
    handler: function(){
      //let dimensions = {w:this.$el.clientWidth, h:this.$el.clientHeight}
      this.textUpdate(this.dimensions)

    }
  }
  },
  mounted: function(){
    this.dimGet();
    this.$el.addEventListener("resize", this.dimGet);
  },
   created: function () {
    window.addEventListener("resize", this.dimGet);

    window.addEventListener("load", this.dimGet);
  },
  destroyed: function () {
    window.removeEventListener("resize", this.dimGet);
    window.removeEventListener("load", this.dimGet);
    this.$el.removeEventListener("resize", this.dimGet);
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
