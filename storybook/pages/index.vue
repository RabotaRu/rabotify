<template>
  <RApp class="container">
    <div>
      <Logo />
      <h1 class="title">
        storybook
      </h1>
      <h2 class="subtitle">
        Nuxt.js + Storybook for components
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
      <h2>Rabotify</h2>
      <RBtn
        color="primary"
        ripple
      >
        It is rabotify button
      </RBtn>
      <RBtn
        color="secondary"
        ripple
      >
        secondary
      </RBtn>
      <RImage src="http://www.poznavayka.org/wp-content/uploads/2018/03/tyulen-2.jpg" />
    </div>
  </RApp>
</template>

<script>
import Logo from '~/components/Logo.vue';
import RApp from '../../src/components/RApp/RApp.vue';
import RBtn from '../../src/components/RBtn/RBtn.vue';
import RImage from '../../src/components/RImage/RImage.vue';

export default {
  components: {
    Logo,
    RApp,
    RBtn,
    RImage
  }
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
