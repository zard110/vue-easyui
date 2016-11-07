<template>
  <ce-layout id="parent">
    <ce-layout-panel slot="north" region="north" :size="64">north</ce-layout-panel>
    <ce-layout-panel slot="south" region="south" :size="64">south</ce-layout-panel>
    <ce-layout-panel slot="west" region="west" :size="200">west</ce-layout-panel>
    <ce-layout-panel slot="east" region="east" :size="200">east</ce-layout-panel>
    <ce-layout-panel slot="center" region="center">

      <ce-layout id="child">

        <ce-layout-panel slot="north" region="north" :size="44">north</ce-layout-panel>
        <ce-layout-panel slot="south" region="south" :size="44">south</ce-layout-panel>
        <ce-layout-panel slot="west" region="west" :size="100">west</ce-layout-panel>
        <ce-layout-panel slot="east" region="east" :size="100">east</ce-layout-panel>
        <ce-layout-panel slot="center" region="center">center</ce-layout-panel>

      </ce-layout>

    </ce-layout-panel>

  </ce-layout>

  <!--<ce-panel :id="id" class="layout" :fit="true" :border="false">-->
    <!--<slot></slot>-->
  <!--</ce-panel>-->
</template>

<style>

  body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
  }

</style>

<script>
  export default {

  }
</script>
