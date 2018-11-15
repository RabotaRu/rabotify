<template>
  <router-view></router-view>
</template>

<script>
  import Playground from './Playground.belov0';
  import Stats from 'stats.js';

  export default {
    components: {
      Playground
    },

    mounted () {
      /*const stats = new Stats();
      stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild( stats.dom );
      function animate() {
        stats.begin();
        // monitored code goes here
        stats.end();
        requestAnimationFrame( animate );
      }
      requestAnimationFrame( animate );*/
    }
  }
</script>
