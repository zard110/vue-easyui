<script>
  export default {

  }
</script>

<template>id=""
  <ce-layout id="parent">
    <ce-layout-panel region="south" :size="48">south</ce-layout-panel>
    <ce-layout-panel region="west" :size="320" :split="true" title="Menu" :collapsible="true">menu</ce-layout-panel>
    <ce-layout-panel region="east" :size="200">east</ce-layout-panel>
    <ce-layout-panel region="center" title="Container">container</ce-layout-panel>
  </ce-layout>
</template>
