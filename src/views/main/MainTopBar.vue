<template>
    <!-- <v-app-bar
      absolute
      color="white"
      elevation="4"
      height="75px"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar> -->
    <span>
      <v-navigation-drawer app v-model="drawer" class="sideBar cyan darken-2" dark disable-resize-watcher>
        <v-list>
          <template v-for="(item, index) in items">
            <v-list-item-title :key="index">
              <v-list-item-content class="ml-3 text">
                {{item.title}}
              </v-list-item-content>
            </v-list-item-title>
            <v-divider :key="`divider-${index}`" class="my-4"></v-divider>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar app color="grey lighten-4" height="80px" elevation="3">
        <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <img class="logo" :src="logo" />
        <div class="ml-10 text-h6">信託試算工具</div>
        <v-spacer class="hidden-sm-and-down"></v-spacer>
        <!-- <v-btn class="hidden-sm-and-down">SIGN IN</v-btn>
        <v-btn color="brown lighten-3" class="hidden-sm-and-down">JOIN</v-btn> -->
      </v-app-bar>
    </span>
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
