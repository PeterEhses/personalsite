import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: {
    params: {
      id: 'UA-36014546-2'
    },
    bootstrap: false,

  },
  disableScriptLoad: true,
  onAfterTrack () {
    console.log("🍪")
  }
}, router);

import axios from 'axios'
import VueAxios from 'vue-axios'

import ColorThief from 'colorthief/dist/color-thief.mjs'

import DirectusSDK from "@directus/sdk-js";



Object.defineProperties(Vue.prototype, {
    $api: { value: new DirectusSDK({
      url: "https://directus.peter-ehses.de/",
      project: "api",
    }) }
});
Vue.prototype.$api.prefix = "ps_";

Vue.prototype.$host = "peter-ehses.de";
// const colorThief = new ColorThief();
Vue.prototype.$colorThief = new ColorThief();
Vue.use(VueAxios, axios)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')





// color background stuff

let dayMillis = (24*60*60*1000)

function hexToHSL(H) {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  //return "hsl(" + h + "," + s + "%," + l + "%)";
  return {h: h, s:s, l:l}
}

function lerpColor(a, b, amount) {

    var ah = +a.replace('#', '0x'),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = +b.replace('#', '0x'),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

function lerp (start, end, amt){
  return (1-amt)*start+amt*end
}

function segmentNormalize(start, end, pos){
  let endnew = end-start;
  let posnew = pos-start;
  let posnorm = 1/endnew*posnew;
  if(posnorm < 0){
    posnorm = 0;
  }
  if(posnorm >1){
    posnorm = 1;
  }

  return posnorm;
}
let sunrise = computeSunrise()
let sunset = computeSunrise(false)
let midday = lerp(sunrise, sunset, .5)

let onehour = (2*60*60*1000)
function getTimeCol(nowTime){
  let col1;
  let col2;
  let step;
  if(nowTime < sunrise){
    col1 = "#303030"
    col2 = "#f7e5b2"
    step = segmentNormalize(sunrise-onehour/3,sunrise+onehour, nowTime)
  }else if(nowTime < midday){
    col1 = "#f7e5b2"
    col2 = "#f1eddc"
    step = segmentNormalize(sunrise+onehour,sunrise+onehour*3, nowTime)
  }else if(nowTime < sunset-onehour){
    col1 = "#f1eddc"
    col2 = "#F09A92"
    step = segmentNormalize(sunset-onehour*3,sunset-onehour, nowTime)
  }  else {
    col1 = "#F09A92"
    col2 = "#303030"
    step = segmentNormalize(sunset-onehour,sunset+onehour/3, nowTime)
  }

  let color = lerpColor(col1, col2, step);
   //color = lerpColor("#F09A92", "#303030", 1);
  //console.log({now: nowTime, sunrise: sunrise, midday: midday, sunset: sunset, col1: col1, col2: col2, step: step})
  return color

}

import computeSunrise from '@/external_code/sun.js'
let domBody = document.documentElement
function updateBG(){
  let bgnew = getTimeCol(Date.now()%dayMillis)
  let contentCol = "var(--white)"
  console.log(hexToHSL(bgnew).l);
  if(hexToHSL(bgnew).l > 50){
    contentCol = "var(--black)"
  }
  let styles = {
    "--bg": bgnew,
    "--content-color": contentCol,
  }



  for(const [key, value] of Object.entries(styles)){
        domBody.style.setProperty(key, value);
      }
  //requestAnimationFrame(updateBG);
}
updateBG()
setInterval(updateBG,5000);
//requestAnimationFrame(updateBG);
