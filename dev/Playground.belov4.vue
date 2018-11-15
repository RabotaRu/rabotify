<template>
  <r-app>
    <div class="playground page4">

      <r-card>
        <r-card-title class="font-display-1">RLoading Line</r-card-title>
        <r-card-text>

          <r-loading colorful></r-loading>
          <r-loading colorful :tilesNumber="5"></r-loading>

          <br>
          <br>

          <r-loading line :progress="10"></r-loading>
          <r-loading line :progress="progress" lineBackground="#eee"></r-loading>
          <r-loading line :progress="20" :lineHeight="4" lineRound lineShadow></r-loading>

          <r-loading line :progress="progress" lineColor="accent" :lineHeight="10" lineBackground="rgba(86, 86, 68, 0.1)"></r-loading>
          <r-loading line :progress="progress" lineBackground="rgba(255, 86, 68, 0.36)"></r-loading>
          <r-loading line :progress="progress" lineRound lineBackground="rgba(255, 86, 68, 0.36)"></r-loading>
          <r-loading line :progress="progress" lineRound :lineHeight="10" lineBackground="rgba(255, 86, 68, 0.36)"></r-loading>
          <r-loading line :progress="progress" lineRound :lineHeight="10" lineShadow lineBackground="rgba(255, 86, 68, 0.36)"></r-loading>
          <r-loading line :progress="progress" lineRound :lineHeight="10" lineColor="accent" lineShadow></r-loading>
          <r-loading line :progress="progress" lineRound :lineHeight="10" lineShadow></r-loading>
          <r-loading line :progress="progress" lineRound :lineHeight="5" lineColor="accent" lineShadow></r-loading>
          <r-loading line :progress="progress" lineRound :lineHeight="5" lineColor="info" lineShadow></r-loading>
          <r-loading line :progress="progress" lineRound :lineHeight="5" lineColor="success" lineShadow></r-loading>
          <r-loading line :progress="progress" lineRound :lineHeight="5" lineColor="secondary" lineShadow></r-loading>
          <r-loading line :progress="progress" lineRound :lineHeight="5" lineColor="gray-dark" lineShadow></r-loading>

        </r-card-text>
      </r-card>

    </div>
  </r-app>
</template>

<script>
  import MdFavoriteBorder from 'md-svg-vue/dist/action/MdFavoriteBorder';
  import MdClose from 'md-svg-vue/dist/navigation/MdClose';

  export default {
    components: {
      MdFavoriteBorder,
      MdClose
    },
    data: () => ({
      progress: 0,
      progressInterval: null
    }),
    mounted () {
      this.startProgressChange();
    },
    methods: {
      startProgressChange () {
        this.progressInterval = setInterval(() => {
          this.progress = this.progress + 10 > 100
            ? this.progress + 10 - 100
            : this.progress + 10;
        }, 1000);
      }
    }
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

  .page4 {
    .loading {
      margin-top: 12px;
    }
  }
</style>
