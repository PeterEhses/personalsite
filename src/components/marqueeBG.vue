<template>
  <div id="decoration" aria-hidden="true">
    <div id="scrollhead" :class="[$deviceIsSlow ? 'scrollhead-not-animated' : 'scrollhead-animated']">
      <div class="scrollinner" v-for="idy in 15" :key="idy">
        <span v-for="idx in 10" :key="idx">{{$route.name}}</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" >
#decoration {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url("/img/img-noise-256x256.png");
    background-blend-mode: lighten;
    background-color: var(--bg);
}
//fancy devices get fancy animation
.scrollhead-animated{
  & .scrollinner {
    transform: translate3d(var(--move-initial), 0, 0);
    animation: marquee 200s linear infinite;
    animation-play-state: running;
  }
}
//mobile devices get static boringness so they maybe don't freeze maybe
.scrollhead-not-animated{
  & .scrollinner {
    &:nth-child(2n) {
      transform: translate3d(-7%, 0, 0);
    }
  }
}
#scrollhead {
    opacity: 0.5;
    position: relative;
    overflow: hidden;
    --offset: 5rem;
    --move-initial: calc(-10% + var(--offset));
    --move-final: calc(-50% + var(--offset));

    & .scrollinner {
        &:nth-child(2n) {
            animation-direction: reverse;
        }
        white-space: nowrap;
        width: fit-content;
        display: flex;
        align-items: baseline;
        position: relative;


    }

    & span {
        &:nth-child(n) {
            //font-family: aw-conqueror-didot, serif;
            font-family: var(--accent-text-font);
            font-style: var(--accent-text-style);
            font-weight: var(--accent-text-weight);

        }

        line-height: 0.91;

        font-size: 9.6rem;

        padding: 0 1rem;

        color: --base-color;
        -webkit-text-fill-color: var(--bg);
        /* Will override color (regardless of order) */
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: var(--accent-color);
    }
}
@keyframes marquee {
    0% {
        transform: translate3d(var(--move-initial), 0, 0);
    }

    100% {
        transform: translate3d(var(--move-final), 0, 0);
    }
}
</style>
