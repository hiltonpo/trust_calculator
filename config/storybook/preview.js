/* eslint-disable import/no-extraneous-dependencies */
import {addDecorator} from '@storybook/vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont';

import '@/plugins/main';
import Component from '@/components/index';
import i18n from '@/i18n';


Vue.use(Vuetify);
Vue.use(Component);

const vuetifyConfig = new Vuetify({icons: {
  iconfont: 'md',
}})

addDecorator(() => ({
  vuetify: vuetifyConfig,
  i18n,
  template: `<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link
    href="https://fonts.googleapis.com/css?family=Noto+Sans+TC:100,300,400,500,700,900&display=swap&subset=chinese-traditional"
    rel="stylesheet">
    <title><%= htmlWebpackPlugin.options.title %></title>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css">
  </head>
  <body>
    <noscript>
      <strong><%= htmlWebpackPlugin.options.title %></strong>
    </noscript>
    <div id="app"><v-app><story/></v-app></div>
    <!-- built files will be auto injected -->
  </body>
</html>
`,
}))
