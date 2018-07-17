import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ChallengeOne from './views/ChallengeOne.vue';
import ChallengeTwo from './views/ChallengeTwo.vue';
import ChallengeThree from './views/ChallengeThree.vue';
import Resume from './views/Resume.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/challengeOne',
      name: 'challengeOne',
      component: ChallengeOne,
    },
    {
      path: '/challengeTwo',
      name: 'challengeTwo',
      component: ChallengeTwo,
    },
    {
      path: '/challengeThree',
      name: 'challengeThree',
      component: ChallengeThree,
    },
    {
      path: '/resume',
      name: 'resume',
      component: Resume,
    },
  ],
});
