<template>
	<header class="d-flex align-center position-relative py-3">
		<div class="pl-10 avatar">
			<v-img :src="headerTitle" contain></v-img>
		</div>
		<v-img class="position-absolute logo" :src="headerLogo" width="200" contain></v-img>
	</header>
</template>
<style lang="scss" scoped>
::v-deep {
  --move-height: -5px;
  --move-speed: .8s;
}
@import url(~@/styles/fintech.scss);

header {
  height: 10vh;
  background: url(~@/assets/img/finTech/header_bg_p3.png);
  background-size: cover;
}

.logo {
  top: calc(50% - 33.33px);
  left: calc(50% - 100px);
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  data () {
    return {
      headerTitle: require('@/assets/img/finTech/logo_header_left.png'),
      headerLogo: require('@/assets/img/finTech/alpha-white.svg')
    };
  }
})
export default class IconImg extends Vue {
@Prop({ default: '' }) img!: string;
}
</script>
