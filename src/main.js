import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


// detect user agent to see if mobile and serve reduced animation for performance

// deactivated for now since is unused
// Vue.prototype.$deviceIsSlow = false
// import DeviceDetector from "device-detector-js";
// const deviceDetector = new DeviceDetector();
//
// try {
//   const userAgent = navigator.userAgent
//   const device = deviceDetector.parse(userAgent);
//   if(device.device.type == "smartphone" || device.device.type == "television"){
//     Vue.prototype.$deviceIsSlow = true
//     console.log("this device is assumed to be slow, so expect reduced animation")
//   } else {
//     console.log("this device is assumed to be fast, so expect performance hungry effects ✨")
//   }
// } catch (e) {
//   console.log("Couldn't detect if this device is slow. We'll try the fancy version but it might be slow")
// }


// video players
import VuePlayerPlugin, { Player } from 'vue-youtube-iframe-api'
Vue.use(VuePlayerPlugin)
Vue.component('yt-player', Player)

// const Hyphenopoly = {
//     "require": {
//         "de": "Silbentrennungsalgorithmus",
//         "en-us": "antidisestablishmentarianism"
//     },
//     "paths": {
//         // Path to the directory of pattern files
//         "patterndir": "./assets/patterns/",
//         // Path to the directory where the other ressources are stored
//         "maindir": "./assets/"
//     }
// };
// window.Hyphenopoly = Hyphenopoly;
// require("./Hyphenopoly_Loader");
//
// console.log(Hyphenopoly.hyphenators);
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

//let dayMillis = (24*60*60*1000)

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

let lerpstretch = .2
let eventstretch = 0
let combinedstretch = lerpstretch + eventstretch

let onehour = (2*60*60*1000)

let sunrise = computeSunrise() + combinedstretch
let sunset = computeSunrise(false) - combinedstretch
let midday = lerp(sunrise, sunset, .5)
console.log('sunrise: '+sunrise+' midday: '+midday+' sunset: '+sunset)

function getTimeCol(nowTime){
  let col1;
  let col2;
  let step;
  let segment = "";
  if(nowTime < sunrise){
    segment = "pre sunrise"
    col1 = "#303030"
    col2 = "#f7e5b2"
    step = segmentNormalize(sunrise-onehour*combinedstretch,sunrise-onehour*eventstretch, nowTime)
  }else if(nowTime < midday){
    segment = "post sunrise"
    col1 = "#f7e5b2"
    col2 = "#f1eddc"
    step = segmentNormalize(sunrise+onehour*eventstretch,sunrise+onehour*combinedstretch, nowTime)
  }else if(nowTime < sunset){
    segment = "pre sunset"
    col1 = "#f1eddc"
    col2 = "#F09A92"
    step = segmentNormalize(sunset-onehour*combinedstretch,sunset-onehour*eventstretch, nowTime)
  }  else {
    segment = "post sunset"
    col1 = "#F09A92"
    col2 = "#303030"
    step = segmentNormalize(sunset+onehour*eventstretch,sunset+onehour*combinedstretch, nowTime)
  }

  let color = lerpColor(col1, col2, step);
  window.timesegment = segment;
   //color = lerpColor("#F09A92", "#303030", 1);
  //console.log({now: nowTime, sunrise: sunrise, midday: midday, sunset: sunset, col1: col1, col2: col2, step: step})
  //
  //console.log('millis%day: '+nowTime+' current segment: '+segment+' segment lerp progress: '+step)
  return color //'#f1eddc'//color

}

function changeThemeColor(color) {
    let metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", color);
    metaThemeColor = document.querySelector("meta[name=msapplication-navbutton-color]");
    metaThemeColor.setAttribute("content", color);
    metaThemeColor = document.querySelector("meta[name=apple-mobile-web-app-status-bar-style]");
    metaThemeColor.setAttribute("content", color);

}

let todayMillis = new Date(new Date().toISOString().split("T")[0]).getTime()

import computeSunrise from '@/external_code/sun.js'
let domBody = document.documentElement
window.updateBG = function(){
  let bgnew
    if(window.theme_mode && window.theme_mode == "day"){
      bgnew = "#f1eddc"
    } else if(window.theme_mode && window.theme_mode == "night"){
      bgnew = "#303030"
    } else {
      let nowMillis = Date.now()-todayMillis
      //console.log(nowMillis)
      bgnew = getTimeCol(nowMillis)
    }


  let contentCol = "var(--white)"
  let accentCol = "var(--accent-color-night)"
  //console.log(hexToHSL(bgnew).l);
  if(hexToHSL(bgnew).l > 60){
    contentCol = "var(--black)"
    accentCol = "var(--accent-color-daylight)"
  }
  let styles = {
    "--bg": bgnew,
    "background-color": bgnew,
    "--content-color": contentCol,
    "--accent-color": accentCol
  }

  changeThemeColor(bgnew);

  for(const [key, value] of Object.entries(styles)){
        domBody.style.setProperty(key, value);
      }
  //requestAnimationFrame(updateBG);
}
window.updateBG()
setInterval(window.updateBG,5000);
//requestAnimationFrame(updateBG);
