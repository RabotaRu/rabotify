import VueRouter from 'vue-router';
import PlaygroundBelov0 from './Playground.belov0.vue';
import PlaygroundBelov1 from './Playground.belov1.vue';
import PlaygroundBelov2 from './Playground.belov2.vue';
import PlaygroundBelov3 from './Playground.belov3.vue';
import PlaygroundBelov4 from './Playground.belov4.vue';
import PlaygroundBelov5 from './Playground.belov5.vue';
import PlaygroundBelov6 from './Playground.belov6.vue';
import PlaygroundBelov7 from './Playground.belov7.vue';
import PlaygroundBelov8 from './Playground.belov8.vue';
import PlaygroundBelov9 from './Playground.belov9.vue';
import PlaygroundBelov10 from './Playground.belov10.vue';
import PlaygroundBelov11 from './Playground.belov11.vue';
import PlaygroundBelov12 from './Playground.belov12.vue';
import PlaygroundBelov13 from './Playground.belov13.vue';
import PlaygroundBelov14 from './Playground.belov14.vue';

import PlaygroundJekins0 from './Playground.jekins0.vue';

const router = new VueRouter({
  routes: [
    {
      path: '/page1',
      name: 'Page 1',
      component: PlaygroundBelov0
    },
    {
      path: '/page2',
      name: 'Page 2',
      component: PlaygroundBelov1
    },
    {
      path: '/page3',
      name: 'Page 3',
      component: PlaygroundBelov2
    },
    {
      path: '/page4',
      name: 'Page 4',
      component: PlaygroundBelov3
    },
    {
      path: '/page5',
      name: 'Page 5',
      component: PlaygroundBelov4
    },
    {
      path: '/page6',
      name: 'Page 6',
      component: PlaygroundBelov5
    },
    {
      path: '/page7',
      name: 'Page 7',
      component: PlaygroundBelov6
    },
    {
      path: '/page8',
      name: 'Page 8',
      component: PlaygroundBelov7
    },
    {
      path: '/page9',
      name: 'Page 9',
      component: PlaygroundBelov8
    },
    {
      path: '/page10',
      name: 'Page 10',
      component: PlaygroundBelov9
    },
    {
      path: '/page11',
      name: 'Page 11',
      component: PlaygroundBelov10
    },
    {
      path: '/page12',
      name: 'Page 12',
      component: PlaygroundBelov11
    },
    {
      path: '/page13',
      name: 'Page 13',
      component: PlaygroundBelov12
    },
    {
      path: '/page14',
      name: 'Page 14',
      component: PlaygroundBelov13
    },
    {
      path: '/page15',
      name: 'Page 15',
      component: PlaygroundBelov14
    },
    {
      path: '/jekins0',
      name: 'Jekins page 0',
      component: PlaygroundJekins0
    },
    { path: '*', redirect: '/page14' }
  ]
});

export default router
