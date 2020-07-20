<template>
  <div class="home" >
    <div class="" v-for="idx in numSegments" :key="idx">
    </div>
      <img :src="'https://picsum.photos/seed/' + this.idx + '/1024'" alt="">
  </div>
</template>

<script>
// @ is an alias to /src
// import ColorThief from 'colorthief/dist/color-thief.mjs'
// const colorThief = new ColorThief();

export default {
  components: {
  },
    data: function(){
    return {
      numSegments: 4,
    }
  }, computed: {
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
  mounted: function() {
    let that = this;
    this.axios.get("https://picsum.photos/v2/list").then((response) => {
      console.log(response.data)
      that.picdata = response.data;
} );
}
}
</script>
