/// //////////////////////////////////////////////////
// General Use Component
/// //////////////////////////////////////////////////
import InputText from '@/components/InputText.vue';
import IconImg from '@/components/IconImg.vue';
import RadioGroup from '@/components/RadioGroup.vue';
import ButtonRadius from '@/components/ButtonRadius.vue';
import ProcessCard from '@/components/ProcessCard.vue';
import ProcessStep from '@/components/ProcessStep.vue';
import TheoryCard from '@/components/TheoryCard.vue';
import ChipTitle from '@/components/ChipTitle.vue';
import MapDot from '@/components/MapDot.vue';
import LineChartComponent from '@/components/LineChartComponent.vue';
import ImageDialog from '@/components/ImageDialog.vue';

import MainTopBar from '@/views/main/MainTopBar.vue';

export default {
  install (Vue: any, options: any) {
    Vue.component('InputText', InputText);
    Vue.component('RadioGroup', RadioGroup);
    Vue.component('ButtonRadius', ButtonRadius);
    Vue.component('IconImg', IconImg);
    Vue.component('ProcessCard', ProcessCard);
    Vue.component('ProcessStep', ProcessStep);
    Vue.component('TheoryCard', TheoryCard);
    Vue.component('ChipTitle', ChipTitle);
    Vue.component('MapDot', MapDot);
    Vue.component('LineChartComponent', LineChartComponent);
    Vue.component('ImageDialog', ImageDialog);
    Vue.component('MainTopBar', MainTopBar);
  }
};
