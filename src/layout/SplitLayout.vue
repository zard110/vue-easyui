<script>
  export default {

  }
</script>

<template>
  <ce-layout id="parent">
    <ce-layout-panel slot="north" region="north" :size="64" :split="true">north</ce-layout-panel>
    <ce-layout-panel slot="south" region="south" :size="64" :split="true">south</ce-layout-panel>
    <ce-layout-panel slot="west" region="west" :size="200"  :split="true">west</ce-layout-panel>
    <ce-layout-panel slot="east" region="east" :size="200"  :split="true">east</ce-layout-panel>
    <ce-layout-panel slot="center" region="center">

      center

    </ce-layout-panel>

  </ce-layout>

</template>
