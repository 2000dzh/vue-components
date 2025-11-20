import pie3d from './main.vue';

pie3d.install = (Vue) => {
  Vue.component(pie3d.name, pie3d);
};

export default pie3d;