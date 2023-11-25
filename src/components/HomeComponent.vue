<template>
  <div id="all">
    <ClassHeader/>
  </div>
</template>

<script>
import ClassHeader from '@/components/NaviBarComponent.vue';

export default {
  name: 'HomeComponent',
  data : function(){
    return {
      classList : [],
    };
  },
  components: {
    ClassHeader
  }
}
</script>

<style scoped>

</style>