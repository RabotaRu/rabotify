import { storiesOf } from '@storybook/vue';
import { text, boolean, select, number } from '@storybook/addon-knobs';
import { withInfo } from 'storybook-addon-vue-info';

import RImage from '@rabota/rabotify/src/components/RImage/RImage.vue';

const stories = storiesOf('Rabotify', module);

const options = {
  cover: 'cover',
  contain: 'contain',
  None: null
};

stories.addDecorator(withInfo).add('RImage', () => ({
  components: { RImage },
  props: {
    src: {
      default: text('src', 'http://www.poznavayka.org/wp-content/uploads/2018/03/tyulen-2.jpg')
    },
    thumbnailSrc: {
      default: text('thumbnailSrc', 'http://www.poznavayka.org/wp-content/uploads/2018/03/tyulen.jpg')
    },
    round: {
      default: boolean('round', false)
    },
    'imageClip': {
      default: select('imageClip', options, 'cover')
    },
    width: {
      default: number('width', 500)
    },
    height: {
      default: number('height')
    },
    showError: {
      default: boolean('showError', false)
    }
  },
  template: `<RImage :src="src" :thumbnail-src="thumbnailSrc" :round="round" :image-clip="imageClip" :width="width" :height="height" :showError="showError" />`
}), { info: {} });
