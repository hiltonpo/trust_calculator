<template>
    <div class="box position-absolute" @click.stop="dotClick">
        <div class="box1 position-absolute"></div>
        <div class="box2 position-absolute"></div>
        <div class="box3 position-absolute"></div>
    </div>
</template>

<style lang="scss" scoped>
.box1{
  width: 15px;
  height: 15px;
  background-color:rgb(255, 255, 255);
  border-radius:50%;
  &:hover{
    cursor: pointer;
    transform:scale(1.3);
  }
}
.box2{
  background-color:#DEF1FF ;
  border-radius:50%;
  left:0;
  top:0;
  z-index:-2;
  animation:big 1s infinite;
}
.box3{
  background-color:#D1ECFF ;
  border-radius:50%;
  left:0;
  top:0;
  z-index:-2;
  animation:big 2s infinite;
}
@keyframes big{
  0%{
    width: 15px;
    height: 15px;
    left:0px;
    top:0px;
    opacity:1;
  }
  100%{
    width: 40px;
    height: 40px;
    left:-12px;
    top:-12px;
    opacity:0;
  }
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class MapDot extends Vue {
  private dotClick () {
    this.$emit('dotClick');
  }
}
</script>
