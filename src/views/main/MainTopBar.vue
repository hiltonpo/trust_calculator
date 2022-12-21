<template>
  <v-app-bar class="bar" app color="white" height="70px" elevation="4" hide-on-scroll>
    <v-row class="mx-0 pa-sm-5 font-weight-medium justify-space-between align-center">
      <div>
        <img class="logo" :src="logo" />
      </div>
      <div>
        <div class="text-center text-caption">由 阿爾發證券投資顧問(股)公司 提供</div>
        <div class="text-center text-caption">110金管投顧新字第027號</div>
      </div>
      <!-- <v-col cols="6" sm="4" class="d-flex justify-start align-center">
        <a :href="hrefHome('./Home.html')" class="d-sm-none">
          <img class="logo" :src="alphaLogo" />
        </a>
      </v-col>
      <v-col cols="12" sm="4" class="d-sm-flex justify-center d-none">
        <a :href="hrefHome('./Home.html')">
          <img class="logo" :src="alphaLogo" />
        </a>
      </v-col>
      <v-col cols="6" sm="4" class="d-flex justify-end align-center">
        <div class="topRight d-flex justify-end flex-wrap">
          <span class="alphaAccount">
            {{ $t('alphaAccount') }}
          </span>
          <span>
            <a class="pl-2 text-decoration-underline cyan--text" @click="href(topBarType)">{{ $t('register') }}</a>
          </span>
        </div>
      </v-col> -->
    </v-row>
  </v-app-bar>
    <!-- <span>
      <v-app-bar app color="grey lighten-4" height="80px" elevation="3">
        <img class="logo" :src="logo" />
        <div class="ml-10 text-h6">信託試算工具</div>
        <v-spacer class="hidden-sm-and-down"></v-spacer>
      </v-app-bar>
    </span> -->
</template>

<style lang="scss" scoped>
.logo
{
  height: 50px;
}

.sideBar {
  @media (min-width: 960px ) {
    display: none;
  }
}

</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import alphaLogo from '@/assets/img/alpha-logo.png';

@Component({
  setup () {
    return {
      drawer: false,
      items: [
        { title: 'Menu' },
        { title: 'Sign In' },
        { title: 'Join' }
      ],
      logo: alphaLogo
    };
  }
})
export default class MainTopBar extends Vue {

}
</script>
