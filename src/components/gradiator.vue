<template>
<div
class="bgBoi"
v-bind:style="{backgroundImage: 'url(' + fileLoaded + ')' }"
@contextmenu.prevent="pass"
>
  <div
  class="coverBoi"
  :style="{background: gradient}"
  >
    <slot> </slot>
  </div>




</div>
</template>

<script>
export default {
  name: "gradiator",
  data: function() {
    return {
      file: "",
      gradVal: [],
    }
  },
  props: {
    imageUrl: String,
    resolution: {
      type: Number,
      default: 3
    },
    quality: {
      type: Number,
      default: 10
    },
    gradType: {
      type: String,
      default: "linear",
      validator: function (value) {
        // The value must match one of these strings
        return ['linear', 'radial', 'conic'].indexOf(value) !== -1
      }
    },
    gradAngle: {
      type: Number,
      default: 0,
    }
  },
  computed: {
    gradient: function(){

      if(this.gradVal.length != 1){
      let grad = this.gradType+"-gradient("
      if(this.gradType == "linear"){
        grad+= this.gradAngle+"deg"
      } else if (this.gradType == "conic" ) {
        grad+="from "+ this.gradAngle+"deg"
      } else {
        grad += "circle at center"
      }
      for(let i = 0; i < this.gradVal.length; i++){
        grad += ",rgb(" + this.gradVal[i][0] + "," + this.gradVal[i][1] + "," + this.gradVal[i][2] + ") " // + Math.round(i/this.gradVal.length*100) +"%"
      }
      grad += ")"
      return grad;
    } else {
          return("rgb(" + this.gradVal[0][0] + "," + this.gradVal[0][1] + "," + this.gradVal[0][2] + ")")
    }
  },
  fileLoaded: function(){
    if(this.gradVal.length > 0){
      return this.file
    } else {
      return ""
    }
  }
  },
  watch: {
    file: function(){ // calculate color gradient once file has loaded
      let that = this;
      let gradStr = ""
        var dummyImg = new Image(); // create dummy img for canvas to interact with
        dummyImg.src = this.file;
        dummyImg.addEventListener('load', function() { // wait for it to finish loading
          if(that.resolution < 2) {
            gradStr = that.$root.$colorThief.getColor(dummyImg, that.resolution, that.quality); // do color thief things
            gradStr = [gradStr]
          } else {
            gradStr = that.$root.$colorThief.getPalette(dummyImg, that.resolution, that.quality); // do color thief things
          }

          //console.log(gradStr)
          that.gradVal = gradStr;
        });
    }
  },
  mounted: function() {
    this.axios.get(this.imageUrl, {
      responseType: 'arraybuffer'
    }).then((response) => {
      let image = btoa(
        new Uint8Array(response.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      this.file = `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
    });

  }
}
</script>

<style lang="scss" scoped>
.bgBoi{
    padding: 0;
    background: var(--neutral-bg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 9000px;
    width: 100%;
    height: 100%;

}

.coverBoi{
  -webkit-user-select: none;

-khtml-user-select: none;

-moz-user-select: none;

-ms-user-select: none;

user-select: none;
  border-radius: 9000px;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 1;
  transition: opacity var(--transition-time) ease-in-out;
  &:hover{
    opacity: 0;
  }
}
</style>
