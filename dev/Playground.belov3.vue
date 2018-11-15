<template>
  <r-app>
    <div class="playground">

      <r-card>
        <r-card-title class="font-display-1">Smart Render</r-card-title>
        <r-card-text>

          <r-smart-render class="test2">
            I'm under the Smart Render component.
          </r-smart-render>

          <r-smart-render onlyBrowser debug>
            I'm only in browser
          </r-smart-render>

          <r-smart-render
            onlyBrowser
            elementWidth="200px"
            elementHeight="300px">
            I'm only in browser
          </r-smart-render>

          <r-smart-render
            onlyBrowser>
            I'm only in browser
          </r-smart-render>

          <r-smart-render
            onlyBrowser
            breakpoints="sm">
            I'm only in browser when 'sm'
          </r-smart-render>

          <r-smart-render
            onlyBrowser
            :breakpoints="['sm']">
            I'm only in browser when 'sm'
          </r-smart-render>

          <r-smart-render
            onlyBrowser
            :breakpoints="['xsAndUp', 'mdAndDown']">
            I'm only in browser when 'xsAndUp' AND 'mdAndDown'
          </r-smart-render>

          <r-smart-render
            onlyBrowser
            :breakpoints="[['xs', 'md']]">
            I'm only in browser when 'xs' OR 'md'
          </r-smart-render>

          <r-smart-render
            onlyBrowser
            :breakpoints="[['xs', 'md'], 'smAndUp']">
            I'm only in browser when ('xs' OR 'md') AND 'smAndUp'. (1024px < width <= 1280px)
          </r-smart-render>

          <r-smart-render
            onlyBrowser
            :breakpoints="[['xs', [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[['md', 'xs']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]], ['xs', 'md']]">
            I'm only in browser when ('xs' OR 'md') AND ('xs' OR 'md').
          </r-smart-render>

          <r-smart-render
            onlyBrowser
            :breakpoints="[[[[[[[[[[[[[['xs']]]]]]]]]]]], 'sm', 'md', 'lg', 'lgAndUp']]">
            I'm only in browser when 'xs' OR 'sm' OR 'md' OR 'lg' OR 'lgAndUp'
          </r-smart-render>

          <r-smart-render
            onlyBrowser
            elementWidth="100%"
            elementHeight="306px"
            visibilityObserver>
            I'm only in browser when I'm visible.
          </r-smart-render>

          <r-smart-render
            onlyBrowser
            visibilityObserver
            elementWidth="100%"
            elementHeight="306px"
            rootMargin="100px">
            I'm only in browser when I'm visible.
          </r-smart-render>

          <r-smart-render
            onlyBrowser
            visibilityObserver
            elementWidth="100%"
            elementHeight="306px"
            rootMargin="100px">
            I'm only in browser when I'm visible.
          </r-smart-render>

          <r-smart-render
            onlyBrowser
            visibilityObserver
            elementWidth="100%"
            elementHeight="306px"
            rootMargin="50">
            I'm only in browser when I'm visible.
          </r-smart-render>

          <r-smart-render
            onlyBrowser
            visibilityObserver
            elementWidth="100%"
            elementHeight="306px"
            rootMargin="50 100">
            I'm only in browser when I'm visible.
          </r-smart-render>

          <r-smart-render
            onlyBrowser
            visibilityObserver
            elementWidth="100%"
            elementHeight="306px"
            :rootMargin="70">
            I'm only in browser when I'm visible.
          </r-smart-render>

          <r-smart-render
            onlyBrowser
            visibilityObserver
            elementWidth="100%"
            elementHeight="306px"
            :rootMargin="[60, 120]">
            I'm only in browser when I'm visible.
          </r-smart-render>

          <r-smart-render
            onlyBrowser
            :visibilityObserver="90"
            elementWidth="100%"
            elementHeight="300px">
            I'm only in browser when I'm >40% visible
          </r-smart-render>

          <r-smart-render
            onlyBrowser
            @render="onRender"
            @visibilityChange="onVisibilityChange"
            visibilityObserver>
            I'm only in browser when I'm visible and I'm emitting events
          </r-smart-render>

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
      switch2: false
    }),
    methods: {
      onRender (ev) {
        console.log('rendered', ev);
      },
      onVisibilityChange (ev) {
        console.log('visibility change', ev);
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

  .block {
    padding: 24px;
    border: 1px solid #ccc;
    margin-bottom: 12px;
  }
</style>
