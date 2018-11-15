<template>
  <r-app>
    <div class="playground page8">

      <r-card>
        <r-card-title class="font-display-1">RImage</r-card-title>
        <r-card-text>

          <r-image :src="src" :thumbnailSrc="thumbnailSrc">
            <div style="padding: 20px;">
              <div style="background: white; padding: 20px; border-radius: 500px;">Works</div>
            </div>
          </r-image>

          <r-divider></r-divider>

          <img :src="src" width="100%" style="background-color: #ccc">

        </r-card-text>
      </r-card>

    </div>
  </r-app>
</template>

<script>
  import MdFavoriteBorder from 'md-svg-vue/dist/action/MdFavoriteBorder';
  import MdClose from 'md-svg-vue/dist/navigation/MdClose';
  import MdFormatBold from 'md-svg-vue/dist/editor/MdFormatBold.vue';

  export default {
    components: {
      MdFormatBold,
      MdFavoriteBorder,
      MdClose
    },

    data: () => ({
      src: 'https://novoboi.ru/download_img.php?dimg=5624&raz=2560x1435', // 'https://novoboi.ru/download_img.php?dimg=5624&raz=2560x1440',
      thumbnailSrc: '/test-image-blurred.png',

      ex1: '',
      ex2: '',
      ex3: '',
      ex4: '',
      ex5: '',
      ex6: '',
      ex7: '',
      ex8: '',
      ex9: '',
      ex10: '',
      ex11: '',
      ex12: '',
      ex13: '',
      ex14: '',
      ex15: '',
      ex16: '',
      ex17: '',
      ex18: '',
      ex19: '',

      lorem: 'Lorem ipsum dolor sit amet, mel at clita quando. ' +
      'Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. ' +
      'Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',
    })
  }
</script>

<style lang="scss">
  .playground {
    > .card {
      margin: 12px;
    }

    &:after {
      height: 300px;
      content: '';
      width: 100%;
      display: block;
    }
  }
</style>
